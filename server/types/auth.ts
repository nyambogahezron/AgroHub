import { Request } from 'express';

export interface UserPayload {
	name: string;
	userId: string;
	role: string;
	email: string;
}

export interface AuthenticatedRequest extends Request {
	user?: UserPayload;
}
