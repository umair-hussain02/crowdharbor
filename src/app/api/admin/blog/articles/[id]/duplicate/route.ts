import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ensureUniqueSlug, slugify, toDetailItem } from '@/lib/admin/blog';
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

    const title = `${existing.title} Copy`;
    const slug = await ensureUniqueSlug(slugify(title));

    const created = await prisma.article.create({
      data: {
        title,
        slug,
        excerpt: existing.excerpt,
        content: existing.content,
        status: 'draft',
        category: existing.category,
        author: existing.author,
        seoTitle: existing.seoTitle,
        metaDescription: existing.metaDescription,
        featuredImage: existing.featuredImage,
        publishedAt: null,
      },
    });

    return NextResponse.json({ article: toDetailItem(created) }, { status: 201 });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Failed to duplicate article:', error);
    } else {
      console.error('Failed to duplicate article:', error instanceof Error ? error.message : 'Unknown error');
    }
    return NextResponse.json({ error: 'Could not duplicate article.' }, { status: 500 });
  }
}
