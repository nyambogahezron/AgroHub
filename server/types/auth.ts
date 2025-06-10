import { Request } from 'express';

export interface UserPayload {
	name: string;
	userId: string;
	role: string;
	email: string;
}

// Base request type with optional user
export interface AuthenticatedRequest extends Request {
	user?: UserPayload;
}

// Request type after authentication - user is guaranteed to be present
export interface AuthenticatedRequestWithUser extends Request {
	user: UserPayload;
}
