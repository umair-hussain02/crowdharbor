import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { adminVerifyOtpSchema } from '@/lib/validators/adminAuth';
import { safeCompareHex, sha256Hex } from '@/lib/admin/crypto';
import { createSession } from '@/lib/admin/session';
import { getRequestIp, hashIp, isLoginRateLimited, recordLoginAttempt } from '@/lib/admin/loginAttempts';

const MAX_OTP_ATTEMPTS = 5;
const GENERIC_ERROR = 'Invalid or expired code.';

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = adminVerifyOtpSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? GENERIC_ERROR }, { status: 400 });
  }

  const email = parsed.data.email.toLowerCase();
  const ip = getRequestIp(request);
  const ipHash = ip ? hashIp(ip) : null;

  try {
    if (await isLoginRateLimited(email, ipHash, 'otp')) {
      return NextResponse.json({ error: 'Too many attempts. Please try again later.' }, { status: 429 });
    }

    const user = await prisma.adminUser.findUnique({ where: { email } });
    if (!user || !user.isActive) {
      await recordLoginAttempt(email, ipHash, 'otp', false);
      return NextResponse.json({ error: GENERIC_ERROR }, { status: 401 });
    }

    const otp = await prisma.adminOtp.findFirst({
      where: { adminUserId: user.id, consumedAt: null },
      orderBy: { createdAt: 'desc' },
    });

    if (!otp || otp.expiresAt < new Date()) {
      await recordLoginAttempt(email, ipHash, 'otp', false);
      return NextResponse.json({ error: GENERIC_ERROR }, { status: 401 });
    }

    if (otp.attempts >= MAX_OTP_ATTEMPTS) {
      await recordLoginAttempt(email, ipHash, 'otp', false);
      return NextResponse.json({ error: 'Too many incorrect attempts. Please request a new code.' }, { status: 401 });
    }

    const matches = safeCompareHex(sha256Hex(parsed.data.code), otp.codeHash);

    if (!matches) {
      await prisma.adminOtp.update({ where: { id: otp.id }, data: { attempts: otp.attempts + 1 } });
      await recordLoginAttempt(email, ipHash, 'otp', false);
      return NextResponse.json({ error: GENERIC_ERROR }, { status: 401 });
    }

    await prisma.adminOtp.update({ where: { id: otp.id }, data: { consumedAt: new Date() } });
    await recordLoginAttempt(email, ipHash, 'otp', true);
    await createSession(user.id);

    return NextResponse.json({
      ok: true,
      admin: { email: user.email, name: user.name, role: user.role },
    });
  } catch (error) {
    console.error('Admin OTP verification failed:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
