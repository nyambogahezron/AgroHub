import { Response, Request } from 'express';
import { isTokenValid, attachCookiesToResponse } from '../utils';
import Token from '../models/Token';
import { AuthenticatedRequest, UserPayload } from '../types/auth';
import { GraphQLContext } from './types/context';

// Accept ExpressContext from apollo-server-express
interface ContextParams {
	req: Request | AuthenticatedRequest;
	res: Response;
}

// Create a context for GraphQL resolvers
export const createContext = async ({
	req,
	res,
}: ContextParams): Promise<GraphQLContext> => {
	try {
		// Ensure we have cookies to check
		const authReq = req as AuthenticatedRequest;
		// Add authentication to GraphQL context
		const { refreshToken, accessToken } = authReq.signedCookies || {};

		if (accessToken) {
			const payload = isTokenValid(accessToken);
			authReq.user = payload.user as UserPayload;
			return { req: authReq, res };
		}

		if (refreshToken) {
			const payload = isTokenValid(refreshToken);

			const existingToken = await Token.findOne({
				user: payload.user.userId,
				refreshToken: payload.refreshToken,
			});

			if (existingToken?.isValid) {
				attachCookiesToResponse({
					res,
					user: payload.user,
					refreshToken: existingToken.refreshToken,
				});

				authReq.user = payload.user as UserPayload;
			}
		}

		return { req: authReq, res };
	} catch (error) {
		// If authentication fails, still provide req and res without user info
		console.log('Auth error in GraphQL context:', error);
		return { req: req as AuthenticatedRequest, res };
	}
};
