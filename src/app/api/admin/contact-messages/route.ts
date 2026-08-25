import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import type { Prisma } from '@/generated/prisma/client';
import { toListItem } from '@/lib/admin/contactMessages';
import { requireAdmin } from '@/lib/admin/session';

export async function GET(request: Request) {
  const admin = await requireAdmin();
  if (admin instanceof NextResponse) return admin;

  const { searchParams } = new URL(request.url);

  const search = (searchParams.get('search') ?? '').trim();
  const status = searchParams.get('status') ?? 'All';
  const page = Math.max(1, Number(searchParams.get('page') ?? '1') || 1);
  const perPage = Math.min(50, Math.max(1, Number(searchParams.get('perPage') ?? '10') || 10));

  const andConditions: Prisma.ContactSubmissionWhereInput[] = [];

  if (search) {
    // No separate "subject" field exists on ContactSubmission — inquiryType
    // is the closest equivalent, so it's included in the search instead.
    andConditions.push({
      OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { inquiryType: { contains: search, mode: 'insensitive' } },
        { message: { contains: search, mode: 'insensitive' } },
      ],
    });
  }

  if (status !== 'All') {
    andConditions.push({ status });
  }

  const where: Prisma.ContactSubmissionWhereInput = andConditions.length ? { AND: andConditions } : {};

  try {
    const [total, rows] = await Promise.all([
      prisma.contactSubmission.count({ where }),
      prisma.contactSubmission.findMany({
        where,
        orderBy: { createdAt: 'desc' },
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
      console.error('Failed to list contact messages:', error);
    } else {
      console.error('Failed to list contact messages:', error instanceof Error ? error.message : 'Unknown error');
    }
    return NextResponse.json({ error: 'Could not load contact messages.' }, { status: 500 });
  }
}
