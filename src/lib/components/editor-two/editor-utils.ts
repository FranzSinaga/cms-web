import type { Editor } from '@tiptap/core';

export interface Command {
	title: string;
	description: string;
	icon: string;
	command: (editor: Editor) => void;
	keywords: string[];
	group: string;
}

export const editorCommands: Command[] = [
	// Text Blocks
	{
		title: 'Text',
		description: 'Just start writing with plain text',
		icon: '📝',
		command: (editor) => editor.chain().focus().setParagraph().run(),
		keywords: ['text', 'paragraph', 'p'],
		group: 'Basic Blocks'
	},
	{
		title: 'Heading 1',
		description: 'Big section heading',
		icon: 'H1',
		command: (editor) => editor.chain().focus().toggleHeading({ level: 1 }).run(),
		keywords: ['h1', 'heading', 'title', 'large'],
		group: 'Basic Blocks'
	},
	{
		title: 'Heading 2',
		description: 'Medium section heading',
		icon: 'H2',
		command: (editor) => editor.chain().focus().toggleHeading({ level: 2 }).run(),
		keywords: ['h2', 'heading', 'subtitle'],
		group: 'Basic Blocks'
	},
	{
		title: 'Heading 3',
		description: 'Small section heading',
		icon: 'H3',
		command: (editor) => editor.chain().focus().toggleHeading({ level: 3 }).run(),
		keywords: ['h3', 'heading'],
		group: 'Basic Blocks'
	},

	// Lists
	{
		title: 'Bullet List',
		description: 'Create a simple bullet list',
		icon: '•',
		command: (editor) => editor.chain().focus().toggleBulletList().run(),
		keywords: ['ul', 'bullet', 'list', 'unordered'],
		group: 'Lists'
	},
	{
		title: 'Numbered List',
		description: 'Create a numbered list',
		icon: '1.',
		command: (editor) => editor.chain().focus().toggleOrderedList().run(),
		keywords: ['ol', 'numbered', 'list', 'ordered'],
		group: 'Lists'
	},
	{
		title: 'Task List',
		description: 'Track tasks with a todo list',
		icon: '☑',
		command: (editor) => editor.chain().focus().toggleTaskList().run(),
		keywords: ['todo', 'task', 'checkbox', 'checklist'],
		group: 'Lists'
	},

	// Advanced Blocks
	{
		title: 'Code Block',
		description: 'Capture a code snippet',
		icon: '</>',
		command: (editor) => editor.chain().focus().toggleCodeBlock().run(),
		keywords: ['code', 'codeblock', 'programming'],
		group: 'Advanced'
	},
	{
		title: 'Quote',
		description: 'Capture a quote',
		icon: '"',
		command: (editor) => editor.chain().focus().toggleBlockquote().run(),
		keywords: ['quote', 'blockquote', 'citation'],
		group: 'Advanced'
	},
	{
		title: 'Divider',
		description: 'Visually divide blocks',
		icon: '—',
		command: (editor) => editor.chain().focus().setHorizontalRule().run(),
		keywords: ['hr', 'divider', 'line', 'separator'],
		group: 'Advanced'
	}
];

export function groupCommands(commands: Command[]): Record<string, Command[]> {
	return commands.reduce(
		(acc, command) => {
			if (!acc[command.group]) {
				acc[command.group] = [];
			}
			acc[command.group].push(command);
			return acc;
		},
		{} as Record<string, Command[]>
	);
}
