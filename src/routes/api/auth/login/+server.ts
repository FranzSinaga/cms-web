import { PUBLIC_API_BASE_URL } from '$env/static/public';
import { json, type RequestHandler } from '@sveltejs/kit';

interface LoginResponse {
	error: true;
	message: string;
	statusCode: number;
}

export const POST: RequestHandler = async ({ request }) => {
	try {
		const body = await request.json();

		const response = await fetch(`${PUBLIC_API_BASE_URL}/api/auth/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify(body)
		});

		if (!response.ok) {
			const errorText = await response.text();
			let errorMessage = response.statusText;
			try {
				const errorBody = JSON.parse(errorText) as { message?: string };
				errorMessage = errorBody?.message ?? errorMessage;
			} catch {
				errorMessage = errorText || `[${response.status}] Login failed`;
			}

			return json(
				{ error: true, message: errorMessage, statusCode: response.status },
				{ status: response.status }
			);
		}

		const result = (await response.json()) as LoginResponse;
		if (result.error) {
			return json({ error: true, message: result.message }, { status: 400 });
		}

		return json(result);
	} catch (error) {
		console.error(error);
		return json({ error: true, message: 'Internal server error' }, { status: 500 });
	}
};
