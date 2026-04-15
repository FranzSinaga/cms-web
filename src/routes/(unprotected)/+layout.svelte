<script lang="ts">
	let { children } = $props();

	// let isLogin = $derived(page.url.pathname === '/login');

	// const handleRedirect = () => {
	// 	if (isLogin) return goto(resolve('/register'));
	// 	return goto(resolve('/login'));
	// };
</script>

<div class="absolute z-50 w-full">
	<div class="flex justify-between px-10 py-5">
		<h1 class="text-XL font-bold">CMS</h1>
		<div>
			<!-- <Button size="lg" variant="default" class="cursor-pointer" onclick={handleRedirect}>
				{#if isLogin}
					Register
				{:else}
					Login
				{/if}
			</Button> -->
		</div>
	</div>
</div>

{@render children?.()}
