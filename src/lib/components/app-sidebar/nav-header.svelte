<script lang="ts">
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { Button } from '../ui/button';
	import Logout2 from '@tabler/icons-svelte/icons/logout-2';
	import SelectTheme from './select-theme.svelte';
</script>

<header class="flex h-16 shrink-0 items-center gap-2 border-b px-4">
	<Sidebar.Trigger />
	<Separator orientation="vertical" class="me-2 h-4" />

	<div class="ms-auto flex items-center gap-2">
		<SelectTheme />
		<form method="POST" action="/?/logout">
			<Button type="submit">
				<Logout2 /> Logout
			</Button>
		</form>
	</div>
</header>
