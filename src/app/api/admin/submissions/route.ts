import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import type { Prisma } from '@/generated/prisma/client';
import { toListItem } from '@/lib/admin/submissions';
import { requireAdmin } from '@/lib/admin/session';

export async function GET(request: Request) {
  const admin = await requireAdmin();
  if (admin instanceof NextResponse) return admin;

  const { searchParams } = new URL(request.url);

  const search = (searchParams.get('search') ?? '').trim();
  const status = searchParams.get('status') ?? 'All';
  const service = searchParams.get('service') ?? 'All';
  const page = Math.max(1, Number(searchParams.get('page') ?? '1') || 1);
  // Capped at 5000 rather than 50 so CSV export (which requests one large page)
  // can return every matching row — the Submissions page itself always uses
  // the small default (6) and is unaffected by this ceiling.
  const perPage = Math.min(5000, Math.max(1, Number(searchParams.get('perPage') ?? '6') || 6));

  const andConditions: Prisma.IntakeSubmissionWhereInput[] = [];

  if (search) {
    andConditions.push({
      OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { companyName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ],
    });
  }

  if (status !== 'All') {
    andConditions.push({ status });
  }

  if (service !== 'All') {
    // Substring match mirrors the dashboard's previous client-side filter behavior.
    andConditions.push({ selectedService: { contains: service, mode: 'insensitive' } });
  }

  // The "payment" filter has no backing column yet (see toListItem) — once the
  // Payments chunk adds a real field, wire it into this where clause too.

  const where: Prisma.IntakeSubmissionWhereInput = andConditions.length ? { AND: andConditions } : {};

  try {
    const [total, rows] = await Promise.all([
      prisma.intakeSubmission.count({ where }),
      prisma.intakeSubmission.findMany({
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
      console.error('Failed to list submissions:', error);
    } else {
      console.error('Failed to list submissions:', error instanceof Error ? error.message : 'Unknown error');
    }
    return NextResponse.json({ error: 'Could not load submissions.' }, { status: 500 });
  }
}
