import { StatusCodes } from 'http-status-codes';
import * as CustomError from '../../errors';
import User from '../../models/User';
import { createTokenUser, attachCookiesToResponse } from '../../utils';
import Token from '../../models/Token';
import crypto from 'crypto';
import sendVerificationEmail from '../../utils/sendEmail';
import sendResetPasswordEmail from '../../utils/sendResetPasswordEmail';
import createHash from '../../utils/createHash';
import { GraphQLContext } from '../types/context';

const authResolvers = {
	Mutation: {
		register: async (
			_: any,
			{
				name,
				email,
				password,
			}: { name: string; email: string; password: string },
			{ res }: GraphQLContext
		) => {
			// Check if email already exists
			const emailExists = await User.findOne({ email });

			if (emailExists) {
				throw new CustomError.BadRequestError('Email already exists');
			}

			// First registered user is an admin
			const isFirstAccount = (await User.countDocuments({})) === 0;
			const role = isFirstAccount ? 'admin' : 'user';

			// Create verification token
			const verificationToken = crypto.randomBytes(40).toString('hex');

			const user = await User.create({
				name,
				email,
				password,
				role,
				verificationToken,
			});

			// Send verification email
			await sendVerificationEmail({
				name: user.name,
				email: user.email,
				verificationToken: verificationToken,
			});

			return {
				user: {
					name: user.name,
					email: user.email,
					role: user.role,
					subscription: user.subscription,
					isVerified: user.isVerified,
				},
				token: null,
				refreshToken: null,
			};
		},

		login: async (
			_: any,
			{ email, password }: { email: string; password: string },
			{ req, res }: GraphQLContext
		) => {
			if (!email || !password) {
				throw new CustomError.BadRequestError(
					'Please provide email and password'
				);
			}

			const user = await User.findOne({ email });

			if (!user) {
				throw new CustomError.UnauthenticatedError('Invalid credentials');
			}

			const isPasswordCorrect = await user.comparePassword(password);

			if (!isPasswordCorrect) {
				throw new CustomError.UnauthenticatedError('Invalid credentials');
			}

			if (!user.isVerified) {
				throw new CustomError.UnauthenticatedError('Please verify your email');
			}

			const tokenUser = createTokenUser(user);

			// Create refresh token
			let refreshToken = '';

			// Check for existing token
			const existingToken = await Token.findOne({ user: user._id });

			if (existingToken) {
				const { isValid } = existingToken;
				if (!isValid) {
					throw new CustomError.UnauthenticatedError('Invalid credentials');
				}
				refreshToken = existingToken.refreshToken;

				attachCookiesToResponse({ res, user: tokenUser, refreshToken });

				return {
					user: tokenUser,
					token: refreshToken,
					refreshToken: refreshToken,
				};
			}

			// Create new refresh token
			refreshToken = crypto.randomBytes(40).toString('hex');
			const userAgent = req.headers['user-agent'] || '';
			const ip = req.ip;

			await Token.create({
				refreshToken,
				ip,
				userAgent,
				user: user._id,
			});

			attachCookiesToResponse({ res, user: tokenUser, refreshToken });

			return {
				user: tokenUser,
				token: refreshToken,
				refreshToken: refreshToken,
			};
		},

		logout: async (_: any, __: any, { req, res }: GraphQLContext) => {
			if (!req.user) {
				throw new CustomError.UnauthenticatedError('You need to be logged in');
			}

			await Token.findOneAndDelete({ user: req.user.userId });

			res.cookie('accessToken', 'logout', {
				httpOnly: true,
				expires: new Date(Date.now()),
			});

			res.cookie('refreshToken', 'logout', {
				httpOnly: true,
				expires: new Date(Date.now()),
			});

			return { message: 'User logged out!' };
		},

		verifyEmail: async (
			_: any,
			{ email, verificationToken }: { email: string; verificationToken: string }
		) => {
			const user = await User.findOne({ email });

			if (!user) {
				throw new CustomError.UnauthenticatedError('Verification failed');
			}

			if (user.verificationToken !== verificationToken) {
				throw new CustomError.UnauthenticatedError('Verification failed');
			}

			user.isVerified = true;
			user.verified = new Date(Date.now());
			user.verificationToken = '';

			await user.save();

			return { message: 'Email verified!' };
		},

		forgotPassword: async (_: any, { email }: { email: string }) => {
			if (!email) {
				throw new CustomError.BadRequestError('Please provide valid email');
			}

			const user = await User.findOne({ email });

			if (!user) {
				throw new CustomError.UnauthenticatedError('Please check your email');
			}

			const passwordToken = crypto.randomBytes(70).toString('hex');

			// Send email
			await sendResetPasswordEmail({
				name: user.name,
				email: user.email,
				token: passwordToken,
			});

			const tenMinutes = 10 * 60 * 1000;
			const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes);

			user.passwordToken = createHash(passwordToken);
			user.passwordTokenExpirationDate = passwordTokenExpirationDate;
			await user.save();

			return { message: 'Please check your email for reset password link' };
		},

		resetPassword: async (
			_: any,
			{
				email,
				token,
				password,
			}: { email: string; token: string; password: string }
		) => {
			if (!email || !token || !password) {
				throw new CustomError.BadRequestError('Please provide all values');
			}

			const user = await User.findOne({ email });

			if (!user) {
				throw new CustomError.UnauthenticatedError('Invalid credentials');
			}

			const currentDate = new Date();

			if (
				user.passwordToken !== createHash(token) ||
				user.passwordTokenExpirationDate === undefined ||
				user.passwordTokenExpirationDate < currentDate
			) {
				throw new CustomError.UnauthenticatedError('Invalid credentials');
			}

			user.password = password;
			user.passwordToken = undefined;
			user.passwordTokenExpirationDate = undefined;
			await user.save();

			return { message: 'Password reset successful!' };
		},
	},
};

export default authResolvers;
