import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { trackWebVitalSchema, type TrackWebVitalInput } from '@/lib/validators/webVitals';
import { isRateLimited } from '@/lib/analytics/rateLimit';

// Public, unauthenticated by design — this endpoint records Core Web Vitals
// from anonymous site visitors' browsers, so there is no admin-auth TODO here.

// Standard web.dev thresholds, used as a fallback if the client didn't send
// a rating (Next.js's useReportWebVitals normally does include one).
const THRESHOLDS: Record<TrackWebVitalInput['name'], { good: number; poor: number }> = {
  LCP: { good: 2500, poor: 4000 },
  INP: { good: 200, poor: 500 },
  CLS: { good: 0.1, poor: 0.25 },
  FCP: { good: 1800, poor: 3000 },
  TTFB: { good: 800, poor: 1800 },
};

function deriveRating(name: TrackWebVitalInput['name'], value: number) {
  const t = THRESHOLDS[name];
  if (value <= t.good) return 'good';
  if (value <= t.poor) return 'needs-improvement';
  return 'poor';
}

function getClientIp(request: Request): string | null {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return request.headers.get('x-real-ip');
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const result = trackWebVitalSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: result.error.issues[0]?.message ?? 'Invalid request body.' },
      { status: 400 }
    );
  }

  const data = result.data;

  // The IP is only ever used in-memory as a rate-limit key — never persisted.
  const ip = getClientIp(request);
  const rateLimitKey = ip ?? data.visitorId ?? data.sessionId ?? 'anonymous';

  if (isRateLimited(rateLimitKey)) {
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
  }

  try {
    await prisma.webVital.create({
      data: {
        name: data.name,
        value: data.value,
        rating: data.rating ?? deriveRating(data.name, data.value),
        path: data.path || null,
        sessionId: data.sessionId || null,
        visitorId: data.visitorId || null,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Failed to record web vital:', error);
    } else {
      console.error('Failed to record web vital:', error instanceof Error ? error.message : 'Unknown error');
    }
    return NextResponse.json({ error: 'Could not record metric.' }, { status: 500 });
  }
}
