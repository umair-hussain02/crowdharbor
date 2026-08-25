import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { updateArticleSchema } from '@/lib/validators/article';
import { ensureUniqueSlug, parsePublishedAt, slugify, toDetailItem } from '@/lib/admin/blog';
import { requireAdmin } from '@/lib/admin/session';

type RouteParams = { params: Promise<{ id: string }> };

function isNotFoundError(error: unknown) {
  return typeof error === 'object' && error !== null && 'code' in error && error.code === 'P2025';
}

export async function GET(_request: Request, { params }: RouteParams) {
  const admin = await requireAdmin();
  if (admin instanceof NextResponse) return admin;

  const { id } = await params;

  try {
    const row = await prisma.article.findUnique({ where: { id } });

    if (!row) {
      return NextResponse.json({ error: 'Article not found.' }, { status: 404 });
    }

    return NextResponse.json({ article: toDetailItem(row) });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Failed to load article:', error);
    } else {
      console.error('Failed to load article:', error instanceof Error ? error.message : 'Unknown error');
    }
    return NextResponse.json({ error: 'Could not load article.' }, { status: 500 });
  }
}

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

  const result = updateArticleSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: result.error.issues[0]?.message ?? 'Invalid request body.' },
      { status: 400 }
    );
  }

  const data = result.data;
  if (Object.keys(data).length === 0) {
    return NextResponse.json({ error: 'Provide at least one field to update.' }, { status: 400 });
  }

  let publishedAt: Date | null | undefined;
  if (data.publishedAt !== undefined) {
    publishedAt = parsePublishedAt(data.publishedAt);
    if (publishedAt === undefined) {
      return NextResponse.json({ error: 'Publish date is invalid.' }, { status: 400 });
    }
  }

  try {
    const existing = await prisma.article.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Article not found.' }, { status: 404 });
    }

    // Only touch the slug when the caller explicitly sends one — a title
    // edit alone should never silently change an article's URL.
    let slug: string | undefined;
    if (data.slug !== undefined) {
      slug = await ensureUniqueSlug(slugify(data.slug) || slugify(existing.title), id);
    }

    // Moving an article to "published" with no publishedAt on file (and none
    // supplied in this request) defaults it to now.
    if (data.status === 'published' && publishedAt === undefined && existing.publishedAt === null) {
      publishedAt = new Date();
    }

    const updated = await prisma.article.update({
      where: { id },
      data: {
        ...(data.title !== undefined && { title: data.title }),
        ...(slug !== undefined && { slug }),
        ...(data.excerpt !== undefined && { excerpt: data.excerpt || null }),
        ...(data.content !== undefined && { content: data.content || null }),
        ...(data.status !== undefined && { status: data.status }),
        ...(data.category !== undefined && { category: data.category || null }),
        ...(data.author !== undefined && { author: data.author || null }),
        ...(data.seoTitle !== undefined && { seoTitle: data.seoTitle || null }),
        ...(data.metaDescription !== undefined && { metaDescription: data.metaDescription || null }),
        ...(data.featuredImage !== undefined && { featuredImage: data.featuredImage || null }),
        ...(publishedAt !== undefined && { publishedAt }),
      },
    });

    return NextResponse.json({ article: toDetailItem(updated) });
  } catch (error) {
    if (isNotFoundError(error)) {
      return NextResponse.json({ error: 'Article not found.' }, { status: 404 });
    }

    if (process.env.NODE_ENV !== 'production') {
      console.error('Failed to update article:', error);
    } else {
      console.error('Failed to update article:', error instanceof Error ? error.message : 'Unknown error');
    }
    return NextResponse.json({ error: 'Could not update article.' }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const admin = await requireAdmin();
  if (admin instanceof NextResponse) return admin;

  const { id } = await params;

  try {
    await prisma.article.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    if (isNotFoundError(error)) {
      return NextResponse.json({ error: 'Article not found.' }, { status: 404 });
    }

    if (process.env.NODE_ENV !== 'production') {
      console.error('Failed to delete article:', error);
    } else {
      console.error('Failed to delete article:', error instanceof Error ? error.message : 'Unknown error');
    }
    return NextResponse.json({ error: 'Could not delete article.' }, { status: 500 });
  }
}
