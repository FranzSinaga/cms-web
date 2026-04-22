<script lang="ts">
	import * as Select from '$lib/components/ui/select';
	import { THEME_LIST } from '$lib/constants';
	import { setMode, userPrefersMode } from 'mode-watcher';

	type themeType = (typeof THEME_LIST)[0]['value'];
	const themeList = THEME_LIST;

	const selectedTheme = $derived(
		THEME_LIST.filter((e) => e.value === userPrefersMode.current)[0].label
	);
</script>

<Select.Root type="single" onValueChange={(value) => setMode(value as themeType)}>
	<Select.Trigger class="w-full bg-background">
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
