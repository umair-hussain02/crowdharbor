import { z } from 'zod';

export const trackedEventNames = [
  'page_view',
  'cta_click',
  'intake_start',
  'intake_submit',
  'contact_submit',
  'newsletter_signup',
  'blog_view',
  'pricing_view',
  'sample_report_view',
] as const;

const MAX_METADATA_CHARS = 5000;

// metadata is intentionally flexible (per-event extra context) but size-capped
// to prevent abuse from a public, unauthenticated endpoint.
const metadataSchema = z.unknown().refine((value) => {
  if (value === undefined || value === null) return true;
  try {
    return JSON.stringify(value).length <= MAX_METADATA_CHARS;
  } catch {
    return false;
  }
}, { message: 'metadata is too large or not valid JSON.' });

export const trackEventSchema = z.object({
  eventName: z.enum(trackedEventNames),
  eventType: z.string().trim().max(50).optional(),

  path: z.string().trim().max(500).optional(),
  pageTitle: z.string().trim().max(200).optional(),
  referrer: z.string().trim().max(500).optional(),

  source: z.string().trim().max(100).optional(),
  medium: z.string().trim().max(100).optional(),
  campaign: z.string().trim().max(100).optional(),

  device: z.string().trim().max(50).optional(),
  browser: z.string().trim().max(50).optional(),
  os: z.string().trim().max(50).optional(),

  sessionId: z.string().trim().min(1).max(100).optional(),
  visitorId: z.string().trim().min(1).max(100).optional(),

  metadata: metadataSchema.optional(),
});

export type TrackEventInput = z.infer<typeof trackEventSchema>;
