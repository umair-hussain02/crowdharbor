import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { adminResendOtpSchema } from '@/lib/validators/adminAuth';
import { generateOtpCode, sha256Hex } from '@/lib/admin/crypto';
import { getRequestIp, hashIp, isLoginRateLimited, recordLoginAttempt } from '@/lib/admin/loginAttempts';
import { sendAdminOtpEmail } from '@/lib/mail';

const OTP_TTL_MS = 10 * 60 * 1000;
const PENDING_WINDOW_MS = 30 * 60 * 1000;

// Always returns the same generic response whether or not the email exists
// or has a pending OTP, so this endpoint can't be used to probe accounts.
const GENERIC_RESPONSE = { ok: true, message: 'If a verification code is pending for this email, a new one has been sent.' };

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = adminResendOtpSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(GENERIC_RESPONSE);
  }

  const email = parsed.data.email.toLowerCase();
  const ip = getRequestIp(request);
  const ipHash = ip ? hashIp(ip) : null;

  try {
    if (await isLoginRateLimited(email, ipHash, 'resend')) {
      return NextResponse.json(GENERIC_RESPONSE);
    }

    await recordLoginAttempt(email, ipHash, 'resend', false);

    const user = await prisma.adminUser.findUnique({ where: { email } });
    if (!user || !user.isActive) {
      return NextResponse.json(GENERIC_RESPONSE);
    }

    // Only resend if the admin already went through the password step
    // recently (i.e. there's a recent OTP record) — prevents this endpoint
    // from being used to spam an arbitrary inbox without a password.
    const recentOtp = await prisma.adminOtp.findFirst({
      where: { adminUserId: user.id, createdAt: { gte: new Date(Date.now() - PENDING_WINDOW_MS) } },
      orderBy: { createdAt: 'desc' },
    });

    if (!recentOtp) {
      return NextResponse.json(GENERIC_RESPONSE);
    }

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

    await sendAdminOtpEmail(user.email, code);

    return NextResponse.json(GENERIC_RESPONSE);
  } catch (error) {
    console.error('Admin OTP resend failed:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(GENERIC_RESPONSE);
  }
}
