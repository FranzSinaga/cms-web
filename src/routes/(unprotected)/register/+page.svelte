<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';

	import { resolve } from '$app/paths';

	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import * as Form from '$lib/components/ui/form';

	import { registerSchema } from '$lib/schemas/auth/register';
	import type { PageData } from './$types';
	import { Input } from '$lib/components/ui/input';
	import Eye from '@tabler/icons-svelte/icons/eye';
	import EyeClosed from '@tabler/icons-svelte/icons/eye-closed';
	import { untrack } from 'svelte';
	import toast from 'svelte-french-toast';
	import { goto } from '$app/navigation';

	let { data }: { data: PageData } = $props();

	let showPassword = $state(false);

	const form = untrack(() =>
		superForm(data.form, {
			validators: zod4Client(registerSchema),
			resetForm: false,
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
	<div class="max-w-xl min-w-xl space-y-2 p-5">
		<div class="text-center">
			<h1 class="text-2xl font-bold">Create your account</h1>
		</div>
		<form method="POST" action="?/register" use:enhance>
			<Card.Root>
				<Card.Content class="space-y-4">
					<Form.Field {form} name="name">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Name</Form.Label>
								<Input
									{...props}
									type="text"
									placeholder="Your name"
									bind:value={$formData.name}
									autocomplete="name"
								/>
							{/snippet}
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>

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
							Loading...
						{:else}
							Register
						{/if}
					</Button>
					<p class="text-sm text-muted-foreground">
						Already have an account?
						<a href={resolve('/login')} class="text-primary underline-offset-4 hover:underline">
							Login now
						</a>
					</p>
				</Card.Footer>
			</Card.Root>
		</form>
	</div>
</div>
