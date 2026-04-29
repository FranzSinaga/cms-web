<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { resolve } from '$app/paths';

	import Home from '@tabler/icons-svelte/icons/home';
	import Inbox from '@tabler/icons-svelte/icons/inbox';
	import { page } from '$app/state';
	import type { ComponentProps } from 'svelte';
	import Spaces from '@tabler/icons-svelte/icons/spaces';
	import Help from '@tabler/icons-svelte/icons/help';
	import Settings from '@tabler/icons-svelte/icons/settings';

	const currentpage = $derived(page.url.pathname);

	// Menu items.
	const items = [
		{
			title: 'Home',
			url: '/',
			icon: Home
		},
		{
			title: 'Posts',
			url: '/posts',
			icon: Inbox
		}
	] as const;

	const secondaryItems = [
		{
			title: 'Settings',
			url: '/',
			icon: Settings
		},
		{
			title: 'Get Help',
			url: '/',
			icon: Help
		}
	] as const;
	let { ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();
</script>

<Sidebar.Root class="py-2.5" collapsible="icon" {...restProps}>
	<Sidebar.Header>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton class="data-[slot=sidebar-menu-button]:!p-1.5">
					{#snippet child({ props })}
						<a href={resolve('/')} {...props}>
							<Spaces class="!size-5" />
							<span class="text-base font-semibold">Zepew Cms.</span>
						</a>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Header>

	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.GroupLabel>Overview</Sidebar.GroupLabel>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					{#each items as item (item.title)}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton isActive={currentpage === item.url}>
								{#snippet child({ props })}
									<a href={resolve(item.url)} {...props}>
										<item.icon />
										<span>{item.title}</span>
									</a>
								{/snippet}
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					{/each}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>

		<Sidebar.Group class="mt-auto">
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					{#each secondaryItems as item (item.title)}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton>
								{#snippet child({ props })}
									<a href={resolve(item.url)} {...props}>
										<item.icon />
										<span>{item.title}</span>
									</a>
								{/snippet}
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					{/each}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Content>
</Sidebar.Root>
