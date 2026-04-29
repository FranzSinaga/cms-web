<script>
	import { Button } from '$lib/components/ui/button';
	import { resolve } from '$app/paths';
	import { goto } from '$app/navigation';
</script>

<Button variant="default" class="w-max" onclick={() => goto(resolve('/(protected)/posts/create'))}>
	Create New Post
</Button>
