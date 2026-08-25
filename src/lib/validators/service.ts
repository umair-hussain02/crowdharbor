import { z } from 'zod';

const serviceUpdateSchema = z.object({
  id: z.string().min(1),
  price: z.number().nonnegative().nullable().optional(),
  isActive: z.boolean().optional(),
});

export const updateServicesSchema = z.object({
  services: z.array(serviceUpdateSchema).min(1, 'Provide at least one service to update.'),
});

export type UpdateServicesInput = z.infer<typeof updateServicesSchema>;
