<script lang="ts">
	import { AppSidebar, NavHeader } from '$lib/components/app-sidebar';
	import * as Sidebar from '$lib/components/ui/sidebar';

	let { children } = $props();
</script>

<Sidebar.Provider
	class="bg-sidebar"
	style="--sidebar-width: calc(var(--spacing) * 72); --header-height: calc(var(--spacing) * 12);"
>
	<AppSidebar />
	<Sidebar.Inset>
		<NavHeader />
		<main class="w-full bg-background px-4">
			<div class="flex flex-1 flex-col">
				<div class="@container/main flex flex-1 flex-col gap-4">
					<div class="flex flex-col gap-4 py-4 md:py-6">
						{@render children?.()}
					</div>
				</div>
			</div>
		</main>
	</Sidebar.Inset>
</Sidebar.Provider>
