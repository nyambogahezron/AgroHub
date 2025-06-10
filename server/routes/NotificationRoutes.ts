import express, { Router, RequestHandler } from 'express';
import { authenticateUser } from '../middleware/authentication';
import { AuthenticatedRequestWithUser } from '../types/auth';
import {
	getNotifications,
	createNotification,
	getNotification,
	deleteNotification,
	deleteAllNotifications,
} from '../controllers/NotificationController';

const router: Router = express.Router();

// Type assertion to ensure type safety while satisfying express's RequestHandler type
const asAuthenticatedHandler = (
	handler: (
		req: AuthenticatedRequestWithUser,
		res: express.Response,
		next: express.NextFunction
	) => Promise<void>
): RequestHandler => {
	return async (req, res, next) => {
		if (!req.user) {
			res.status(401).json({ message: 'Unauthorized' });
			return;
		}
		try {
			await handler(req as AuthenticatedRequestWithUser, res, next);
		} catch (error) {
			next(error);
		}
	};
};

// Apply authentication middleware to all routes
router.use(authenticateUser);

router
	.route('/')
	.get(asAuthenticatedHandler(getNotifications))
	.post(asAuthenticatedHandler(createNotification))
	.delete(asAuthenticatedHandler(deleteAllNotifications));

router
	.route('/:id')
	.get(asAuthenticatedHandler(getNotification))
	.delete(asAuthenticatedHandler(deleteNotification));

export default router;
