import type { Page } from '@/generated/prisma/client';

function formatDate(date: Date) {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function deriveSeoStatus(seoTitle: string | null | undefined, metaDescription: string | null | undefined): 'good' | 'missing' {
  return seoTitle && metaDescription ? 'good' : 'missing';
}

export function toListItem(row: Page) {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    routePath: row.routePath,
    status: row.status,
    seoStatus: row.seoStatus,
    updated: formatDate(row.updatedAt),
    updatedBy: row.updatedBy || '—',
  };
}

export type PageListItem = ReturnType<typeof toListItem>;

export function toDetailItem(row: Page) {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    routePath: row.routePath,
    status: row.status,
    seoTitle: row.seoTitle || '',
    metaDescription: row.metaDescription || '',
    seoStatus: row.seoStatus,
    contentJson: row.contentJson,
    updatedBy: row.updatedBy || '—',
    updated: formatDate(row.updatedAt),
  };
}

export type PageDetailItem = ReturnType<typeof toDetailItem>;
