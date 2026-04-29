export type Block = {
	id: string;
	type: BlockType;
	content: string;
};

type BlockType = 'paragraph' | 'heading';
