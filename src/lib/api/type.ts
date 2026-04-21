export interface BaseResponse<T> {
	error: boolean;
	statusCode: number;
	message: string;
	data?: T;
	fields?: Record<string, string>;
}
