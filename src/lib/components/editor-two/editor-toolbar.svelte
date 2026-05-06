<script lang="ts">
	import type { Editor } from '@tiptap/core';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import { Toggle } from '$lib/components/ui/toggle';
	import ArrowBackUp from '@tabler/icons-svelte/icons/arrow-back-up';
	import ArrowForwardUp from '@tabler/icons-svelte/icons/arrow-forward-up';

	interface Props {
		editor: Editor | null;
	}

	let { editor }: Props = $props();

	function addLink() {
		if (!editor) return;

		const url = prompt('Masukkan URL:');
		if (url) {
			editor.chain().focus().setLink({ href: url }).run();
		}
	}

	function addImage() {
		if (!editor) return;

		const url = prompt('Masukkan URL gambar:');
		if (url) {
			editor.chain().focus().setImage({ src: url }).run();
		}
	}
</script>

<div
	class="sticky top-4 z-10 mb-4 flex flex-wrap items-center gap-1 rounded-lg border bg-background p-2 shadow-sm"
>
	<!-- Undo/Redo -->
	<div class="flex items-center gap-0.5">
		<Button
			variant="ghost"
			size="sm"
			onclick={() => editor?.chain().focus().undo().run()}
			disabled={!editor?.can().undo()}
			class="h-8 w-8 p-0"
		>
			<ArrowBackUp />
		</Button>
		<Button
			variant="ghost"
			size="sm"
			onclick={() => editor?.chain().focus().redo().run()}
			disabled={!editor?.can().redo()}
			class="h-8 w-8 p-0"
		>
			<ArrowForwardUp />
		</Button>
	</div>

	<Separator orientation="vertical" class="h-6" />

	<!-- Text Formatting -->
	<div class="flex items-center gap-0.5">
		<Toggle
			pressed={editor?.isActive('bold')}
			onPressedChange={() => editor?.chain().focus().toggleBold().run()}
			size="sm"
			class="h-8 w-8 p-0"
		>
			<span class="font-bold">B</span>
		</Toggle>
		<Toggle
			pressed={editor?.isActive('italic')}
			onPressedChange={() => editor?.chain().focus().toggleItalic().run()}
			size="sm"
			class="h-8 w-8 p-0"
		>
			<span class="italic">I</span>
		</Toggle>
		<Toggle
			pressed={editor?.isActive('underline')}
			onPressedChange={() => editor?.chain().focus().toggleUnderline().run()}
			size="sm"
			class="h-8 w-8 p-0"
		>
			<span class="underline">U</span>
		</Toggle>
		<Toggle
			pressed={editor?.isActive('strike')}
			onPressedChange={() => editor?.chain().focus().toggleStrike().run()}
			size="sm"
			class="h-8 w-8 p-0"
		>
			<span class="line-through">S</span>
		</Toggle>
		<Toggle
			pressed={editor?.isActive('code')}
			onPressedChange={() => editor?.chain().focus().toggleCode().run()}
			size="sm"
			class="h-8 w-8 p-0"
		>
			<span class="font-mono text-xs">&lt;/&gt;</span>
		</Toggle>
	</div>

	<Separator orientation="vertical" class="h-6" />

	<!-- Additional Formatting -->
	<div class="flex items-center gap-0.5">
		<Toggle
			pressed={editor?.isActive('highlight')}
			onPressedChange={() => editor?.chain().focus().toggleHighlight().run()}
			size="sm"
			class="h-8 w-8 p-0"
		>
			<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
				/>
			</svg>
		</Toggle>
		<Button variant="ghost" size="sm" onclick={addLink} class="h-8 w-8 p-0">
			<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
				/>
			</svg>
		</Button>
		<Button variant="ghost" size="sm" onclick={addImage} class="h-8 w-8 p-0">
			<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
				/>
			</svg>
		</Button>
	</div>

	<Separator orientation="vertical" class="h-6" />

	<!-- Text Alignment -->
	<div class="flex items-center gap-0.5">
		<Toggle
			pressed={editor?.isActive({ textAlign: 'left' })}
			onPressedChange={() => editor?.chain().focus().setTextAlign('left').run()}
			size="sm"
			class="h-8 w-8 p-0"
		>
			<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 6h16M4 12h8m-8 6h16"
				/>
			</svg>
		</Toggle>
		<Toggle
			pressed={editor?.isActive({ textAlign: 'center' })}
			onPressedChange={() => editor?.chain().focus().setTextAlign('center').run()}
			size="sm"
			class="h-8 w-8 p-0"
		>
			<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 6h16M8 12h8M6 18h12"
				/>
			</svg>
		</Toggle>
		<Toggle
			pressed={editor?.isActive({ textAlign: 'right' })}
			onPressedChange={() => editor?.chain().focus().setTextAlign('right').run()}
			size="sm"
			class="h-8 w-8 p-0"
		>
			<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 6h16M8 12h12M6 18h16"
				/>
			</svg>
		</Toggle>
	</div>
</div>
