import { StatusCodes } from 'http-status-codes';
import * as CustomError from '../errors';
import asyncWrapper from '../middleware/asyncHandler';
import User from '../models/User';
import sendAlertEmail from '../utils/EmailAlert';
import { Response } from 'express';
import { createTokenUser, attachCookiesToResponse } from '../utils';
import { AuthenticatedRequestWithUser } from '../types/auth';
import Token from '../models/Token';
import crypto from 'crypto';

// @ Get Single user
// @ endpoint /api/v1/users/:id
// @ method GET

const getSingleUser = asyncWrapper(
	async (req: AuthenticatedRequestWithUser, res: Response) => {
		const user = await User.findOne({ _id: req.params.id }).select('-password');
		if (!user) {
			throw new CustomError.NotFoundError(`No user with id : ${req.params.id}`);
		}
		res.status(StatusCodes.OK).json({ user });
	}
);

// @ Get Current user
// @ endpoint /api/v1/users/showMe
// @ method GET

const showCurrentUser = asyncWrapper(
	async (req: AuthenticatedRequestWithUser, res: Response) => {
		const user = await User.findOne({ _id: req.user.userId }).select(
			'-password'
		);
		res.status(StatusCodes.OK).json({ user });
	}
);

// @ Update user
// @ endpoint /api/v1/users/updateUser
// @ method PATCH

const updateUser = asyncWrapper(
	async (req: AuthenticatedRequestWithUser, res: Response) => {
		const { email, name, state, city, phone } = req.body;
		// if (!email || !name) {
		//   throw new CustomError.BadRequestError("Please provide all values");
		// }
		const user = await User.findOne({ _id: req.user.userId });

		if (!user) {
			throw new CustomError.NotFoundError(
				`No user with id : ${req.user.userId}`
			);
		}

		user.email = email || user.email;
		user.name = name || user.name;
		user.state = state || user.state;
		user.city = city || user.city;
		user.phone = phone || user.phone;

		await user.save();

		const tokenUser = createTokenUser(user);

		// Get existing token or create new one
		const existingToken = await Token.findOne({ user: user._id });
		let refreshToken = '';

		if (existingToken?.isValid) {
			refreshToken = existingToken.refreshToken;
		} else {
			refreshToken = crypto.randomBytes(40).toString('hex');
			const userAgent = req.headers['user-agent'] || '';
			const ip = req.ip;
			await Token.create({
				refreshToken,
				ip,
				userAgent,
				user: user._id,
			});
		}

		attachCookiesToResponse({ res, user: tokenUser, refreshToken });

		res
			.status(StatusCodes.OK)
			.json({ msg: 'Profile Updated Successful', user: tokenUser });
	}
);

// @ Update user
// @ endpoint /api/users/updateUserPassword
// @ method PATCH

const updateUserPassword = asyncWrapper(
	async (req: AuthenticatedRequestWithUser, res: Response) => {
		const { oldPassword, newPassword } = req.body;
		if (!oldPassword || !newPassword) {
			throw new CustomError.BadRequestError('Please provide both values');
		}
		const user = await User.findOne({ _id: req.user.userId });

		if (!user) {
			throw new CustomError.NotFoundError(
				`No user with id : ${req.user.userId}`
			);
		}

		const isPasswordCorrect = await user.comparePassword(oldPassword);
		if (!isPasswordCorrect) {
			throw new CustomError.UnauthenticatedError('Invalid Credentials');
		}
		user.password = newPassword;

		await user.save();

		//send email to user
		try {
			await sendAlertEmail({
				email: user.email,
				message:
					'Your password was changed, if you did not make this change, please click the button below to reset your password',
				title: 'Password Update Alert',
				subject: 'Password Update Alert',
				action: 'https://agro-hub-nine.vercel.app/',
				name: user.name,
			});
		} catch (error) {
			console.log(error);
			throw new CustomError.BadRequestError(
				'Email not sent, something went wrong'
			);
		}

		res.status(StatusCodes.OK).json({ msg: 'Success! Password Updated.' });
	}
);

export { getSingleUser, showCurrentUser, updateUser, updateUserPassword };
