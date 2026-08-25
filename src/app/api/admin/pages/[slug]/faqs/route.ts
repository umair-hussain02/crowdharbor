import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createPageFaqSchema } from '@/lib/validators/pageFaq';
import { findPageBySlug, toListItem } from '@/lib/admin/pageFaqs';
import { requireAdmin } from '@/lib/admin/session';

type RouteParams = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, { params }: RouteParams) {
  const admin = await requireAdmin();
  if (admin instanceof NextResponse) return admin;

  const { slug } = await params;

  try {
    const page = await findPageBySlug(slug);
    if (!page) {
      return NextResponse.json({ error: 'Page not found.' }, { status: 404 });
    }

    const rows = await prisma.pageFaq.findMany({
      where: { pageId: page.id },
      orderBy: { sortOrder: 'asc' },
    });

    return NextResponse.json({ items: rows.map(toListItem) });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Failed to list page FAQs:', error);
    } else {
      console.error('Failed to list page FAQs:', error instanceof Error ? error.message : 'Unknown error');
    }
    return NextResponse.json({ error: 'Could not load FAQs.' }, { status: 500 });
  }
}

export async function POST(request: Request, { params }: RouteParams) {
  const admin = await requireAdmin();
  if (admin instanceof NextResponse) return admin;

  const { slug } = await params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const result = createPageFaqSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: result.error.issues[0]?.message ?? 'Invalid request body.' },
      { status: 400 }
    );
  }

  const data = result.data;

  try {
    const page = await findPageBySlug(slug);
    if (!page) {
      return NextResponse.json({ error: 'Page not found.' }, { status: 404 });
    }

    let sortOrder = data.sortOrder;
    if (sortOrder === undefined) {
      const last = await prisma.pageFaq.findFirst({
        where: { pageId: page.id },
        orderBy: { sortOrder: 'desc' },
      });
      sortOrder = last ? last.sortOrder + 1 : 0;
    }

    const created = await prisma.pageFaq.create({
      data: {
        pageId: page.id,
        question: data.question,
        answer: data.answer,
        sortOrder,
        isActive: data.isActive,
      },
    });

    return NextResponse.json({ faq: toListItem(created) }, { status: 201 });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Failed to create page FAQ:', error);
    } else {
      console.error('Failed to create page FAQ:', error instanceof Error ? error.message : 'Unknown error');
    }
    return NextResponse.json({ error: 'Could not create FAQ.' }, { status: 500 });
  }
}
