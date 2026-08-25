import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { adminResetPasswordSchema } from '@/lib/validators/adminAuth';
import { hashPassword, sha256Hex } from '@/lib/admin/crypto';
import { revokeAllSessionsForUser } from '@/lib/admin/session';

const GENERIC_ERROR = 'This reset link is invalid or has expired.';

async function findValidReset(token: string) {
  const tokenHash = sha256Hex(token);
  const reset = await prisma.adminPasswordReset.findUnique({ where: { tokenHash } });
  if (!reset || reset.consumedAt || reset.expiresAt < new Date()) return null;
  return reset;
}

// Lets the reset-password page show "this link is invalid/expired" before
// the admin even fills in a new password, without consuming the token.
export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get('token') ?? '';
  const reset = token ? await findValidReset(token) : null;
  return NextResponse.json({ valid: Boolean(reset) });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = adminResetPasswordSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? GENERIC_ERROR }, { status: 400 });
  }

  try {
    const reset = await findValidReset(parsed.data.token);
    if (!reset) {
      return NextResponse.json({ error: GENERIC_ERROR }, { status: 400 });
    }

    const passwordHash = await hashPassword(parsed.data.password);

    await prisma.$transaction([
      prisma.adminUser.update({ where: { id: reset.adminUserId }, data: { passwordHash } }),
      prisma.adminPasswordReset.update({ where: { id: reset.id }, data: { consumedAt: new Date() } }),
    ]);

    // A password reset means the prior password may have been compromised —
    // force re-login everywhere rather than leaving old sessions valid.
    await revokeAllSessionsForUser(reset.adminUserId);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Admin reset-password failed:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
