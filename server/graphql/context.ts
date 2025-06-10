import { Response } from 'express';
import { isTokenValid, attachCookiesToResponse } from '../utils';
import Token from '../models/Token';
import { AuthenticatedRequest, UserPayload } from '../types/auth';
import { GraphQLContext } from './types/context';

interface ContextParams {
	req: AuthenticatedRequest;
	res: Response;
}

// Create a context for GraphQL resolvers
export const createContext = async ({
	req,
	res,
}: ContextParams): Promise<GraphQLContext> => {
	try {
		// Add authentication to GraphQL context
		const { refreshToken, accessToken } = req.signedCookies;

		if (accessToken) {
			const payload = isTokenValid(accessToken);
			req.user = payload.user as UserPayload;
			return { req, res };
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

				req.user = payload.user as UserPayload;
			}
		}

		return { req, res };
	} catch (error) {
		// If authentication fails, still provide req and res without user info
		return { req, res };
	}
};
