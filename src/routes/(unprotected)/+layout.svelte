<script lang="ts">
	let { children } = $props();
	import * as Select from '$lib/components/ui/select';
	import { THEME_LIST } from '$lib/constants';
	import { setMode, userPrefersMode } from 'mode-watcher';

	type themeType = (typeof THEME_LIST)[0]['value'];
	const themeList = THEME_LIST;

	const selectedTheme = $derived(
		THEME_LIST.filter((e) => e.value === userPrefersMode.current)[0].label
	);
</script>

<div class="absolute z-50 w-full">
	<div class="flex justify-between px-10 py-5">
		<h1 class="text-XL font-bold">CMS</h1>
		<div>
			<Select.Root type="single" onValueChange={(value) => setMode(value as themeType)}>
				<Select.Trigger class="w-45"
					>{userPrefersMode.current ? selectedTheme : 'Select Theme'}</Select.Trigger
				>
				<Select.Content>
					{#each themeList as theme (theme.value)}
						<Select.Item value={theme.value} label={theme.label}>{theme.label}</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
		</div>
	</div>
</div>

{@render children?.()}
