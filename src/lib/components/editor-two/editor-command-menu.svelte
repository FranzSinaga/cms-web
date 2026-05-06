<script lang="ts">
	/* eslint-disable svelte/require-each-key */
	import { Command as CommandPrimitive } from 'cmdk-sv';
	import { editorCommands, groupCommands, type Command } from './editor-utils';
	import type { Editor } from '@tiptap/core';

	interface Props {
		editor: Editor;
		open: boolean;
		onClose: () => void;
		position?: { x: number; y: number };
	}

	let { editor, open, onClose, position = { x: 0, y: 0 } }: Props = $props();

	let searchValue = $state('');
	let groupedCommands = $derived(groupCommands(editorCommands));

	function handleSelect(command: Command) {
		command.command(editor);
		onClose();
		searchValue = '';
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			onClose();
		}
	}
</script>

{#if open}
	<div
		class="fixed inset-0 z-50"
		onclick={onClose}
		onkeydown={handleKeyDown}
		role="button"
		tabindex="-1"
	>
		<div
			class="absolute w-125 overflow-hidden rounded-lg border border-gray-200 bg-muted shadow-xl"
			style="top: {position.y}px; left: {position.x}px;"
			onclick={(e) => e.stopPropagation()}
			onkeydown={(e) => e.stopPropagation()}
			role="dialog"
			tabindex="-1"
		>
			<CommandPrimitive.Root bind:value={searchValue} class="w-full">
				<div class="flex items-center border border-b px-3">
					<svg
						class="mr-2 h-4 w-4 text-gray-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
					<CommandPrimitive.Input
						placeholder="Cari atau ketik perintah..."
						class="flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
					/>
				</div>

				<CommandPrimitive.List class="max-h-100 overflow-y-auto p-2">
					<CommandPrimitive.Empty class="py-6 text-center text-sm text-gray-500">
						Tidak ada hasil ditemukan
					</CommandPrimitive.Empty>

					{#each Object.entries(groupedCommands) as [group, commands]}
						<CommandPrimitive.Group heading={group} class="mb-2">
							<div class="px-2 py-1.5 text-xs font-semibold text-gray-500">
								{group}
							</div>
							{#each commands as command}
								<CommandPrimitive.Item
									value={command.title}
									// keywords={command.keywords}
									onSelect={() => handleSelect(command)}
									class="flex cursor-pointer items-center gap-3 rounded-md px-2 py-2.5 transition-colors hover:bg-muted data-[selected]:bg-background"
								>
									<div
										class="flex h-10 w-10 items-center justify-center rounded-md bg-foreground text-lg"
									>
										{command.icon}
									</div>
									<div class="flex-1">
										<div class="text-sm font-medium text-foreground">
											{command.title}
										</div>
										<div class="text-xs text-muted-foreground">
											{command.description}
										</div>
									</div>
								</CommandPrimitive.Item>
							{/each}
						</CommandPrimitive.Group>
					{/each}
				</CommandPrimitive.List>
			</CommandPrimitive.Root>
		</div>
	</div>
{/if}
