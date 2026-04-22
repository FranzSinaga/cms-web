import { api, ApiError } from '$lib/api/api';
import { AUTH_COOKIE_NAME } from '$lib/constants';
import { clearAuthCookie } from '$lib/server/auth';
import { redirect, type Actions } from '@sveltejs/kit';

export const load = async ({ cookies }) => {
	try {
		const authToken = cookies.get(AUTH_COOKIE_NAME);

		await new Promise((resolve) => setTimeout(resolve, 1000));
		const checkLogin = await api.get<string>('/protected-test', {
			headers: {
				Cookie: `${AUTH_COOKIE_NAME}=${authToken}`
			}
		});
		return { checkLogin };
	} catch (error) {
		if (error instanceof ApiError) throw new ApiError(error.message);
	}
};

export const actions = {
	logout: async ({ cookies }) => {
		clearAuthCookie(cookies);
		return redirect(303, '/login');
	}
} satisfies Actions;
