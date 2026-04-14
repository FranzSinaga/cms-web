import { z } from 'zod';

export const loginSchema = z.object({
	email: z.email(),
	password: z.string().min(6, 'Minimum password length is 8 characters')
});

export type LoginSchema = typeof loginSchema;
