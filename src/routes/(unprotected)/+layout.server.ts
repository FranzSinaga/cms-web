import { AUTH_COOKIE_NAME } from '$lib/constants';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
	if (cookies.get(AUTH_COOKIE_NAME)) redirect(303, '/');
};
