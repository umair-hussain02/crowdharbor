import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin/session';

// No Notification model exists, so every item here is derived from real rows
// in other tables rather than stored/read as "read" state. Everything
// returned is treated as currently actionable (unread).

const DUE_DAYS = 7;
const MAX_ITEMS = 8;

type NotificationItem = {
  id: string;
  type: 'submission' | 'contact' | 'report-overdue' | 'performance';
  message: string;
  href: string;
  createdAt: string;
};

export async function GET() {
  const admin = await requireAdmin();
  if (admin instanceof NextResponse) return admin;

  const now = new Date();
  const overdueCutoff = new Date(now.getTime() - DUE_DAYS * 24 * 60 * 60 * 1000);
  const perfWindowStart = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  try {
    const [newSubmissions, newContactMessages, overdueSubmissions, poorVitalCount] = await Promise.all([
      prisma.intakeSubmission.findMany({
        where: { status: 'new' },
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: { id: true, name: true, companyName: true, createdAt: true },
      }),
      prisma.contactSubmission.findMany({
        where: { status: 'new' },
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: { id: true, name: true, createdAt: true },
      }),
      prisma.intakeSubmission.findMany({
        where: {
          createdAt: { lt: overdueCutoff },
          status: { notIn: ['report-delivered', 'closed'] },
        },
        orderBy: { createdAt: 'asc' },
        take: 5,
        select: { id: true, name: true, companyName: true, createdAt: true },
      }),
      prisma.webVital.count({
        where: { createdAt: { gte: perfWindowStart }, rating: 'poor' },
      }),
    ]);

    const items: NotificationItem[] = [];

    for (const row of newSubmissions) {
      items.push({
        id: `submission-${row.id}`,
        type: 'submission',
        message: `New submission from ${row.name} (${row.companyName})`,
        href: `/admin/submissions/${row.id}`,
        createdAt: row.createdAt.toISOString(),
      });
    }

    for (const row of newContactMessages) {
      items.push({
        id: `contact-${row.id}`,
        type: 'contact',
        message: `New contact inquiry from ${row.name}`,
        href: `/admin/contact-messages/${row.id}`,
        createdAt: row.createdAt.toISOString(),
      });
    }

    for (const row of overdueSubmissions) {
      items.push({
        id: `overdue-${row.id}`,
        type: 'report-overdue',
        message: `Report overdue — ${row.companyName} (${row.name})`,
        href: `/admin/reports`,
        createdAt: row.createdAt.toISOString(),
      });
    }

    if (poorVitalCount > 0) {
      items.push({
        id: 'performance-warning',
        type: 'performance',
        message: `${poorVitalCount} poor Web Vitals sample${poorVitalCount === 1 ? '' : 's'} in the last 30 days`,
        href: '/admin/performance',
        createdAt: now.toISOString(),
      });
    }

    items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json({
      items: items.slice(0, MAX_ITEMS),
      count: Math.min(items.length, MAX_ITEMS),
    });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Failed to load notifications:', error);
    } else {
      console.error('Failed to load notifications:', error instanceof Error ? error.message : 'Unknown error');
    }
    return NextResponse.json({ error: 'Could not load notifications.' }, { status: 500 });
  }
}
