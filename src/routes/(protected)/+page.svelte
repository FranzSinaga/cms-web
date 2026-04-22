<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<p>This is homepage</p>
<pre class="bg-muted p-2 text-muted-foreground text-wrap">{JSON.stringify(data, null, 2)}</pre>
