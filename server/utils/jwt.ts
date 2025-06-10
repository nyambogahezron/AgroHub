import { Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserPayload } from '../types/auth';

interface JWTPayload {
	payload: {
		user: UserPayload;
		refreshToken?: string;
	};
}

interface AttachCookiesParams {
	res: Response;
	user: UserPayload;
	refreshToken: string;
}

// token object creation
const createJWT = ({ payload }: JWTPayload): string => {
	const token = jwt.sign(payload, process.env.JWT_SECRET as string);
	return token;
};

// token verification
const isTokenValid = (token: string): jwt.JwtPayload =>
	jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;

// attach cookies to response
const attachCookiesToResponse = ({
	res,
	user,
	refreshToken,
}: AttachCookiesParams): void => {
	const accessTokenJWT = createJWT({ payload: { user } });
	const refreshTokenJWT = createJWT({ payload: { user, refreshToken } });

	const oneDay = 1000 * 60 * 60 * 24;
	const longerExp = 1000 * 60 * 60 * 24 * 30;

	res.cookie('accessToken', accessTokenJWT, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		signed: true,
		expires: new Date(Date.now() + oneDay),
	});

	res.cookie('refreshToken', refreshTokenJWT, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		signed: true,
		expires: new Date(Date.now() + longerExp),
	});
};

export { createJWT, isTokenValid, attachCookiesToResponse };
