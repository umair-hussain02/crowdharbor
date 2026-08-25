import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { updateServicesSchema } from '@/lib/validators/service';
import { toListItem } from '@/lib/admin/services';
import { requireAdmin } from '@/lib/admin/session';

export async function GET() {
  const admin = await requireAdmin();
  if (admin instanceof NextResponse) return admin;

  try {
    const rows = await prisma.service.findMany({ orderBy: { sortOrder: 'asc' } });
    return NextResponse.json({ items: rows.map(toListItem) });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Failed to list services:', error);
    } else {
      console.error('Failed to list services:', error instanceof Error ? error.message : 'Unknown error');
    }
    return NextResponse.json({ error: 'Could not load services.' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const admin = await requireAdmin();
  if (admin instanceof NextResponse) return admin;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const result = updateServicesSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: result.error.issues[0]?.message ?? 'Invalid request body.' },
      { status: 400 }
    );
  }

  try {
    const updated = await prisma.$transaction(
      result.data.services.map(({ id, price, isActive }) =>
        prisma.service.update({
          where: { id },
          data: {
            ...(price !== undefined && { price }),
            ...(isActive !== undefined && { isActive }),
          },
        })
      )
    );

    return NextResponse.json({ items: updated.map(toListItem) });
  } catch (error) {
    const isNotFound = typeof error === 'object' && error !== null && 'code' in error && error.code === 'P2025';
    if (isNotFound) {
      return NextResponse.json({ error: 'One or more services were not found.' }, { status: 404 });
    }

    if (process.env.NODE_ENV !== 'production') {
      console.error('Failed to update services:', error);
    } else {
      console.error('Failed to update services:', error instanceof Error ? error.message : 'Unknown error');
    }
    return NextResponse.json({ error: 'Could not save changes.' }, { status: 500 });
  }
}
