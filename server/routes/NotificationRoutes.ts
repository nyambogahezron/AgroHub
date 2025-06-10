import express from 'express';

const router = express.Router();

import {
	getNotifications,
	createNotification,
	getNotification,
	deleteNotification,
	deleteAllNotifications,
} from '../controllers/NotificationController';

import { authenticateUser } from '../middleware/authentication';

router.get('/', authenticateUser, getNotifications);

router.post('/', authenticateUser, createNotification);

router.get('/:id', authenticateUser, getNotification);

router.delete('/:id', authenticateUser, deleteNotification);

router.delete('/', authenticateUser, deleteAllNotifications);

export default router;
