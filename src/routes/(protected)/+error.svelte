<script lang="ts">
	import { page } from '$app/state';
</script>

<div class="grid size-full h-[calc(80dvh)] place-items-center">
	<div class="w-full max-w-lg space-y-6 text-center">
		<div class="space-y-2">
			<h1 class="text-3xl font-bold">{page.status}</h1>
			<p class="text-muted-foreground">
				{page.error?.message}
			</p>
			<p class="rounded bg-muted p-1 text-xs text-muted-foreground">
				{page.error?.errorId}
			</p>
		</div>
	</div>
</div>
