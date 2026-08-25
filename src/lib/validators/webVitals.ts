import { z } from 'zod';

export const webVitalNames = ['CLS', 'LCP', 'INP', 'FCP', 'TTFB'] as const;
export const webVitalRatings = ['good', 'needs-improvement', 'poor'] as const;

export const trackWebVitalSchema = z.object({
  name: z.enum(webVitalNames),
  value: z.number().nonnegative(),
  rating: z.enum(webVitalRatings).optional(),
  path: z.string().trim().max(500).optional(),
  sessionId: z.string().trim().min(1).max(100).optional(),
  visitorId: z.string().trim().min(1).max(100).optional(),
});

export type TrackWebVitalInput = z.infer<typeof trackWebVitalSchema>;
