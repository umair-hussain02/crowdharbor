import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Public-facing route — only ever returns active services, and only the
// fields the public site needs. Admin-only fields stay behind
// /api/admin/settings/services.

export async function GET() {
  try {
    const rows = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    });

    return NextResponse.json({
      items: rows.map((row) => ({
        name: row.name,
        slug: row.slug,
        description: row.description || '',
        price: row.price,
        currency: row.currency,
        isStartingPrice: row.isStartingPrice,
      })),
    });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Failed to list public services:', error);
    } else {
      console.error('Failed to list public services:', error instanceof Error ? error.message : 'Unknown error');
    }
    return NextResponse.json({ error: 'Could not load services.' }, { status: 500 });
  }
}
