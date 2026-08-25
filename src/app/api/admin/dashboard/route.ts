import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { toListItem } from '@/lib/admin/submissions';
import { requireAdmin } from '@/lib/admin/session';

// Revenue, Pending Payments, Reports Pending, and Reports Delivered stay
// `null` below — no Payment or Report model exists yet, so these are
// genuinely not computable rather than faked.
//
// Where a real model exists (IntakeSubmission, ContactSubmission), counts
// come from that table directly rather than from AnalyticsEvent proxies —
// AnalyticsEvent is only used for visitor-level metrics that have no DB
// equivalent (visitors, page views, intake starts, CTA clicks, sources).

const WINDOW_DAYS = 30;

function formatDay(date: Date) {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export async function GET() {
  const admin = await requireAdmin();
  if (admin instanceof NextResponse) return admin;

  const now = new Date();
  const windowStart = new Date(now.getTime() - WINDOW_DAYS * 24 * 60 * 60 * 1000);
  windowStart.setUTCHours(0, 0, 0, 0);
  const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const eventWhere = { createdAt: { gte: windowStart, lte: now } };

  try {
    const [
      uniqueVisitorRows,
      intakeStarts,
      ctaClicks,
      pageViews,
      intakeSubmissionsInWindow,
      contactSubmissionsInWindow,
      newSubmissionsThisWeek,
      visitorChartRows,
      recentSubmissionsRaw,
      ctaClickRows,
      topSourceRows,
      recentEventsRaw,
    ] = await Promise.all([
      prisma.visitorSession.groupBy({ by: ['visitorId'], where: eventWhere }),
      prisma.analyticsEvent.count({ where: { ...eventWhere, eventName: 'intake_start' } }),
      prisma.analyticsEvent.count({ where: { ...eventWhere, eventName: 'cta_click' } }),
      prisma.analyticsEvent.count({ where: { ...eventWhere, eventName: 'page_view' } }),
      // Real model, not the analytics-event proxy, since IntakeSubmission exists.
      prisma.intakeSubmission.count({ where: { createdAt: { gte: windowStart, lte: now } } }),
      // Real model, not the analytics-event proxy, since ContactSubmission exists.
      prisma.contactSubmission.count({ where: { createdAt: { gte: windowStart, lte: now } } }),
      prisma.intakeSubmission.count({ where: { createdAt: { gte: weekStart } } }),
      prisma.$queryRaw<{ day: Date; visitors: bigint }[]>`
        SELECT date_trunc('day', "createdAt") AS day, count(DISTINCT "sessionId") AS visitors
        FROM "AnalyticsEvent"
        WHERE "createdAt" >= ${windowStart} AND "createdAt" <= ${now}
        GROUP BY day
        ORDER BY day ASC
      `,
      prisma.intakeSubmission.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
      prisma.analyticsEvent.findMany({
        where: { ...eventWhere, eventName: 'cta_click' },
        select: { metadata: true },
        take: 500,
      }),
      prisma.analyticsEvent.groupBy({
        by: ['source'],
        where: { ...eventWhere, eventName: 'page_view' },
        _count: { _all: true },
      }),
      prisma.analyticsEvent.findMany({
        orderBy: { createdAt: 'desc' },
        take: 10,
        select: { eventName: true, path: true, createdAt: true },
      }),
    ]);

    const totalVisitors = uniqueVisitorRows.length;
    const conversionRate = intakeStarts > 0 ? Math.round((intakeSubmissionsInWindow / intakeStarts) * 1000) / 10 : 0;

    const visitorsByDay = new Map(visitorChartRows.map((row) => [row.day.toISOString().slice(0, 10), Number(row.visitors)]));
    const visitorChart: { date: string; visitors: number }[] = [];
    const cursor = new Date(windowStart);
    while (cursor <= now) {
      const key = cursor.toISOString().slice(0, 10);
      visitorChart.push({ date: formatDay(cursor), visitors: visitorsByDay.get(key) ?? 0 });
      cursor.setUTCDate(cursor.getUTCDate() + 1);
    }

    // Only the stages we can actually measure — "Payment Done" is dropped
    // rather than faked, since no Payment model exists yet.
    const funnel = [
      { step: 'Website Visit', count: pageViews },
      { step: 'CTA Click', count: ctaClicks },
      { step: 'Intake Started', count: intakeStarts },
      { step: 'Intake Completed', count: intakeSubmissionsInWindow },
    ];

    // cta_click metadata is unstructured JSON ({ label, destination, location }),
    // so the "top CTA" is computed in JS rather than via a DB groupBy on a JSON path.
    const ctaCounts = new Map<string, number>();
    for (const row of ctaClickRows) {
      const label = (row.metadata as Record<string, unknown> | null)?.label;
      const key = typeof label === 'string' && label ? label : 'Unknown';
      ctaCounts.set(key, (ctaCounts.get(key) ?? 0) + 1);
    }
    const topCta = [...ctaCounts.entries()].sort((a, b) => b[1] - a[1])[0];

    const topSourceEntry = topSourceRows
      .map((row) => ({ source: row.source || 'Direct', count: row._count._all }))
      .sort((a, b) => b.count - a.count)[0];

    const recentEvents = recentEventsRaw.map((row) => ({
      eventName: row.eventName,
      path: row.path,
      createdAt: row.createdAt.toISOString(),
    }));

    return NextResponse.json({
      kpis: {
        totalVisitors,
        pageViews,
        intakeStarts,
        intakeSubmissions: intakeSubmissionsInWindow,
        contactSubmissions: contactSubmissionsInWindow,
        newSubmissionsThisWeek,
        conversionRate,
        revenue: null,
        pendingPayments: null,
        reportsPending: null,
        reportsDelivered: null,
      },
      topCta: topCta ? { label: topCta[0], count: topCta[1] } : null,
      topSource: topSourceEntry ?? null,
      visitorChart,
      funnel,
      recentSubmissions: recentSubmissionsRaw.map(toListItem),
      recentEvents,
      generatedAt: now.toISOString(),
    });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Failed to load dashboard overview:', error);
    } else {
      console.error('Failed to load dashboard overview:', error instanceof Error ? error.message : 'Unknown error');
    }
    return NextResponse.json({ error: 'Could not load dashboard overview.' }, { status: 500 });
  }
}
