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

	let { data }: { data: PageData } = $props();

	const form = superForm(data.form, {
		validators: zod4Client(registerSchema),
		resetForm: true
	});

	const { form: formData, enhance, delayed } = form;
</script>

<div class="relative flex h-dvh w-dvw items-center justify-center bg-background text-foreground">
	<div class="min-w-xl space-y-2 p-5">
		<div class="text-center">
			<h1 class="text-2xl font-bold">Create your account</h1>
		</div>
		<form method="POST" use:enhance>
			<Card.Root>
				<Card.Content class="space-y-4">
					<Form.Field {form} name="name">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Name</Form.Label>
								<Input
									{...props}
									type="string"
									placeholder="Your name"
									bind:value={$formData.name}
								/>
							{/snippet}
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>

					<Form.Field {form} name="email">
						<Form.Control>
							{#snippet children({ props })}
								<!--
                props berisi: id, name, aria-describedby, aria-invalid
                Semuanya di-generate otomatis oleh Formsnap
              -->
								<Form.Label>Email</Form.Label>
								<Input
									{...props}
									type="email"
									placeholder="your@email.com"
									bind:value={$formData.email}
								/>
							{/snippet}
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>

					<Form.Field {form} name="password">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Password</Form.Label>
								<Input
									{...props}
									type="password"
									placeholder="********"
									bind:value={$formData.password}
								/>
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
