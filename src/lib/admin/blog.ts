import { prisma } from '@/lib/prisma';
import type { Article } from '@/generated/prisma/client';

function formatDate(date: Date | null) {
  if (!date) return '—';
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// Appends -2, -3, ... until a free slug is found. `excludeId` lets an update
// keep its own current slug without colliding with itself.
export async function ensureUniqueSlug(base: string, excludeId?: string): Promise<string> {
  const fallback = base || 'article';
  let candidate = fallback;
  let suffix = 1;

  while (true) {
    const existing = await prisma.article.findUnique({ where: { slug: candidate } });
    if (!existing || existing.id === excludeId) return candidate;
    suffix += 1;
    candidate = `${fallback}-${suffix}`;
  }
}

// Returns a Date if the string parses to a real date, null if the string is
// empty/absent, or undefined if the string is present but invalid.
export function parsePublishedAt(value: string | undefined): Date | null | undefined {
  if (value === undefined) return null;
  if (value.trim() === '') return null;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return undefined;
  return parsed;
}

function deriveSeo(seoTitle: string | null, metaDescription: string | null): 'good' | 'missing' {
  return seoTitle && metaDescription ? 'good' : 'missing';
}

export function toListItem(row: Article) {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    category: row.category || '—',
    status: row.status,
    author: row.author || '—',
    updated: formatDate(row.updatedAt),
    published: formatDate(row.publishedAt),
    seo: deriveSeo(row.seoTitle, row.metaDescription),
  };
}

export type ArticleListItem = ReturnType<typeof toListItem>;

export function toDetailItem(row: Article) {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt || '',
    content: row.content || '',
    status: row.status,
    category: row.category || '',
    author: row.author || '',
    seoTitle: row.seoTitle || '',
    metaDescription: row.metaDescription || '',
    featuredImage: row.featuredImage || '',
    publishedAt: row.publishedAt ? row.publishedAt.toISOString().slice(0, 10) : '',
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export type ArticleDetailItem = ReturnType<typeof toDetailItem>;
