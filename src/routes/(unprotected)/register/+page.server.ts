import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';

import { registerSchema } from '$lib/schemas/auth/register';
import type { Actions } from './$types';

// LOAD — inisialisasi form kosong
export const load = async () => {
	const form = await superValidate(zod4(registerSchema));
	return { form };
};

export const actions: Actions = {
	default: async ({ request }) => {
		// Parse + validasi data dari request
		const form = await superValidate(request, zod4(registerSchema));

		// Jika gagal validasi, kembalikan error ke client
		if (!form.valid) {
			return fail(400, { form });
		}

		// ✅ Data valid — proses login di sini
		const { name, email, password } = form.data;
		console.log('Login attempt:', name, email, password);

		// Contoh: cek ke database, set session, dll
		// const user = await db.user.findUnique({ where: { email } });
		// if (!user || !verifyPassword(password, user.hash)) {
		//   return setError(form, 'email', 'Email atau password salah');
		// }

		redirect(302, '/dashboard');
	}
};
