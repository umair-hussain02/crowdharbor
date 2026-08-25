import { z } from 'zod';

export const articleStatusValues = ['draft', 'published', 'scheduled', 'needs-review', 'archived'] as const;

export const createArticleSchema = z.object({
  title: z.string().trim().min(1, 'Title is required.').max(200),
  slug: z.string().trim().max(220).optional(),
  excerpt: z.string().trim().max(500).optional(),
  content: z.string().optional(),
  status: z.enum(articleStatusValues).optional().default('draft'),
  category: z.string().trim().max(100).optional(),
  author: z.string().trim().max(100).optional(),
  seoTitle: z.string().trim().max(200).optional(),
  metaDescription: z.string().trim().max(400).optional(),
  featuredImage: z.string().trim().max(500).optional(),
  // Plain date/datetime string from the editor's date input — validated and
  // converted to a Date in the route handler rather than via z.iso here, since
  // an empty string should mean "no value" rather than a validation error.
  publishedAt: z.string().optional(),
});

export const updateArticleSchema = createArticleSchema.partial();

export type CreateArticleInput = z.infer<typeof createArticleSchema>;
export type UpdateArticleInput = z.infer<typeof updateArticleSchema>;
