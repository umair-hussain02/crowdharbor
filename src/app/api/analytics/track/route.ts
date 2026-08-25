import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@/generated/prisma/client';
import { trackEventSchema } from '@/lib/validators/analytics';
import { isRateLimited } from '@/lib/analytics/rateLimit';

// Public, unauthenticated by design — this endpoint records analytics events
// from anonymous site visitors, so there is no admin-auth TODO here.

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

  const result = trackEventSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: result.error.issues[0]?.message ?? 'Invalid request body.' },
      { status: 400 }
    );
  }

  const data = result.data;

  // The IP is only ever used in-memory as a rate-limit key for this request —
  // it is never persisted to the database or included in any stored record.
  const ip = getClientIp(request);
  const rateLimitKey = ip ?? data.visitorId ?? data.sessionId ?? 'anonymous';

  if (isRateLimited(rateLimitKey)) {
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
  }

  const metadataValue =
    data.metadata === undefined ? undefined : data.metadata === null ? Prisma.JsonNull : (data.metadata as Prisma.InputJsonValue);

  try {
    await prisma.analyticsEvent.create({
      data: {
        eventName: data.eventName,
        eventType: data.eventType || null,
        path: data.path || null,
        pageTitle: data.pageTitle || null,
        referrer: data.referrer || null,
        source: data.source || null,
        medium: data.medium || null,
        campaign: data.campaign || null,
        device: data.device || null,
        browser: data.browser || null,
        os: data.os || null,
        sessionId: data.sessionId || null,
        visitorId: data.visitorId || null,
        metadata: metadataValue,
      },
    });

    // VisitorSession requires a visitorId, so only upsert when both ids are
    // present — without a visitorId there's nothing valid to create.
    if (data.sessionId && data.visitorId) {
      await prisma.visitorSession.upsert({
        where: { sessionId: data.sessionId },
        create: {
          sessionId: data.sessionId,
          visitorId: data.visitorId,
          firstPath: data.path || null,
          lastPath: data.path || null,
          referrer: data.referrer || null,
          source: data.source || null,
          device: data.device || null,
          browser: data.browser || null,
          os: data.os || null,
        },
        update: {
          ...(data.path && { lastPath: data.path }),
          endedAt: new Date(),
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Failed to record analytics event:', error);
    } else {
      console.error('Failed to record analytics event:', error instanceof Error ? error.message : 'Unknown error');
    }
    return NextResponse.json({ error: 'Could not record event.' }, { status: 500 });
  }
}
