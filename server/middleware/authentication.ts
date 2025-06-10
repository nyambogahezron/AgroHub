import { Response, NextFunction } from 'express';
import CustomError from '../errors';
import { isTokenValid } from '../utils';
import Token from '../models/Token';
import { attachCookiesToResponse } from '../utils';
import { AuthenticatedRequest, UserPayload } from '../types/auth';

const authenticateUser = async (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction
) => {
	const { refreshToken, accessToken } = req.signedCookies;

	try {
		if (accessToken) {
			const payload = isTokenValid(accessToken);
			req.user = payload.user as UserPayload;
			return next();
		}

		const payload = isTokenValid(refreshToken);

		const existingToken = await Token.findOne({
			user: payload.user.userId,
			refreshToken: payload.refreshToken,
		});

		if (!existingToken || !existingToken?.isValid) {
			throw new CustomError.UnauthenticatedError('Authentication Invalid');
		}

		attachCookiesToResponse({
			res,
			user: payload.user,
			refreshToken: existingToken.refreshToken,
		});

		req.user = payload.user as UserPayload;
		next();
	} catch (error) {
		throw new CustomError.UnauthenticatedError('Authentication Invalid');
	}
};

export { authenticateUser };
