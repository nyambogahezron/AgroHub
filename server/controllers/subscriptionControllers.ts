import * as CustomError from '../errors';
import Subscription from '../models/Subscription';
import User from '../models/User';
import { StatusCodes } from 'http-status-codes';
import asyncWrapper from '../middleware/asyncHandler';
import { Request, Response } from 'express';
import { AuthenticatedRequestWithUser } from '../types/auth';

// @ Create Subscription
// @ endpoint /api/v1/subscription
// @ method POST
const CreateSubscription = asyncWrapper(
	async (req: AuthenticatedRequestWithUser, res: Response) => {
		const user = req.user.userId;

		const subscription = await Subscription.create({
			...req.body,
			user,
		});

		res.status(StatusCodes.CREATED).json({
			success: true,
			subscription,
		});
	}
);

// @ Get User's Subscription
// @ endpoint /api/v1/subscription
// @ method GET
const GetUserSubscription = asyncWrapper(
	async (req: AuthenticatedRequestWithUser, res: Response) => {
		const user = req.user.userId;
		const subscription = await Subscription.findOne({ user: user });

		if (!subscription) {
			throw new CustomError.NotFoundError('No subscription found');
		}

		res.status(StatusCodes.OK).json({ success: true, subscription });
	}
);

// @ Update Subscription
// @ endpoint /api/v1/subscription/:id
// @ method PATCH
const UpdateSubscription = asyncWrapper(
	async (req: AuthenticatedRequestWithUser, res: Response) => {
		const user = req.user.userId;

		const subscription = await Subscription.findById(req.params.id);

		if (!subscription) {
			throw new CustomError.NotFoundError(
				`Subscription not found with id of ${req.params.id}`
			);
		}

		// Check if user is the owner of the subscription
		if (subscription.user.toString() !== user) {
			throw new CustomError.UnauthorizedError(
				'Not authorized to update this subscription'
			);
		}

		const updatedSubscription = await Subscription.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
				runValidators: true,
			}
		);

		res.status(StatusCodes.OK).json({
			success: true,
			subscription: updatedSubscription,
		});
	}
);

// @ Delete Subscription
// @ endpoint /api/v1/subscription/:id
// @ method DELETE
const DeleteSubscription = asyncWrapper(
	async (req: AuthenticatedRequestWithUser, res: Response) => {
		const user = req.user.userId;

		const subscription = await Subscription.findById(req.params.id);

		if (!subscription) {
			throw new CustomError.NotFoundError(
				`Subscription not found with id of ${req.params.id}`
			);
		}

		// Check if user is the owner of the subscription
		if (subscription.user.toString() !== user) {
			throw new CustomError.UnauthorizedError(
				'Not authorized to delete this subscription'
			);
		}

		await subscription.deleteOne();

		res.status(StatusCodes.OK).json({
			success: true,
			msg: 'Subscription deleted',
		});
	}
);

export {
	GetUserSubscription,
	CreateSubscription,
	UpdateSubscription,
	DeleteSubscription,
};
