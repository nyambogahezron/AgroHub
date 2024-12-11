const Notification = require('../models/Notification');
const User = require('../models/User');
const CustomError = require('../errors');
const asyncWrapper = require('../middleware/asyncHandler');
const { StatusCodes } = require('http-status-codes');

// @desc      Get all notifications
// @route     GET /api/v1/notifications
// @access    Private/User

const getNotifications = asyncWrapper(async (req, res) => {
  const notifications = await Notification.find({ user: req.user._id }).sort({
    createdAt: -1,
  });
  res.status(StatusCodes.OK).json({ notifications });
});

// @desc      Create notification
// @route     POST /api/v1/notifications
// @access    Private/User

const createNotification = asyncWrapper(async (req, res) => {
  const user = req.user.userId;

  const notification = await Notification.create({
    ...req.body,
    user,
  });

  res.status(StatusCodes.CREATED).json({ notification });
});

// @desc      Get single notification
// @route     GET /api/v1/notifications/:id
// @access    Private/User

const getNotification = asyncWrapper(async (req, res) => {
  const { id: notificationId } = req.params;
  const notification = await Notification.findOne({
    _id: notificationId,
    user: req.user._id,
  });

  if (!notification) {
    throw new CustomError.NotFoundError(
      `No notification with id : ${notificationId}`
    );
  }

  res.status(StatusCodes.OK).json({ notification });
});

// @desc      Delete single notification
// @route     DELETE /api/v1/notifications/:id
// @access    Private/User

const deleteNotification = asyncWrapper(async (req, res) => {
  const { id: notificationId } = req.params;
  const notification = await Notification.findOneAndDelete({
    _id: notificationId,
    user: req.user._id,
  });

  if (!notification) {
    throw new CustomError.NotFoundError(
      `No notification with id : ${notificationId}`
    );
  }

  res.status(StatusCodes.OK).json({ msg: 'Notification deleted' });
});

// @desc      Create notification
// @route     POST /api/v1/notifications
// @access    Private/User
const deleteAllNotifications = asyncWrapper(async (req, res) => {
  await Notification.deleteMany({ user: req.user._id });
  res.status(StatusCodes.OK).json({ msg: 'All notifications deleted' });
});

module.exports = {
  getNotifications,
  createNotification,
  getNotification,
  deleteNotification,
  deleteAllNotifications,
};
