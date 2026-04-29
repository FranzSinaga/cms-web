<script lang="ts">
	/* eslint-disable @typescript-eslint/no-explicit-any */
	import { nanoid } from 'nanoid';
	import type { Block } from './type';
	import BlockEditor from './block-editor.svelte';

	let refs: Record<string, any> = {};
	let blocks = $state<Block[]>([
		{
			id: nanoid(),
			type: 'paragraph',
			content: '<p></p>'
		}
	]);

	function addBlock(afterId: string) {
		const index = blocks.findIndex((b) => b.id === afterId);

		const newBlock: Block = {
			id: nanoid(),
			type: 'paragraph',
			content: '<p></p>'
		};

		blocks.splice(index + 1, 0, newBlock);
	}

	function updateBlock(id: string, content: string) {
		const block = blocks.find((b) => b.id === id);
		if (block) block.content = content;
	}

	// ✅ expose ke parent
	export function getBlocks() {
		return blocks;
	}

	export function getHTML() {
		return blocks.map((b) => b.content).join('');
	}
</script>

<div class="space-y-2">
	{#each blocks as block (block.id)}
		<div class="rounded border border-gray-300 p-2">
			<BlockEditor
				bind:this={refs[block.id]}
				id={block.id}
				content={block.content}
				onUpdate={updateBlock}
				onEnter={addBlock}
			/>
		</div>
	{/each}
</div>
