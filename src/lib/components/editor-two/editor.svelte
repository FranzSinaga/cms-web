<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Placeholder from '@tiptap/extension-placeholder';
	import TaskList from '@tiptap/extension-task-list';
	import TaskItem from '@tiptap/extension-task-item';
	import Image from '@tiptap/extension-image';
	import Link from '@tiptap/extension-link';
	import Highlight from '@tiptap/extension-highlight';
	import Typography from '@tiptap/extension-typography';
	import Underline from '@tiptap/extension-underline';
	import TextAlign from '@tiptap/extension-text-align';
	import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
	import { common, createLowlight } from 'lowlight';

	import EditorToolbar from './editor-toolbar.svelte';
	import EditorCommandMenu from './editor-command-menu.svelte';

	let element: HTMLElement;
	let editor: Editor | null = $state(null);
	let showCommandMenu = $state(false);
	let commandMenuPosition = $state({ x: 0, y: 0 });

	const lowlight = createLowlight(common);

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [
				StarterKit.configure({
					codeBlock: false
				}),
				Placeholder.configure({
					placeholder: ({ node }) => {
						if (node.type.name === 'heading') {
							return 'Heading';
						}
						return "Ketik '/' untuk perintah...";
					}
				}),
				TaskList,
				TaskItem.configure({
					nested: true
				}),
				Image.configure({
					inline: true,
					allowBase64: true
				}),
				Link.configure({
					openOnClick: false,
					HTMLAttributes: {
						class: 'text-black dark:text-white underline'
					}
				}),
				Highlight.configure({
					multicolor: false
				}),
				Typography,
				Underline,
				TextAlign.configure({
					types: ['heading', 'paragraph']
				}),
				CodeBlockLowlight.configure({
					lowlight
				})
			],
			content: ``,
			editorProps: {
				attributes: {
					class: 'prose prose-sm sm:prose lg:prose-lg max-w-none focus:outline-none min-h-[500px]'
				}
			},
			onUpdate: ({ editor }) => {
				// Auto-save logic
				console.log('Content updated:', editor.getJSON());
			},
			onCreate: ({ editor }) => {
				editor.view.dom.addEventListener('keydown', handleSlashCommand);
			}
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.view.dom.removeEventListener('keydown', handleSlashCommand);
			editor.destroy();
		}
	});

	function handleSlashCommand(event: KeyboardEvent) {
		if (event.key === '/' && editor) {
			const { from } = editor.state.selection;
			const textBefore = editor.state.doc.textBetween(Math.max(0, from - 1), from, '\n');

			if (textBefore === '' || textBefore === '\n') {
				// event.preventDefault();
				console.log(event);
				// Delete the slash that was just typed
				// editor.commands.deleteRange({ from: from, to: from });

				const coords = editor.view.coordsAtPos(from);
				commandMenuPosition = {
					x: Math.min(coords.left, window.innerWidth - 520),
					y: coords.bottom + 8
				};
				showCommandMenu = true;
				document.body.style.overflow = 'hidden';
			}
		}

		if (event.key === 'Escape') {
			showCommandMenu = false;
		}
	}

	function closeCommandMenu() {
		document.body.style.overflow = '';
		showCommandMenu = false;
	}
</script>

<div class="mx-auto w-full max-w-5xl px-4 py-8">
	<div class="mb-8">
		<h1 class="mb-2 text-3xl font-bold text-black dark:text-white">Notion-like Editor</h1>
		<p class="text-muted-foreground">Powered by Tiptap, shadcn-svelte, and CMDK</p>
	</div>

	{#if editor}
		<EditorToolbar {editor} />
	{/if}

	<div class="rounded-lg border bg-background p-12 text-black shadow-sm dark:text-white">
		<div bind:this={element} class="text-black dark:text-white"></div>
	</div>

	{#if editor}
		<EditorCommandMenu
			{editor}
			open={showCommandMenu}
			onClose={closeCommandMenu}
			position={commandMenuPosition}
		/>
	{/if}
</div>

<style>
	@reference "tailwindcss";

	:global(.ProseMirror) {
		outline: none;
	}

	:global(.ProseMirror p.is-editor-empty:first-child::before) {
		content: attr(data-placeholder);
		float: left;
		color: #9ca3af;
		pointer-events: none;
		height: 0;
	}

	:global(.ProseMirror h1) {
		@apply mt-8 mb-4 text-4xl font-bold text-black dark:text-white;
	}

	:global(.ProseMirror h2) {
		@apply mt-6 mb-3 text-3xl font-bold text-black dark:text-white;
	}

	:global(.ProseMirror h3) {
		@apply mt-4 mb-2 text-2xl font-bold text-black dark:text-white;
	}

	:global(.ProseMirror p) {
		@apply my-3 leading-7 text-black dark:text-white;
	}

	:global(.ProseMirror ul:not([data-type='taskList']), .ProseMirror ol) {
		@apply my-3 pl-6;
	}

	:global(.ProseMirror ul:not([data-type='taskList']) li, .ProseMirror ol li) {
		@apply my-1 text-black dark:text-white;
	}

	:global(.ProseMirror code) {
		@apply rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm text-gray-800;
	}

	:global(.ProseMirror pre) {
		@apply my-4 overflow-x-auto rounded-lg bg-gray-900 p-4 text-gray-100;
	}

	:global(.ProseMirror pre code) {
		@apply bg-transparent p-0 text-gray-100;
	}

	:global(.ProseMirror blockquote) {
		@apply my-4 border-l-4 border-gray-300 pl-4 text-gray-600 italic;
	}

	:global(.ProseMirror hr) {
		@apply my-8 border-0 border-t-2 border-gray-200;
	}

	:global(.ProseMirror img) {
		@apply my-4 h-auto max-w-full rounded-lg;
	}

	:global(.ProseMirror mark) {
		@apply rounded bg-yellow-200 px-1;
	}

	:global(.ProseMirror ul[data-type='taskList']) {
		@apply list-none pl-0;
	}

	:global(.ProseMirror ul[data-type='taskList'] li) {
		@apply flex items-start gap-2;
	}

	:global(.ProseMirror ul[data-type='taskList'] li > label) {
		@apply mt-1 flex-none;
	}

	:global(.ProseMirror ul[data-type='taskList'] li > div) {
		@apply flex-1;
	}

	:global(.ProseMirror ul[data-type='taskList'] input[type='checkbox']) {
		@apply h-4 w-4 cursor-pointer rounded border-gray-300;
	}
</style>
