import { ApiError } from '$lib/api/api';
import type { HandleServerError } from '@sveltejs/kit';

export const handleError: HandleServerError = async ({ error }) => {
	const errorId = crypto.randomUUID();
	if (error instanceof ApiError) {
		return {
			message: error ? error.message : 'Something went wrong',
			errorId
		};
	}

	return {
		message: 'Something went wrong',
		errorId
	};
};
