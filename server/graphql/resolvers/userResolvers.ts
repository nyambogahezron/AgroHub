import User from '../../models/User';
import { StatusCodes } from 'http-status-codes';
import * as CustomError from '../../errors';
import { GraphQLContext } from '../types/context';

const userResolvers = {
	Query: {
		getUser: async (_: any, { id }: { id: string }) => {
			const user = await User.findOne({ _id: id }).select('-password');
			if (!user) {
				throw new CustomError.NotFoundError(`No user with id: ${id}`);
			}
			return user;
		},

		getCurrentUser: async (_: any, __: any, { req }: GraphQLContext) => {
			if (!req.user) {
				throw new CustomError.UnauthenticatedError('You need to be logged in');
			}

			const user = await User.findOne({ _id: req.user.userId }).select(
				'-password'
			);
			if (!user) {
				throw new CustomError.NotFoundError(`User not found`);
			}

			return user;
		},

		getAllUsers: async () => {
			return await User.find({}).select('-password');
		},
	},

	Mutation: {
		updateUser: async (_: any, args: any, { req }: GraphQLContext) => {
			if (!req.user) {
				throw new CustomError.UnauthenticatedError('You need to be logged in');
			}

			const { name, email, state, city, phone } = args;
			const user = await User.findOne({ _id: req.user.userId });

			if (!user) {
				throw new CustomError.NotFoundError(
					`No user with id: ${req.user.userId}`
				);
			}

			if (name) user.name = name;
			if (email) user.email = email;
			if (state) user.state = state;
			if (city) user.city = city;
			if (phone) user.phone = phone;

			await user.save();
			return user;
		},

		updateUserPassword: async (
			_: any,
			{
				oldPassword,
				newPassword,
			}: { oldPassword: string; newPassword: string },
			{ req }: GraphQLContext
		) => {
			if (!req.user) {
				throw new CustomError.UnauthenticatedError('You need to be logged in');
			}

			const user = await User.findOne({ _id: req.user.userId });

			if (!user) {
				throw new CustomError.NotFoundError(
					`No user with id: ${req.user.userId}`
				);
			}

			const isPasswordCorrect = await user.comparePassword(oldPassword);

			if (!isPasswordCorrect) {
				throw new CustomError.UnauthenticatedError('Invalid credentials');
			}

			user.password = newPassword;
			await user.save();

			return { message: 'Password updated successfully!' };
		},
	},
};

export default userResolvers;
