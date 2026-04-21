<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<p>This is homepage</p>
<p>{JSON.stringify(data, undefined, 2)}</p>
