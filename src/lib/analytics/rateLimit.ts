// Lightweight in-memory rate limiter — intentionally simple, no new packages.
// Per-process only (resets on deploy/restart, not shared across serverless
// instances), which is an accepted tradeoff for "basic spam protection" on a
// public analytics endpoint rather than a hard guarantee.

const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 60;
const MAX_TRACKED_KEYS = 50_000;

const hits = new Map<string, { count: number; windowStart: number }>();

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || now - entry.windowStart >= WINDOW_MS) {
    if (hits.size >= MAX_TRACKED_KEYS) hits.clear();
    hits.set(key, { count: 1, windowStart: now });
    return false;
  }

  entry.count += 1;
  return entry.count > MAX_REQUESTS_PER_WINDOW;
}
