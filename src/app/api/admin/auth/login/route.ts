import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { adminLoginSchema } from '@/lib/validators/adminAuth';
import { generateOtpCode, sha256Hex, verifyPassword } from '@/lib/admin/crypto';
import { getRequestIp, hashIp, isLoginRateLimited, recordLoginAttempt } from '@/lib/admin/loginAttempts';
import { sendAdminOtpEmail } from '@/lib/mail';

const OTP_TTL_MS = 10 * 60 * 1000;

// A fixed dummy hash so a login attempt against a non-existent email takes
// roughly the same time as one against a real account — avoids leaking
// account existence via response timing.
const DUMMY_HASH = 'a'.repeat(32) + ':' + 'b'.repeat(128);

const GENERIC_ERROR = 'Invalid email or password.';

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = adminLoginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 400 });
  }

  const email = parsed.data.email.toLowerCase();
  const ip = getRequestIp(request);
  const ipHash = ip ? hashIp(ip) : null;

  try {
    if (await isLoginRateLimited(email, ipHash, 'password')) {
      return NextResponse.json({ error: 'Too many attempts. Please try again later.' }, { status: 429 });
    }

    const user = await prisma.adminUser.findUnique({ where: { email } });

    const passwordOk = user
      ? await verifyPassword(parsed.data.password, user.passwordHash)
      : await verifyPassword(parsed.data.password, DUMMY_HASH);

    if (!user || !user.isActive || !passwordOk) {
      await recordLoginAttempt(email, ipHash, 'password', false);
      return NextResponse.json({ error: GENERIC_ERROR }, { status: 401 });
    }

    await recordLoginAttempt(email, ipHash, 'password', true);

    // Only one active OTP per account at a time.
    await prisma.adminOtp.updateMany({
      where: { adminUserId: user.id, consumedAt: null },
      data: { consumedAt: new Date() },
    });

    const code = generateOtpCode();
    await prisma.adminOtp.create({
      data: {
        adminUserId: user.id,
        codeHash: sha256Hex(code),
        expiresAt: new Date(Date.now() + OTP_TTL_MS),
      },
    });

    try {
      await sendAdminOtpEmail(user.email, code);
    } catch (error) {
      console.error('Failed to send admin OTP email:', error instanceof Error ? error.message : 'Unknown error');
      return NextResponse.json({ error: 'Could not send verification code. Please try again.' }, { status: 500 });
    }

    return NextResponse.json({ ok: true, step: 'otp' });
  } catch (error) {
    console.error('Admin login failed:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
