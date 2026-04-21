<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';

	import { untrack } from 'svelte';
	import { resolve } from '$app/paths';

	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import * as Form from '$lib/components/ui/form';

	import { loginSchema } from '$lib/schemas/auth/login';
	import type { PageData } from './$types';
	import { Input } from '$lib/components/ui/input';
	import Eye from '@tabler/icons-svelte/icons/eye';
	import EyeClosed from '@tabler/icons-svelte/icons/eye-closed';
	import toast from 'svelte-french-toast';
	import { goto } from '$app/navigation';

	let { data }: { data: PageData } = $props();

	let showPassword = $state(false);

	const form = untrack(() =>
		superForm(data.form, {
			validators: zod4Client(loginSchema),
			resetForm: true,
			onUpdate: ({ form: f }) => {
				if (f.valid) {
					toast.success(f.message || 'Success');
					setTimeout(() => {
						goto(resolve('/'));
					}, 1500);
				} else {
					if (f.errors)
						toast.error(
							f.message || 'Something went wrong. Please check your input and try again.'
						);
				}
			}
		})
	);
	const { form: formData, enhance, delayed } = form;
</script>

<div class="relative flex h-dvh w-dvw items-center justify-center bg-background text-foreground">
	<div class="min-w-xl space-y-2 p-5">
		<div class="text-center">
			<h1 class="text-2xl font-bold">Login to your account</h1>
			<p class="text-muted-foreground">
				Welcome back <span class="wave">👋</span>, Please enter your details
			</p>
		</div>
		<form method="POST" action="?/login" use:enhance>
			<Card.Root>
				<Card.Content class="space-y-4">
					<Form.Field {form} name="email">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Email</Form.Label>
								<Input
									{...props}
									type="email"
									placeholder="your@email.com"
									bind:value={$formData.email}
									autocomplete="email"
								/>
							{/snippet}
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>

					<Form.Field {form} name="password">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Password</Form.Label>
								<div class="relative flex items-center">
									<Input
										{...props}
										type={showPassword ? 'text' : 'password'}
										placeholder="********"
										bind:value={$formData.password}
										autocomplete="current-password"
									/>
									<Button
										type="button"
										variant="link"
										size="icon"
										class="absolute right-1 cursor-pointer text-muted-foreground hover:bg-transparent"
										onclick={() => (showPassword = !showPassword)}
										aria-label={showPassword ? 'Hide password' : 'Show password'}
									>
										{#if showPassword}
											<Eye size={20} aria-hidden="true" />
										{:else}
											<EyeClosed size={20} aria-hidden="true" />
										{/if}
									</Button>
								</div>
							{/snippet}
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
				</Card.Content>
				<Card.Footer class="flex flex-col space-y-2">
					<Button type="submit" class="w-full" disabled={$delayed}>
						{#if $delayed}
							Processing...
						{:else}
							Login
						{/if}
					</Button>
					<p class="text-sm text-muted-foreground">
						Don't have an account?
						<a href={resolve('/register')} class="text-primary underline-offset-4 hover:underline">
							Create an account
						</a>
					</p>
				</Card.Footer>
			</Card.Root>
		</form>
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
