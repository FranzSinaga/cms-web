import { z } from 'zod';

export const loginSchema = z.object({
	email: z.email().min(1, 'Email wajib diisi'),
	password: z
		.string()
		.min(1, 'Password wajib diisi')
		.min(6, 'Minimum password length is 8 characters')
});

// export type LoginSchema = z.infer<typeof loginSchema>;
export type LoginSchemaType = typeof loginSchema;
