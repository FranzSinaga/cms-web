<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from 'svelte-french-toast';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<ModeWatcher defaultMode="dark" modeStorageKey="theme" />
<Toaster
	position="bottom-left"
	toastOptions={{
		style:
			'background: var(--card); color: var(--card-foreground); border: 1px solid var(--border);'
	}}
/>
{@render children?.()}
