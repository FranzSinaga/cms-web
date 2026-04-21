import { api } from '$lib/api/api';
import { AUTH_COOKIE_NAME } from '$lib/constants';

export const load = async ({ cookies }) => {
	const authToken = cookies.get(AUTH_COOKIE_NAME);

	await new Promise((resolve) => setTimeout(resolve, 1000));
	const checkLogin = await api.get<string>('/protected-test', {
		headers: {
			Cookie: `${AUTH_COOKIE_NAME}=${authToken}`
		}
	});
	return { checkLogin };
};
