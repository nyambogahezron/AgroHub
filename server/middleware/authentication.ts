import { Response, NextFunction } from 'express';
import { UnauthenticatedError } from '../errors';
import { isTokenValid } from '../utils';
import Token from '../models/Token';
import { attachCookiesToResponse } from '../utils';
import {
	AuthenticatedRequest,
	AuthenticatedRequestWithUser,
	UserPayload,
} from '../types/auth';

const authenticateUser = async (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction
) => {
	const { refreshToken, accessToken } = req.signedCookies;

	if (!refreshToken && !accessToken) {
		throw new UnauthenticatedError('Authentication Invalid');
	}

	try {
		if (accessToken) {
			const payload = isTokenValid(accessToken);
			if (!payload.user) {
				throw new UnauthenticatedError('Invalid token payload');
			}
			(req as AuthenticatedRequestWithUser).user = payload.user as UserPayload;
			return next();
		}

		const payload = isTokenValid(refreshToken);
		if (!payload.user) {
			throw new UnauthenticatedError('Invalid token payload');
		}

		const existingToken = await Token.findOne({
			user: payload.user.userId,
			refreshToken: payload.refreshToken,
		});

		if (!existingToken || !existingToken?.isValid) {
			throw new UnauthenticatedError('Authentication Invalid');
		}

		attachCookiesToResponse({
			res,
			user: payload.user,
			refreshToken: existingToken.refreshToken,
		});

		(req as AuthenticatedRequestWithUser).user = payload.user as UserPayload;
		next();
	} catch (error) {
		throw new UnauthenticatedError('Authentication Invalid');
	}
};

export { authenticateUser };
