import { browser } from '$app/environment';
import { QueryClient } from '@tanstack/svelte-query';
import type { LayoutLoad } from './$types';

export const ssr = false;
export const csr = true;
export const prerender = false;

export const load: LayoutLoad = () => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 1000 * 60 * 5,
				enabled: browser,
				refetchOnWindowFocus: false,
				retry: false
			}
		}
	});

	return { queryClient };
};
