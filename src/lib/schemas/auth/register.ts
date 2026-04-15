import { z } from 'zod';

export const registerSchema = z.object({
	name: z.string().min(1, 'Name wajib diisi'),
	email: z.email().min(1, 'Email wajib diisi'),
	password: z
		.string()
		.min(1, 'Password wajib diisi')
		.min(6, 'Minimum password length is 6 characters')
});

// export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchemaType = typeof registerSchema;
