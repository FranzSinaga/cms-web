import { fail } from '@sveltejs/kit';
import { message, setError, setMessage, superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';

import { api, ApiError } from '$lib/api/api';
import { registerSchema } from '$lib/schemas/auth/register';
import { setAuthCookie } from '$lib/server/auth';
import type { Actions, PageServerLoad } from './$types';

// LOAD — inisialisasi form kosong
export const load: PageServerLoad = async () => {
	const form = await superValidate(zod4(registerSchema));
	return { form };
};

export const actions = {
	register: async ({ request, cookies }) => {
		const form = await superValidate(request, zod4(registerSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const { name, email, password } = form.data;
		type formDataType = keyof typeof form.data;

		try {
			const { message: msg, data } = await api.post<{ token: string }>('/auth/register', {
				email,
				password,
				name
			});

			if (!data) throw new ApiError('Token is missing');
			setAuthCookie(cookies, data.token);

			return setMessage(form, msg);
		} catch (error) {
			if (error instanceof ApiError) {
				if (error.fields) {
					for (const [field, message] of Object.entries(error.fields)) {
						setError(form, field as formDataType, message);
					}
				}

				return message(form, error.message, { status: 400 });
			}
			return message(form, 'An unexpected error occurred', { status: 500 });
		}
	}
} satisfies Actions;
