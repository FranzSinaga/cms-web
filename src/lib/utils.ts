import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import z from 'zod';

// export function formToast(
// 	messages: { loading: string; success: string; error: string },
// 	onSuccess?: () => void
// ) {
// 	let resolve: (value: unknown) => void;
// 	let reject: (reason?: unknown) => void;

// 	return {
// 		onSubmit() {
// 			toast.promise(
// 				new Promise((res, rej) => {
// 					resolve = res;
// 					reject = rej;
// 				}),
// 				messages
// 			);
// 		},
// 		onResult({ result }: { result: { type: string } }) {
// 			if (result.type === 'success') {
// 				resolve(result);
// 				if (onSuccess) {
// 					setTimeout(() => {
// 						onSuccess();
// 					}, 1000);
// 				}
// 			} else {
// 				reject(result);
// 			}
// 		}
// 	};
// }

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, 'child'> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, 'children'> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };

export const slugify = (val: string) => {
	const schema = z.string().slugify();
	return schema.parse(val);
};
