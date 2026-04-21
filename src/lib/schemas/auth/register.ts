import { z } from 'zod';

export const registerSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	email: z.string().email('Please enter a valid email address'),
	password: z
		.string()
		.min(1, 'Password is required')
		.min(6, 'Password must be at least 6 characters')
});

// export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchemaType = typeof registerSchema;
