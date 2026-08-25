'use client';

import { useReportWebVitals } from 'next/web-vitals';
import { getSessionId, getVisitorId } from '@/lib/analytics/track';
import { webVitalNames } from '@/lib/validators/webVitals';

type TrackedName = (typeof webVitalNames)[number];

const TRACKED_NAMES = new Set<string>(webVitalNames);

// Mounted once in AppShell. Next.js's built-in useReportWebVitals hook (from
// `next/web-vitals`, no extra package required) already computes CLS/LCP/INP/
// FCP/TTFB plus a good/needs-improvement/poor rating — we just forward the 5
// metrics this project tracks to our own endpoint instead of a 3rd-party tool.
export function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    if (!TRACKED_NAMES.has(metric.name)) return;

    try {
      const payload = {
        name: metric.name as TrackedName,
        value: metric.value,
        rating: metric.rating,
        path: window.location.pathname,
        sessionId: getSessionId() ?? undefined,
        visitorId: getVisitorId() ?? undefined,
      };

      fetch('/api/analytics/vitals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => {});
    } catch {
      // Never let a reporting failure surface to the user.
    }
  });

  return null;
}
