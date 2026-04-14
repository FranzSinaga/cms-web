<script>
	import { enhance } from '$app/forms';
</script>

<div class="relative flex h-dvh w-dvw items-center justify-center bg-background text-foreground">
	<div class="min-w-2xl rounded p-5">
		<div class="text-center">
			<h1 class="text-2xl font-bold">Login to your account</h1>
			<p class="text-muted-foreground">
				Welcome back <span class="wave">👋</span>, Please enter your details
			</p>

			<form method="POST" use:enhance></form>
		</div>
	</div>
</div>

<style>
	@keyframes wave {
		0% {
			transform: rotate(0deg);
		}
		15% {
			transform: rotate(14deg);
		}
		30% {
			transform: rotate(-8deg);
		}
		40% {
			transform: rotate(14deg);
		}
		50% {
			transform: rotate(-4deg);
		}
		60% {
			transform: rotate(10deg);
		}
		70% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(0deg);
		}
	}

	.wave {
		display: inline-block;
		transform-origin: 70% 70%; /* posisi “pergelangan tangan” */
		animation: wave 2s infinite;
	}
</style>
