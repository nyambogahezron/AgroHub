import { AuthenticatedRequest } from '../../types/auth';
import { Response } from 'express';

export interface GraphQLContext {
	req: AuthenticatedRequest;
	res: Response;
}
