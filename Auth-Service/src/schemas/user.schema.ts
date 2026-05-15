import { z } from 'zod';

export const registerSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters').max(20).trim(),
  email: z.email('Invalid email address').trim(),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

export const loginSchema = z.object({
  email: z.email('Invalid email address').trim(),
  password: z.string()
});

export const updateUserSchema = z.object({
  username: z.string().min(3).max(20).trim().optional(),
  email: z.email().trim().optional(),
  password: z.string().min(6).optional()
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
