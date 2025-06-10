import express, { Router, RequestHandler } from 'express';
import { authenticateUser } from '../middleware/authentication';
import { AuthenticatedRequestWithUser } from '../types/auth';
import {
	createTransaction,
	getUserTransactions,
	updateTransaction,
	deleteTransaction,
} from '../controllers/transactionControllers';

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
	.post(asAuthenticatedHandler(createTransaction))
	.get(asAuthenticatedHandler(getUserTransactions));

router
	.route('/:id')
	.patch(asAuthenticatedHandler(updateTransaction))
	.delete(asAuthenticatedHandler(deleteTransaction));

export default router;
