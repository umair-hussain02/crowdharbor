import { z } from 'zod';

export const adminLoginSchema = z.object({
  email: z.string().trim().email().max(200),
  password: z.string().min(1).max(200),
});

export const adminVerifyOtpSchema = z.object({
  email: z.string().trim().email().max(200),
  code: z.string().regex(/^\d{6}$/, 'Enter the 6-digit code.'),
});

export const adminResendOtpSchema = z.object({
  email: z.string().trim().email().max(200),
});

export const adminForgotPasswordSchema = z.object({
  email: z.string().trim().email().max(200),
});

export const adminResetPasswordSchema = z.object({
  token: z.string().trim().min(1).max(500),
  password: z.string().min(8).max(200),
});
