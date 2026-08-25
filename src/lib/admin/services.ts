import type { Service } from '@/generated/prisma/client';

export function toListItem(row: Service) {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description || '',
    price: row.price,
    currency: row.currency,
    isActive: row.isActive,
    sortOrder: row.sortOrder,
  };
}

export type ServiceListItem = ReturnType<typeof toListItem>;
