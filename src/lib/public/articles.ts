import type { Article } from '@/generated/prisma/client';

export function estimateReadTime(content: string | null): string {
  const words = content ? content.trim().split(/\s+/).filter(Boolean).length : 0;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

export function formatPublicDate(date: Date | null) {
  if (!date) return '';
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export function toPublicListItem(row: Article) {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt || '',
    category: row.category || 'General',
    readTime: estimateReadTime(row.content),
  };
}

export type PublicArticleListItem = ReturnType<typeof toPublicListItem>;

export function toPublicDetailItem(row: Article) {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt || '',
    content: row.content || '',
    category: row.category || 'General',
    author: row.author || 'CrowdHarbor Team',
    readTime: estimateReadTime(row.content),
    publishedAt: formatPublicDate(row.publishedAt),
  };
}

export type PublicArticleDetailItem = ReturnType<typeof toPublicDetailItem>;
