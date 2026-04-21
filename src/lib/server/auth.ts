import { dev } from '$app/environment';
import { AUTH_COOKIE_NAME, COOKIE_MAX_AGE } from '$lib/constants';
import type { Cookies } from '@sveltejs/kit';

/**
 * Set auth_token cookie
 */
export function setAuthCookie(cookies: Cookies, token: string): void {
	cookies.set(AUTH_COOKIE_NAME, token, {
		path: '/',
		httpOnly: true,
		secure: !dev,
		sameSite: 'lax',
		maxAge: COOKIE_MAX_AGE
	});
}
