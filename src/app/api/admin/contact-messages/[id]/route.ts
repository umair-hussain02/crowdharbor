import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { toDetailItem } from '@/lib/admin/contactMessages';
import { requireAdmin } from '@/lib/admin/session';

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: RouteParams) {
  const admin = await requireAdmin();
  if (admin instanceof NextResponse) return admin;

  const { id } = await params;

  try {
    const row = await prisma.contactSubmission.findUnique({ where: { id } });

    if (!row) {
      return NextResponse.json({ error: 'Message not found.' }, { status: 404 });
    }

    return NextResponse.json({ message: toDetailItem(row) });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Failed to load contact message:', error);
    } else {
      console.error('Failed to load contact message:', error instanceof Error ? error.message : 'Unknown error');
    }
    return NextResponse.json({ error: 'Could not load message.' }, { status: 500 });
  }
}

const patchSchema = z.object({
  status: z.enum(['new', 'read', 'archived'], { message: 'Status must be one of: new, read, archived.' }),
});

export async function PATCH(request: Request, { params }: RouteParams) {
  const admin = await requireAdmin();
  if (admin instanceof NextResponse) return admin;

  const { id } = await params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const result = patchSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: result.error.issues[0]?.message ?? 'Invalid request body.' },
      { status: 400 }
    );
  }

  try {
    const updated = await prisma.contactSubmission.update({
      where: { id },
      data: { status: result.data.status },
    });

    return NextResponse.json({ message: toDetailItem(updated) });
  } catch (error) {
    const isNotFound = typeof error === 'object' && error !== null && 'code' in error && error.code === 'P2025';
    if (isNotFound) {
      return NextResponse.json({ error: 'Message not found.' }, { status: 404 });
    }

    if (process.env.NODE_ENV !== 'production') {
      console.error('Failed to update contact message:', error);
    } else {
      console.error('Failed to update contact message:', error instanceof Error ? error.message : 'Unknown error');
    }
    return NextResponse.json({ error: 'Could not update message.' }, { status: 500 });
  }
}
