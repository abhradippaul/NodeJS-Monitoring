import { z } from 'zod';

export const itemSchema = z.object({
  name: z.string().min(1, 'Name is required').trim(),
  quantity: z.number().int().nonnegative('Quantity must be a non-negative integer'),
  price: z.number().positive('Price must be a positive number')
});

export type ItemInput = z.infer<typeof itemSchema>;
