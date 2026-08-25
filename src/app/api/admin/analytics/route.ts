import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import type { Prisma } from '@/generated/prisma/client';
import { requireAdmin } from '@/lib/admin/session';

// Both AnalyticsEvent and VisitorSession already exist in the schema, so this
// route always computes real data from them — there's no "model missing"
// fallback branch needed here. If a query genuinely fails (e.g. a transient
// DB error), the catch block below returns a 500 rather than fabricating data.

const RANGE_DAYS: Record<string, number | null> = {
  '7d': 7,
  '30d': 30,
  '90d': 90,
  all: null,
};

function resolveDateRange(searchParams: URLSearchParams): { from: Date | null; to: Date } {
  const fromParam = searchParams.get('from');
  const toParam = searchParams.get('to');

  const to = toParam && !Number.isNaN(Date.parse(toParam)) ? new Date(toParam) : new Date();

  if (fromParam && !Number.isNaN(Date.parse(fromParam))) {
    return { from: new Date(fromParam), to };
  }

  const rangeKey = searchParams.get('range') ?? '30d';
  const days = rangeKey in RANGE_DAYS ? RANGE_DAYS[rangeKey] : 30;

  if (days === null) {
    return { from: null, to }; // 'all'
  }

  const from = new Date(to.getTime() - (days - 1) * 24 * 60 * 60 * 1000);
  from.setUTCHours(0, 0, 0, 0);
  return { from, to };
}

function formatDay(date: Date) {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export async function GET(request: Request) {
  const admin = await requireAdmin();
  if (admin instanceof NextResponse) return admin;

  const { searchParams } = new URL(request.url);
  const { from, to } = resolveDateRange(searchParams);

  const eventWhere: Prisma.AnalyticsEventWhereInput = {
    createdAt: { ...(from && { gte: from }), lte: to },
  };
  const sessionWhere: Prisma.VisitorSessionWhereInput = {
    createdAt: { ...(from && { gte: from }), lte: to },
  };

  try {
    const [
      totalPageViews,
      ctaClicks,
      intakeStarts,
      intakeSubmissions,
      contactSubmissions,
      sessions,
      uniqueVisitorRows,
      topPagesRaw,
      topSourcesRaw,
      deviceRaw,
      eventBreakdownRaw,
      timeSeriesRows,
    ] = await Promise.all([
      prisma.analyticsEvent.count({ where: { ...eventWhere, eventName: 'page_view' } }),
      prisma.analyticsEvent.count({ where: { ...eventWhere, eventName: 'cta_click' } }),
      prisma.analyticsEvent.count({ where: { ...eventWhere, eventName: 'intake_start' } }),
      prisma.analyticsEvent.count({ where: { ...eventWhere, eventName: 'intake_submit' } }),
      prisma.analyticsEvent.count({ where: { ...eventWhere, eventName: 'contact_submit' } }),
      prisma.visitorSession.count({ where: sessionWhere }),
      prisma.visitorSession.groupBy({ by: ['visitorId'], where: sessionWhere }),
      prisma.analyticsEvent.groupBy({
        by: ['path'],
        where: { ...eventWhere, eventName: 'page_view', path: { not: null } },
        _count: { path: true },
        orderBy: { _count: { path: 'desc' } },
        take: 10,
      }),
      prisma.analyticsEvent.groupBy({
        by: ['source'],
        where: { ...eventWhere, eventName: 'page_view' },
        // _count: { _all: true } counts every row in the group, including
        // the "source is null" group itself — _count: { source: true } would
        // undercount that group to 0, since it only counts non-null values.
        // Prisma's groupBy orderBy can't sort by _count._all, so this is
        // sorted in JS below instead.
        _count: { _all: true },
      }),
      prisma.analyticsEvent.groupBy({
        by: ['device'],
        where: { ...eventWhere, eventName: 'page_view', device: { not: null } },
        _count: { device: true },
        orderBy: { _count: { device: 'desc' } },
      }),
      prisma.analyticsEvent.groupBy({
        by: ['eventName'],
        where: eventWhere,
        _count: { eventName: true },
        orderBy: { _count: { eventName: 'desc' } },
      }),
      prisma.$queryRaw<{ day: Date; page_views: bigint; sessions: bigint }[]>`
        SELECT
          date_trunc('day', "createdAt") AS day,
          count(*) FILTER (WHERE "eventName" = 'page_view') AS page_views,
          count(DISTINCT "sessionId") AS sessions
        FROM "AnalyticsEvent"
        WHERE "createdAt" >= ${from ?? new Date(0)} AND "createdAt" <= ${to}
        GROUP BY day
        ORDER BY day ASC
      `,
    ]);

    const uniqueVisitors = uniqueVisitorRows.length;
    const conversionRate = intakeStarts > 0 ? Math.round((intakeSubmissions / intakeStarts) * 1000) / 10 : 0;

    // Zero-fill every day in a bounded range so the chart has no gaps; an
    // unbounded "all" range just uses whatever days actually have data.
    const seriesByDay = new Map(
      timeSeriesRows.map((row) => [
        row.day.toISOString().slice(0, 10),
        { pageViews: Number(row.page_views), sessions: Number(row.sessions) },
      ])
    );

    let timeSeries: { date: string; pageViews: number; sessions: number }[];
    if (from) {
      timeSeries = [];
      const cursor = new Date(from);
      cursor.setUTCHours(0, 0, 0, 0);
      const endDay = new Date(to);
      endDay.setUTCHours(0, 0, 0, 0);
      while (cursor <= endDay) {
        const key = cursor.toISOString().slice(0, 10);
        const bucket = seriesByDay.get(key);
        timeSeries.push({ date: formatDay(cursor), pageViews: bucket?.pageViews ?? 0, sessions: bucket?.sessions ?? 0 });
        cursor.setUTCDate(cursor.getUTCDate() + 1);
      }
    } else {
      timeSeries = [...seriesByDay.entries()]
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([key, value]) => ({ date: formatDay(new Date(key)), ...value }));
    }

    const topPages = topPagesRaw.map((row) => ({ path: row.path ?? 'Unknown', views: row._count.path }));
    const topSources = topSourcesRaw
      .map((row) => ({ source: row.source || 'Direct', visits: row._count._all }))
      .sort((a, b) => b.visits - a.visits)
      .slice(0, 10);

    const totalDeviceCount = deviceRaw.reduce((sum, row) => sum + row._count.device, 0);
    const deviceBreakdown = deviceRaw.map((row) => ({
      device: row.device ?? 'Unknown',
      count: row._count.device,
      percentage: totalDeviceCount > 0 ? Math.round((row._count.device / totalDeviceCount) * 1000) / 10 : 0,
    }));

    const eventBreakdown = eventBreakdownRaw.map((row) => ({ eventName: row.eventName, count: row._count.eventName }));

    // Only the stages we can actually measure today — no Payment/Report
    // models exist yet, so "payment completed" / "report delivered" stay out
    // of this funnel rather than being faked.
    const funnel = [
      { step: 'Page View', count: totalPageViews },
      { step: 'Intake Started', count: intakeStarts },
      { step: 'Intake Submitted', count: intakeSubmissions },
    ];

    return NextResponse.json({
      summary: {
        totalPageViews,
        uniqueVisitors,
        sessions,
        ctaClicks,
        intakeStarts,
        intakeSubmissions,
        contactSubmissions,
        conversionRate,
      },
      timeSeries,
      topPages,
      topSources,
      deviceBreakdown,
      eventBreakdown,
      funnel,
    });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Failed to load analytics:', error);
    } else {
      console.error('Failed to load analytics:', error instanceof Error ? error.message : 'Unknown error');
    }
    return NextResponse.json({ error: 'Could not load analytics.' }, { status: 500 });
  }
}
