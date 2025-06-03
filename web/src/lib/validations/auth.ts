import { z } from 'zod';

export const loginSchema = z.object({
	email: z.string().email('Invalid email address'),
	password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const registerSchema = z
	.object({
		email: z.string().email('Invalid email address'),
		password: z.string().min(8, 'Password must be at least 8 characters'),
		confirmPassword: z.string(),
		name: z.string().min(2, 'Name must be at least 2 characters'),
		role: z.enum(['buyer', 'farmer']),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword'],
	});

export const forgotPasswordSchema = z.object({
	email: z.string().email('Invalid email address'),
});

export const resetPasswordSchema = z
	.object({
		password: z.string().min(8, 'Password must be at least 8 characters'),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword'],
	});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
