import { PUBLIC_API_BASE_URL } from '$env/static/public';

import type { BaseResponse } from './type';

/** Default request timeout in milliseconds (30 seconds) */
const DEFAULT_TIMEOUT_MS = 30_000;

/** HTTP methods supported by the API client */
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

/** Request options excluding conflicting timeout properties */
interface ApiRequestOptions extends Omit<RequestInit, 'signal'> {
	timeoutMs?: number;
}

/** Custom error class for API-related errors */
export class ApiError extends Error {
	constructor(
		message: string,
		public readonly statusCode?: number,
		public readonly fields?: Record<string, string>,
		public readonly cause?: unknown
	) {
		super(message);
		this.name = 'ApiError';
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, ApiError);
		}
	}
}

/**
 * Simplified API client that proxies requests through SvelteKit server routes.
 * Authentication is handled via httpOnly cookies - no token management needed on client.
 */
class API {
	/**
	 * Normalizes the path to ensure it starts with a forward slash
	 */
	private normalizePath(path: string): string {
		return `${PUBLIC_API_BASE_URL}/api${path.startsWith('/') ? path : `/${path}`}`;
	}

	/**
	 * Builds request headers, handling FormData special case
	 */
	private buildHeaders(body?: BodyInit | null): HeadersInit {
		if (body instanceof FormData) {
			// Let browser set Content-Type with boundary for FormData
			return { Accept: 'application/json' };
		}

		return {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		};
	}

	/**
	 * Handles error responses and extracts meaningful error messages
	 */
	private async handleErrorResponse<T>(response: Response): Promise<never> {
		let errorMessage = response.statusText;
		let fields: Record<string, string> | undefined;

		try {
			const text = await response.text();
			if (text) {
				const errorBody = text ? (JSON.parse(text) as BaseResponse<T>) : undefined;
				errorMessage = errorBody?.message ?? errorMessage;
				fields = errorBody?.fields ?? {};
			} else {
				errorMessage = 'No response body received';
			}
		} catch {
			errorMessage = 'Invalid response format';
		}

		throw new ApiError(errorMessage || 'Internal Server Error', response.status, fields);
	}

	/**
	 * Handles authentication errors by redirecting to login
	 */
	// private handleAuthError(): never {
	// 	throw redirect(302, '/login');
	// }

	/**
	 * Core request method that handles all HTTP operations
	 */
	private async request<T>(
		path: string,
		method: HttpMethod,
		options?: ApiRequestOptions
	): Promise<BaseResponse<T>> {
		const { timeoutMs = DEFAULT_TIMEOUT_MS, ...requestOptions } = options ?? {};

		const proxyPath = this.normalizePath(path);

		const config: RequestInit = {
			method,
			credentials: 'include',
			signal: AbortSignal.timeout(timeoutMs),
			headers: this.buildHeaders(requestOptions.body),
			...requestOptions
		};

		let response: Response;

		try {
			response = await fetch(proxyPath, config);
		} catch (error) {
			if (error instanceof DOMException && error.name === 'TimeoutError') {
				throw new ApiError(`Request timed out after ${timeoutMs / 1000}s`, 408, undefined);
			}

			throw new ApiError('An unexpected error occurred', undefined, undefined, error);
		}

		// Handle authentication errors
		// if (response.status === 401 || response.status === 403) {
		// 	this.handleAuthError();
		// }

		// Handle other error responses
		if (!response.ok) {
			await this.handleErrorResponse<T>(response);
		}

		return response.json() as Promise<BaseResponse<T>>;
	}

	/**
	 * Serializes request body based on type
	 */
	private serializeBody(body: FormData | object): BodyInit {
		return body instanceof FormData ? body : JSON.stringify(body);
	}

	// Public HTTP method helpers

	get<T>(path: string, options?: ApiRequestOptions) {
		return this.request<T>(path, 'GET', options);
	}

	post<T>(path: string, body: FormData | object, options?: ApiRequestOptions) {
		return this.request<T>(path, 'POST', {
			...options,
			body: this.serializeBody(body)
		});
	}

	put<T>(path: string, body: FormData | object, options?: ApiRequestOptions) {
		return this.request<T>(path, 'PUT', {
			...options,
			body: this.serializeBody(body)
		});
	}

	patch<T>(path: string, body: FormData | object, options?: ApiRequestOptions) {
		return this.request<T>(path, 'PATCH', {
			...options,
			body: this.serializeBody(body)
		});
	}

	delete<T>(path: string, body?: FormData | object, options?: ApiRequestOptions) {
		return this.request<T>(path, 'DELETE', {
			...options,
			...(body && { body: this.serializeBody(body) })
		});
	}
}

export const api = new API();
