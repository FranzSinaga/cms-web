<!-- <script lang="ts">
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import { onDestroy, onMount } from 'svelte';

	let editor: Editor | null = null;
	let element: HTMLDivElement;

	onMount(() => {
		editor = new Editor({
			element,
			extensions: [StarterKit],
			content: '<p>Hello World!</p>',
			autofocus: false
		});

		return () => editor.destroy();
	});

	onDestroy(() => {
		editor?.destroy();
	});

	function toggleBold() {
		editor?.chain().focus().toggleBold().run();
	}

	function toggleItalic() {
		editor?.chain().focus().toggleItalic().run();
	}

	function setParagraph() {
		editor?.chain().focus().setParagraph().run();
	}

	function setHeading() {
		editor?.chain().focus().toggleHeading({ level: 2 }).run();
	}
</script>

<div class="mb-2 flex gap-2">
	<button on:click={toggleBold} class="rounded border px-2 py-1">Bold</button>
	<button on:click={toggleItalic} class="rounded border px-2 py-1">Italic</button>
	<button on:click={setHeading} class="rounded border px-2 py-1">H2</button>
	<button on:click={setParagraph} class="rounded border px-2 py-1">P</button>
</div>
<div bind:this={element} class="rounded-lg border p-3"></div> -->

<script lang="ts">
	import BlockEditorList from './block-editor-list.svelte';
</script>

<div class="mx-auto mt-10 max-w-2xl">
	<BlockEditorList />
</div>
