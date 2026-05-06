<script lang="ts">
	import Editor from '$lib/components/editor-two/editor.svelte';
	import BlockEditorList from '$lib/components/editor/block-editor-list.svelte';
	import Note from '$lib/components/editor/note.svelte';
	// import Editor from '$lib/components/editor/editor.svelte';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { slugify } from '$lib/utils';

	let title = $state('');
	let slug = $derived(slugify(title));

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let editorRef: any;

	function handleSave() {
		const blocks = editorRef.getBlocks();
		const html = editorRef.getHTML();

		console.log('BLOCKS:', blocks);
		console.log('HTML:', html);
	}
</script>

<h1>Create new posts</h1>
<hr />

<BlockEditorList bind:this={editorRef} />
<button onclick={handleSave} class="mt-4 rounded border px-3 py-1"> Save </button>

<form class="space-y-6">
	<fieldset class="space-y-2">
		<Label for="title">Title</Label>
		<Input
			type="text"
			bind:value={title}
			id="title"
			aria-label="title"
			placeholder="Input title here"
		/>
	</fieldset>
	<fieldset class="space-y-2">
		<Label for="slug">Slug</Label>
		<Input
			type="text"
			bind:value={slug}
			id="slug"
			aria-label="slug"
			disabled
			placeholder="Input title here"
		/>
	</fieldset>
</form>

<Editor />
