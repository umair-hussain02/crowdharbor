import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import type { Prisma } from '@/generated/prisma/client';
import { createArticleSchema } from '@/lib/validators/article';
import { ensureUniqueSlug, parsePublishedAt, slugify, toDetailItem, toListItem } from '@/lib/admin/blog';
import { requireAdmin } from '@/lib/admin/session';

export async function GET(request: Request) {
  const admin = await requireAdmin();
  if (admin instanceof NextResponse) return admin;

  const { searchParams } = new URL(request.url);

  const search = (searchParams.get('search') ?? '').trim();
  const category = searchParams.get('category') ?? 'All';
  const status = searchParams.get('status') ?? 'All';
  const page = Math.max(1, Number(searchParams.get('page') ?? '1') || 1);
  const perPage = Math.min(50, Math.max(1, Number(searchParams.get('perPage') ?? '10') || 10));

  const andConditions: Prisma.ArticleWhereInput[] = [];

  if (search) {
    andConditions.push({
      OR: [
        { title: { contains: search, mode: 'insensitive' } },
        { category: { contains: search, mode: 'insensitive' } },
      ],
    });
  }

  if (category !== 'All') {
    andConditions.push({ category });
  }

  if (status !== 'All') {
    andConditions.push({ status });
  }

  const where: Prisma.ArticleWhereInput = andConditions.length ? { AND: andConditions } : {};

  try {
    const [total, rows] = await Promise.all([
      prisma.article.count({ where }),
      prisma.article.findMany({
        where,
        orderBy: { updatedAt: 'desc' },
        skip: (page - 1) * perPage,
        take: perPage,
      }),
    ]);

    return NextResponse.json({
      items: rows.map(toListItem),
      total,
      page,
      perPage,
      totalPages: Math.max(1, Math.ceil(total / perPage)),
    });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Failed to list articles:', error);
    } else {
      console.error('Failed to list articles:', error instanceof Error ? error.message : 'Unknown error');
    }
    return NextResponse.json({ error: 'Could not load articles.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const admin = await requireAdmin();
  if (admin instanceof NextResponse) return admin;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const result = createArticleSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: result.error.issues[0]?.message ?? 'Invalid request body.' },
      { status: 400 }
    );
  }

  const data = result.data;

  const publishedAt = parsePublishedAt(data.publishedAt);
  if (publishedAt === undefined) {
    return NextResponse.json({ error: 'Publish date is invalid.' }, { status: 400 });
  }

  try {
    const baseSlug = slugify(data.slug || data.title);
    const slug = await ensureUniqueSlug(baseSlug);

    const created = await prisma.article.create({
      data: {
        title: data.title,
        slug,
        excerpt: data.excerpt || null,
        content: data.content || null,
        status: data.status,
        category: data.category || null,
        author: data.author || null,
        seoTitle: data.seoTitle || null,
        metaDescription: data.metaDescription || null,
        featuredImage: data.featuredImage || null,
        // "Missing" publishedAt on a published article defaults to now.
        publishedAt: publishedAt ?? (data.status === 'published' ? new Date() : null),
      },
    });

    return NextResponse.json({ article: toDetailItem(created) }, { status: 201 });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Failed to create article:', error);
    } else {
      console.error('Failed to create article:', error instanceof Error ? error.message : 'Unknown error');
    }
    return NextResponse.json({ error: 'Could not create article.' }, { status: 500 });
  }
}
