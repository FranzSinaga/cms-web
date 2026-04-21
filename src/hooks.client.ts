import type { Handle } from '@sveltejs/kit';

// hooks.client.ts
export const handle: Handle = async ({ event, resolve }) => {
	console.log('Navigating to:', event.url.pathname);

	return resolve(event);
};
