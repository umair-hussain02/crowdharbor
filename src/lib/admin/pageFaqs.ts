import type { PageFaq } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';

export function toListItem(row: PageFaq) {
  return {
    id: row.id,
    question: row.question,
    answer: row.answer,
    sortOrder: row.sortOrder,
    isActive: row.isActive,
  };
}

export type PageFaqListItem = ReturnType<typeof toListItem>;

// Shared by every admin FAQ route — resolves the page once so each route
// doesn't repeat the same "page not found" handling.
export async function findPageBySlug(slug: string) {
  return prisma.page.findUnique({ where: { slug } });
}
