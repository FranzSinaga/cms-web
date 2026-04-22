<script lang="ts">
	import * as Select from '$lib/components/ui/select/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { THEME_LIST } from '$lib/constants';
	import { setMode, userPrefersMode } from 'mode-watcher';
	import { buttonVariants } from '../ui/button';
	import Logout2 from '@tabler/icons-svelte/icons/logout-2';
	import * as Tooltip from '../ui/tooltip';

	type themeType = (typeof THEME_LIST)[0]['value'];
	const themeList = THEME_LIST;

	const selectedTheme = $derived(
		THEME_LIST.filter((e) => e.value === userPrefersMode.current)[0].label
	);
</script>

<header
	class="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)"
>
	<div class="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
		<Sidebar.Trigger class="-ms-1" />
		<Separator orientation="vertical" class="mx-2 data-[orientation=vertical]:h-4" />
		<!-- <h1 class="text-base font-medium">Documents</h1> -->
		<div class="ms-auto flex items-center gap-2">
			<Select.Root type="single" onValueChange={(value) => setMode(value as themeType)}>
				<Select.Trigger class="w-45 bg-background">
					{userPrefersMode.current ? selectedTheme : 'Select Theme'}
				</Select.Trigger>
				<Select.Content>
					<Select.Group>
						<Select.Label>Select mode</Select.Label>
						{#each themeList as theme (theme.value)}
							<Select.Item value={theme.value} label={theme.label}>{theme.label}</Select.Item>
						{/each}
					</Select.Group>
				</Select.Content>
			</Select.Root>

			<Separator orientation="vertical" class="mx-2 data-[orientation=vertical]:h-4" />
			<form method="POST" action="/?/logout">
				<Tooltip.Provider>
					<Tooltip.Root>
						<Tooltip.Trigger
							type="submit"
							class={buttonVariants({ variant: 'ghost', size: 'icon' })}
						>
							<Logout2 />
						</Tooltip.Trigger>
						<Tooltip.Content>
							<p>Logout</p>
						</Tooltip.Content>
						<!-- <Button size="icon" variant="ghost" type="submit"></Button> -->
					</Tooltip.Root>
				</Tooltip.Provider>
			</form>
		</div>
	</div>
</header>
