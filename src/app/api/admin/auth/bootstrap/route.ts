import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/admin/crypto';

// One-time setup endpoint — intentionally requires no auth, but is safe
// because it self-disables forever after the very first AdminUser is
// created (it refuses to run again once any admin account exists, so it
// can never be used to create extra/rogue admins later).
//
// Reads the initial admin's email/password from server-only env vars
// (ADMIN_EMAIL, ADMIN_INITIAL_PASSWORD) — never from the request body —
// so the password is never sent over the network and never logged.

export async function POST() {
  try {
    const existingCount = await prisma.adminUser.count();
    if (existingCount > 0) {
      return NextResponse.json({ error: 'An admin account already exists. This setup endpoint is now disabled.' }, { status: 403 });
    }

    const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const password = process.env.ADMIN_INITIAL_PASSWORD;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Set ADMIN_EMAIL and ADMIN_INITIAL_PASSWORD in your .env file, restart the dev server, then call this endpoint again.' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json({ error: 'ADMIN_INITIAL_PASSWORD must be at least 8 characters.' }, { status: 400 });
    }

    const passwordHash = await hashPassword(password);
    const name = email.split('@')[0];

    await prisma.adminUser.create({
      data: { email, passwordHash, name, role: 'admin', isActive: true },
    });

    return NextResponse.json({ ok: true, message: `Admin account created for ${email}. You can now remove ADMIN_INITIAL_PASSWORD from .env.` });
  } catch (error) {
    console.error('Admin bootstrap failed:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json({ error: 'Could not create admin account.' }, { status: 500 });
  }
}
