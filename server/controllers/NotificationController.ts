import { Response } from 'express';
import Notification from '../models/Notification';
import User from '../models/User';
import * as CustomError from '../errors';
import asyncWrapper from '../middleware/asyncHandler';
import { StatusCodes } from 'http-status-codes';
import { AuthenticatedRequest } from '../types/auth';

// @desc      Get all notifications
// @route     GET /api/v1/notifications
// @access    Private/User

const getNotifications = asyncWrapper(
	async (req: AuthenticatedRequest, res: Response) => {
		const notifications = await Notification.find({
			user: req.user?.userId,
		}).sort({
			createdAt: -1,
		});
		res.status(StatusCodes.OK).json({ notifications });
	}
);

// @desc      Create notification
// @route     POST /api/v1/notifications
// @access    Private/User

const createNotification = asyncWrapper(
	async (req: AuthenticatedRequest, res: Response) => {
		const user = req.user?.userId;

		const notification = await Notification.create({
			...req.body,
			user,
		});

		res.status(StatusCodes.CREATED).json({ notification });
	}
);

// @desc      Get single notification
// @route     GET /api/v1/notifications/:id
// @access    Private/User

const getNotification = asyncWrapper(
	async (req: AuthenticatedRequest, res: Response) => {
		const { id: notificationId } = req.params;
		const notification = await Notification.findOne({
			_id: notificationId,
			user: req.user?.userId,
		});

		if (!notification) {
			throw new CustomError.NotFoundError(
				`No notification with id : ${notificationId}`
			);
		}

		res.status(StatusCodes.OK).json({ notification });
	}
);

// @desc      Delete single notification
// @route     DELETE /api/v1/notifications/:id
// @access    Private/User

const deleteNotification = asyncWrapper(
	async (req: AuthenticatedRequest, res: Response) => {
		const { id: notificationId } = req.params;
		const notification = await Notification.findOneAndDelete({
			_id: notificationId,
			user: req.user?.userId,
		});

		if (!notification) {
			throw new CustomError.NotFoundError(
				`No notification with id : ${notificationId}`
			);
		}

		res.status(StatusCodes.OK).json({ msg: 'Notification deleted' });
	}
);

// @desc      Create notification
// @route     POST /api/v1/notifications
// @access    Private/User
const deleteAllNotifications = asyncWrapper(
	async (req: AuthenticatedRequest, res: Response) => {
		await Notification.deleteMany({ user: req.user?.userId });
		res.status(StatusCodes.OK).json({ msg: 'All notifications deleted' });
	}
);

export {
	getNotifications,
	createNotification,
	getNotification,
	deleteNotification,
	deleteAllNotifications,
};
