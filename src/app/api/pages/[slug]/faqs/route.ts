import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Public-facing route — only ever returns active FAQs for a page, and only
// the fields the public site needs. Inactive FAQs and admin-only metadata
// stay behind /api/admin/pages/[slug]/faqs.

type RouteParams = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, { params }: RouteParams) {
  const { slug } = await params;

  try {
    const page = await prisma.page.findUnique({ where: { slug } });
    if (!page) {
      return NextResponse.json({ items: [] });
    }

    const rows = await prisma.pageFaq.findMany({
      where: { pageId: page.id, isActive: true },
      orderBy: { sortOrder: 'asc' },
    });

    return NextResponse.json({
      items: rows.map((row) => ({ question: row.question, answer: row.answer })),
    });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Failed to list public page FAQs:', error);
    } else {
      console.error('Failed to list public page FAQs:', error instanceof Error ? error.message : 'Unknown error');
    }
    return NextResponse.json({ error: 'Could not load FAQs.' }, { status: 500 });
  }
}
