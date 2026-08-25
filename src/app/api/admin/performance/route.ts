import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin/session';

const WINDOW_DAYS = 30;

// Same web.dev thresholds used to derive a rating server-side if a sample
// somehow arrived without one (kept in sync with /api/analytics/vitals).
const THRESHOLDS: Record<string, { good: number; poor: number }> = {
  LCP: { good: 2500, poor: 4000 },
  INP: { good: 200, poor: 500 },
  CLS: { good: 0.1, poor: 0.25 },
  FCP: { good: 1800, poor: 3000 },
  TTFB: { good: 800, poor: 1800 },
};

function ratingFor(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const t = THRESHOLDS[name];
  if (!t) return 'good';
  if (value <= t.good) return 'good';
  if (value <= t.poor) return 'needs-improvement';
  return 'poor';
}

function formatDay(date: Date) {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export async function GET() {
  const admin = await requireAdmin();
  if (admin instanceof NextResponse) return admin;

  const now = new Date();
  const windowStart = new Date(now.getTime() - WINDOW_DAYS * 24 * 60 * 60 * 1000);
  windowStart.setUTCHours(0, 0, 0, 0);
  const where = { createdAt: { gte: windowStart, lte: now } };

  try {
    const [averagesRaw, ratingCountsRaw, slowPageRows, trendRows] = await Promise.all([
      prisma.webVital.groupBy({
        by: ['name'],
        where,
        _avg: { value: true },
        _count: { _all: true },
      }),
      prisma.webVital.groupBy({
        by: ['rating'],
        where,
        _count: { _all: true },
      }),
      prisma.webVital.findMany({
        where: { ...where, NOT: { rating: 'good' } },
        orderBy: { createdAt: 'desc' },
        take: 200,
        select: { path: true, name: true, rating: true, createdAt: true },
      }),
      prisma.$queryRaw<{ day: Date; avg_lcp: number | null }[]>`
        SELECT date_trunc('day', "createdAt") AS day, avg(value) AS avg_lcp
        FROM "WebVital"
        WHERE name = 'LCP' AND "createdAt" >= ${windowStart} AND "createdAt" <= ${now}
        GROUP BY day
        ORDER BY day ASC
      `,
    ]);

    const averages: Record<string, { value: number; rating: 'good' | 'needs-improvement' | 'poor'; samples: number }> = {};
    for (const row of averagesRaw) {
      const value = Math.round((row._avg.value ?? 0) * 100) / 100;
      averages[row.name] = { value, rating: ratingFor(row.name, value), samples: row._count._all };
    }

    // rating is nullable in the schema, though every insert always sets one
    // today (server-derived if the client didn't send it) — the 'unknown'
    // bucket only exists as a defensive fallback.
    const ratingCounts = { good: 0, 'needs-improvement': 0, poor: 0, unknown: 0 } as Record<string, number>;
    for (const row of ratingCountsRaw) {
      const key = row.rating ?? 'unknown';
      ratingCounts[key] = (ratingCounts[key] ?? 0) + row._count._all;
    }

    // Aggregate the raw non-good rows into "page -> how many issues, worst
    // rating, most recent occurrence" — a real, derived "recent slow pages" view.
    const byPath = new Map<string, { issues: number; worstRating: 'needs-improvement' | 'poor'; lastSeen: Date; metrics: Set<string> }>();
    for (const row of slowPageRows) {
      const path = row.path ?? 'Unknown';
      const existing = byPath.get(path);
      const rating = (row.rating ?? 'needs-improvement') as 'needs-improvement' | 'poor';
      if (!existing) {
        byPath.set(path, { issues: 1, worstRating: rating, lastSeen: row.createdAt, metrics: new Set([row.name]) });
      } else {
        existing.issues += 1;
        existing.metrics.add(row.name);
        if (rating === 'poor') existing.worstRating = 'poor';
        if (row.createdAt > existing.lastSeen) existing.lastSeen = row.createdAt;
      }
    }
    const recentSlowPages = [...byPath.entries()]
      .map(([path, v]) => ({
        path,
        issues: v.issues,
        worstRating: v.worstRating,
        metrics: [...v.metrics],
        lastSeen: formatDay(v.lastSeen),
      }))
      .sort((a, b) => b.issues - a.issues)
      .slice(0, 10);

    const trend = trendRows.map((row) => ({
      date: formatDay(row.day),
      lcp: Math.round((Number(row.avg_lcp) || 0) * 100) / 100,
    }));

    return NextResponse.json({
      averages,
      ratingCounts,
      recentSlowPages,
      trend,
      totalSamples: averagesRaw.reduce((sum, row) => sum + row._count._all, 0),
    });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Failed to load performance metrics:', error);
    } else {
      console.error('Failed to load performance metrics:', error instanceof Error ? error.message : 'Unknown error');
    }
    return NextResponse.json({ error: 'Could not load performance metrics.' }, { status: 500 });
  }
}
