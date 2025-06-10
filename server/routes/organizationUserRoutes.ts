import express, { Router, RequestHandler } from 'express';
import { authenticateUser } from '../middleware/authentication';
import { AuthenticatedRequestWithUser } from '../types/auth';
import {
	createOrganizationUser,
	getOrganizationUsers,
	getOrganizationUserById,
	updateOrganizationUser,
	deleteOrganizationUser,
} from '../controllers/organizationUserController';

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
	.get(asAuthenticatedHandler(getOrganizationUsers))
	.post(asAuthenticatedHandler(createOrganizationUser));
router
	.route('/:id')
	.get(asAuthenticatedHandler(getOrganizationUserById))
	.patch(asAuthenticatedHandler(updateOrganizationUser))
	.delete(asAuthenticatedHandler(deleteOrganizationUser));

export default router;
