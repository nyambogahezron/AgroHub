export class CustomAPIError extends Error {
	statusCode?: number;

	constructor(message: string) {
		super(message);
		Object.setPrototypeOf(this, CustomAPIError.prototype);
	}
}
