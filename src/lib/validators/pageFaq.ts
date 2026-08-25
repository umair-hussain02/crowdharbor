import { z } from 'zod';

export const createPageFaqSchema = z.object({
  question: z.string().trim().min(1, 'Question is required.').max(300),
  answer: z.string().trim().min(1, 'Answer is required.').max(2000),
  sortOrder: z.number().int().optional(),
  isActive: z.boolean().optional().default(true),
});

export const updatePageFaqSchema = z.object({
  question: z.string().trim().min(1, 'Question is required.').max(300).optional(),
  answer: z.string().trim().min(1, 'Answer is required.').max(2000).optional(),
  sortOrder: z.number().int().optional(),
  isActive: z.boolean().optional(),
});

export type CreatePageFaqInput = z.infer<typeof createPageFaqSchema>;
export type UpdatePageFaqInput = z.infer<typeof updatePageFaqSchema>;
