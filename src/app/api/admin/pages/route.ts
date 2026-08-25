import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import type { Prisma } from '@/generated/prisma/client';
import { toListItem } from '@/lib/admin/pages';
import { requireAdmin } from '@/lib/admin/session';

export async function GET(request: Request) {
  const admin = await requireAdmin();
  if (admin instanceof NextResponse) return admin;

  const { searchParams } = new URL(request.url);
  const search = (searchParams.get('search') ?? '').trim();

  // No search/filter UI exists on the Pages dashboard yet — this param is
  // accepted now for forward compatibility but nothing currently sends it.
  const where: Prisma.PageWhereInput = search
    ? {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { slug: { contains: search, mode: 'insensitive' } },
        ],
      }
    : {};

  try {
    const rows = await prisma.page.findMany({
      where,
      orderBy: { updatedAt: 'desc' },
    });

    return NextResponse.json({ items: rows.map(toListItem), total: rows.length });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Failed to list pages:', error);
    } else {
      console.error('Failed to list pages:', error instanceof Error ? error.message : 'Unknown error');
    }
    return NextResponse.json({ error: 'Could not load pages.' }, { status: 500 });
  }
}
