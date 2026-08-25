import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateOpaqueToken, sha256Hex } from './crypto';
import { SESSION_COOKIE } from './sessionCookie';

const SESSION_TTL_MS = 8 * 60 * 60 * 1000; // fixed 8-hour expiration, not extended on activity

export type CurrentAdmin = { id: string; email: string; name: string; role: string };

export async function createSession(adminUserId: string) {
  const token = generateOpaqueToken();
  const tokenHash = sha256Hex(token);
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS);

  await prisma.adminSession.create({
    data: { adminUserId, tokenHash, expiresAt },
  });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: expiresAt,
  });
}

// The real session-validity check: looks up the hashed token in the DB and
// confirms it isn't expired/revoked/for a deactivated account. This is the
// actual security boundary for both pages (via /api/admin/auth/me) and APIs
// (via requireAdmin below) — the cookie's mere presence proves nothing on
// its own.
export async function getCurrentAdmin(): Promise<CurrentAdmin | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const tokenHash = sha256Hex(token);
  const session = await prisma.adminSession.findUnique({
    where: { tokenHash },
    include: { adminUser: true },
  });

  if (!session || session.revokedAt || session.expiresAt < new Date()) return null;
  if (!session.adminUser.isActive) return null;

  // Last-activity bookkeeping only — does not extend expiresAt (fixed expiration).
  prisma.adminSession.update({ where: { id: session.id }, data: { lastUsedAt: new Date() } }).catch(() => {});

  return {
    id: session.adminUser.id,
    email: session.adminUser.email,
    name: session.adminUser.name,
    role: session.adminUser.role,
  };
}

export async function requireAdmin(): Promise<CurrentAdmin | NextResponse> {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized. Please sign in.' }, { status: 401 });
  }
  return admin;
}

// Called after a password reset — forces re-login on every device/browser
// the account was signed into, in case the password change was prompted by
// a compromised credential.
export async function revokeAllSessionsForUser(adminUserId: string) {
  await prisma.adminSession.updateMany({
    where: { adminUserId, revokedAt: null },
    data: { revokedAt: new Date() },
  });
}

export async function destroySession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (token) {
    const tokenHash = sha256Hex(token);
    await prisma.adminSession.updateMany({
      where: { tokenHash, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }

  cookieStore.delete(SESSION_COOKIE);
}
