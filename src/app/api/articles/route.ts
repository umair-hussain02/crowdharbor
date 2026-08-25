import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { toPublicListItem } from '@/lib/public/articles';

// Public-facing route — only ever returns published articles, and only the
// fields the public site needs. Admin-only data (drafts, SEO fields, author)
// stays behind /api/admin/blog/articles.

export async function GET() {
  try {
    const rows = await prisma.article.findMany({
      where: { status: 'published' },
      orderBy: { publishedAt: 'desc' },
      take: 100,
    });

    return NextResponse.json({ items: rows.map(toPublicListItem) });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Failed to list public articles:', error);
    } else {
      console.error('Failed to list public articles:', error instanceof Error ? error.message : 'Unknown error');
    }
    return NextResponse.json({ error: 'Could not load articles.' }, { status: 500 });
  }
}
