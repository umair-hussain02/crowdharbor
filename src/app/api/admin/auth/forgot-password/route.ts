import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { adminForgotPasswordSchema } from '@/lib/validators/adminAuth';
import { generateOpaqueToken, sha256Hex } from '@/lib/admin/crypto';
import { getRequestIp, hashIp, isLoginRateLimited, recordLoginAttempt } from '@/lib/admin/loginAttempts';
import { sendAdminPasswordResetEmail } from '@/lib/mail';

const RESET_TOKEN_TTL_MS = 30 * 60 * 1000;

// Always the same response whether or not the email belongs to a real
// account — this endpoint must never be usable to enumerate admin emails.
const GENERIC_RESPONSE = { ok: true, message: 'If an account exists for that email, a reset link has been sent.' };

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = adminForgotPasswordSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(GENERIC_RESPONSE);
  }

  const email = parsed.data.email.toLowerCase();
  const ip = getRequestIp(request);
  const ipHash = ip ? hashIp(ip) : null;

  try {
    if (await isLoginRateLimited(email, ipHash, 'password-reset')) {
      return NextResponse.json(GENERIC_RESPONSE);
    }

    await recordLoginAttempt(email, ipHash, 'password-reset', false);

    const user = await prisma.adminUser.findUnique({ where: { email } });
    if (!user || !user.isActive) {
      return NextResponse.json(GENERIC_RESPONSE);
    }

    // Only one active reset link per account at a time.
    await prisma.adminPasswordReset.updateMany({
      where: { adminUserId: user.id, consumedAt: null },
      data: { consumedAt: new Date() },
    });

    const token = generateOpaqueToken();
    await prisma.adminPasswordReset.create({
      data: {
        adminUserId: user.id,
        tokenHash: sha256Hex(token),
        expiresAt: new Date(Date.now() + RESET_TOKEN_TTL_MS),
      },
    });

    const origin = new URL(request.url).origin;
    const resetUrl = `${origin}/admin/reset-password?token=${token}`;

    await sendAdminPasswordResetEmail(user.email, resetUrl);

    return NextResponse.json(GENERIC_RESPONSE);
  } catch (error) {
    console.error('Admin forgot-password failed:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(GENERIC_RESPONSE);
  }
}
