<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from 'svelte-french-toast';
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import { dev } from '$app/environment';

	let { children, data } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<QueryClientProvider client={data.queryClient}>
	{#if dev}
		{#await import('@tanstack/svelte-query-devtools') then { SvelteQueryDevtools }}
			<SvelteQueryDevtools />
		{/await}
	{/if}
	<ModeWatcher defaultMode="dark" modeStorageKey="theme" />
	<Toaster
		position="bottom-left"
		toastOptions={{
			style:
				'background: var(--card); color: var(--card-foreground); border: 1px solid var(--border);'
		}}
	/>
	{@render children?.()}
</QueryClientProvider>
