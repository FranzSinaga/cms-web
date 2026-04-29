<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';

	let {
		id,
		content,
		onUpdate,
		onEnter
	}: {
		id: string;
		content: string;
		onUpdate: (id: string, content: string) => void;
		onEnter: (id: string) => void;
	} = $props();

	let editor: Editor;
	let el: HTMLDivElement;

	onMount(() => {
		editor = new Editor({
			element: el,
			extensions: [StarterKit],
			content,
			onUpdate: ({ editor }) => {
				onUpdate(id, editor.getHTML());
			}
		});
		editor.commands.setParagraph();
	});

	onDestroy(() => {
		editor?.destroy();
	});

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			e.preventDefault();

			// ambil hanya paragraph pertama
			const html = editor.getHTML();

			// kirim ke parent
			onUpdate(id, html);

			// trigger block baru
			onEnter(id);
		}
	}

	export function focus() {
		editor?.chain().focus().run();
	}
</script>

<div bind:this={el} onkeydown={handleKeydown} class="min-h-[24px] outline-none"></div>
