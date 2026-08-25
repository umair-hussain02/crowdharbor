import { z } from 'zod';

const MAX_CONTENT_JSON_CHARS = 50000;

// contentJson holds flexible per-page content blocks (e.g. FAQ items for the
// home/pricing pages). Kept loosely typed but size-capped to avoid abuse.
const contentJsonSchema = z.unknown().refine((value) => {
  if (value === undefined || value === null) return true;
  try {
    return JSON.stringify(value).length <= MAX_CONTENT_JSON_CHARS;
  } catch {
    return false;
  }
}, { message: 'Content is too large or not valid JSON.' });

export const updatePageSchema = z.object({
  title: z.string().trim().min(1, 'Title is required.').max(200).optional(),
  status: z.enum(['live', 'draft', 'archived']).optional(),
  seoTitle: z.string().trim().max(200).optional(),
  metaDescription: z.string().trim().max(400).optional(),
  contentJson: contentJsonSchema.optional(),
});

export type UpdatePageInput = z.infer<typeof updatePageSchema>;
