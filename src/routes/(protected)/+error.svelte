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

<!-- eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZyYW56QG1haWwuY29tIiwiZXhwIjoxNzc2ODgzMjMzLCJpYXQiOjE3NzY3OTY4MzMsImlzcyI6ImNtcy1hcGkiLCJuYW1lIjoiRnJhbnogU2luYWdhIiwicm9sZSI6InVzZXIiLCJ1c2VyX2lkIjoiMGQ0NmM3OGItYjQ2MC00ZTk2LTk0YjQtNjQxNzg0MjU0YjE1In0.gW0eRzgqTMhKxAj-Grfx3IbKU92vobR9H5VrVKfjEdY -->
