// Client-side analytics tracking. Every call is fire-and-forget and never
// throws — tracking must never be able to break the site.

import { trackedEventNames } from '@/lib/validators/analytics';

type TrackedEventName = (typeof trackedEventNames)[number];

const VISITOR_KEY = 'ch_visitor_id';
const SESSION_KEY = 'ch_session_id';

function getOrCreateId(storage: Storage, key: string): string | null {
  try {
    const existing = storage.getItem(key);
    if (existing) return existing;

    const id = typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

    storage.setItem(key, id);
    return id;
  } catch {
    // Storage may be unavailable (private mode, blocked cookies, etc.) — tracking
    // should degrade silently rather than break the page.
    return null;
  }
}

// Exported so other client-side reporters (e.g. WebVitalsReporter) can tag
// their events with the same visitor/session identity without duplicating
// this logic.
export function getVisitorId(): string | null {
  if (typeof window === 'undefined') return null;
  return getOrCreateId(window.localStorage, VISITOR_KEY);
}

export function getSessionId(): string | null {
  if (typeof window === 'undefined') return null;
  // sessionStorage is naturally scoped to the browser tab's lifetime, which is
  // exactly the "session" boundary we want, with no manual expiry logic needed.
  return getOrCreateId(window.sessionStorage, SESSION_KEY);
}

function detectDevice(ua: string): string {
  if (/tablet|ipad/i.test(ua)) return 'tablet';
  if (/mobile|android|iphone/i.test(ua)) return 'mobile';
  return 'desktop';
}

function detectBrowser(ua: string): string {
  if (/edg\//i.test(ua)) return 'Edge';
  if (/chrome\//i.test(ua)) return 'Chrome';
  if (/firefox\//i.test(ua)) return 'Firefox';
  if (/safari\//i.test(ua)) return 'Safari';
  return 'Other';
}

function detectOS(ua: string): string {
  if (/windows/i.test(ua)) return 'Windows';
  if (/mac os|macintosh/i.test(ua)) return 'macOS';
  if (/android/i.test(ua)) return 'Android';
  if (/iphone|ipad|ios/i.test(ua)) return 'iOS';
  if (/linux/i.test(ua)) return 'Linux';
  return 'Other';
}

export function trackEvent(eventName: TrackedEventName, metadata?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;

  try {
    const ua = window.navigator.userAgent;

    const payload = {
      eventName,
      path: window.location.pathname,
      pageTitle: document.title,
      referrer: document.referrer || undefined,
      device: detectDevice(ua),
      browser: detectBrowser(ua),
      os: detectOS(ua),
      visitorId: getVisitorId() ?? undefined,
      sessionId: getSessionId() ?? undefined,
      ...(metadata && { metadata }),
    };

    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // Never let a tracking failure surface to the user.
  }
}
