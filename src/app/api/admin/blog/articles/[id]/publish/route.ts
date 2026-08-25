import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { toDetailItem } from '@/lib/admin/blog';
import { requireAdmin } from '@/lib/admin/session';

type RouteParams = { params: Promise<{ id: string }> };

export async function POST(_request: Request, { params }: RouteParams) {
  const admin = await requireAdmin();
  if (admin instanceof NextResponse) return admin;

  const { id } = await params;

  try {
    const existing = await prisma.article.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Article not found.' }, { status: 404 });
    }

    const updated = await prisma.article.update({
      where: { id },
      data: {
        status: 'published',
        publishedAt: existing.publishedAt ?? new Date(),
      },
    });

    return NextResponse.json({ article: toDetailItem(updated) });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Failed to publish article:', error);
    } else {
      console.error('Failed to publish article:', error instanceof Error ? error.message : 'Unknown error');
    }
    return NextResponse.json({ error: 'Could not publish article.' }, { status: 500 });
  }
}
