import * as CustomError from '../errors';
import Subscription from '../models/Subscription';
import User from '../models/User';
import { StatusCodes } from 'http-status-codes';
import asyncWrapper from '../middleware/asyncHandler';
import { Request, Response } from 'express';

// @ Create Subscription
// @ endpoint /api/v1/sub/
// @ method POST
const createSubscription = asyncWrapper(async (req: Request, res: Response) => {
	const user = req.user.userId;

	const { plan, price, status, start_date, end_date, stripe_id, payPal_id } =
		req.body;

	if (!plan || !price || !status || !start_date || !end_date) {
		throw new CustomError.BadRequestError('Please provide all values');
	}

	const subscription = await Subscription.create({
		plan,
		price,
		status,
		start_date,
		end_date,
		stripe_id,
		payPal_id,
		user,
	});

	res.status(StatusCodes.CREATED).json({ success: true, subscription });
});

// @ Get User's Subscription
// @ endpoint /api/v1/sub/
// @ method GET
const getUserSubscriptions = asyncWrapper(
	async (req: Request, res: Response) => {
		const user = req.user.userId;

		const subscriptions = await Subscription.find({ user });

		if (!subscriptions) {
			throw new CustomError.NotFoundError('No subscriptions found');
		}

		res.status(StatusCodes.OK).json({ success: true, subscriptions });
	}
);

// @ Update Subscription
// @ endpoint /api/v1/sub/:id
// @ method PUT
const updateSubscription = asyncWrapper(async (req: Request, res: Response) => {
	const user = req.user.userId;

	const { plan, price, status, start_date, end_date, stripe_id, payPal_id } =
		req.body;

	const subscription = await Subscription.findByIdAndUpdate(
		{ user },
		{ plan, price, status, start_date, end_date, stripe_id, payPal_id },
		{ new: true, runValidators: true }
	);

	if (!subscription) {
		throw new CustomError.NotFoundError(
			`No subscription found with id : ${req.params.id}`
		);
	}

	res.status(StatusCodes.OK).json({ success: true, subscription });
});

// @ Delete Subscription
// @ endpoint /api/v1/sub/:id
// @ method DELETE
const deleteSubscription = asyncWrapper(async (req: Request, res: Response) => {
	const user = req.user.userId;

	const subscription = await Subscription.findOne({ user });

	if (!subscription) {
		throw new CustomError.NotFoundError(
			`No subscription found with id : ${req.params.id}`
		);
	}

	if (subscription.plan === 'free') {
		res.send(
			'You are are currently subscribed to a plan, you cannot delete your subscription'
		);
	}

	await subscription.deleteOne();

	// reset to free plan
	const subscriptionData = {
		user,
		plan: 'free',
		price: 0,
		status: 'active',
		start_date: new Date(),
		end_date: new Date(new Date().setFullYear(new Date().getFullYear() + 1)), // 1 year
	};

	await Subscription.create(subscriptionData);

	res
		.status(StatusCodes.OK)
		.json({ success: true, msg: 'You are now using free plan' });
});

export {
	createSubscription,
	getUserSubscriptions,
	updateSubscription,
	deleteSubscription,
};
