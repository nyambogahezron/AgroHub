import express, { Router, RequestHandler } from 'express';
import { authenticateUser } from '../middleware/authentication';
import { AuthenticatedRequestWithUser } from '../types/auth';
import {
	CreateBudget,
	GetUserBudget,
	GetUserOrgBudget,
	GetUserSingleBudget,
	UpdateBudget,
	DeleteBudget,
} from '../controllers/budgetController';

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

router
	.route('/')
	.post(authenticateUser, asAuthenticatedHandler(CreateBudget))
	.get(authenticateUser, asAuthenticatedHandler(GetUserBudget));

router
	.route('/:id')
	.get(authenticateUser, asAuthenticatedHandler(GetUserSingleBudget))
	.delete(authenticateUser, asAuthenticatedHandler(DeleteBudget))
	.patch(authenticateUser, asAuthenticatedHandler(UpdateBudget));

router
	.route('/org/:id')
	.get(authenticateUser, asAuthenticatedHandler(GetUserOrgBudget));

export default router;
