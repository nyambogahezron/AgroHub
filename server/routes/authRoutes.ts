import express, { Router, RequestHandler } from 'express';
import {
	register,
	login,
	logout,
	verifyEmail,
	forgotPassword,
	resetPassword,
} from '../controllers/authController';

const router: Router = express.Router();

// Type assertion to ensure type safety while satisfying express's RequestHandler type
const asHandler = (
	handler: (
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) => Promise<void>
): RequestHandler => {
	return async (req, res, next) => {
		try {
			await handler(req, res, next);
		} catch (error) {
			next(error);
		}
	};
};

// Public routes
router.post('/register', asHandler(register));
router.post('/login', asHandler(login));
router.post('/logout', asHandler(logout));
router.get('/verify-email/:token', asHandler(verifyEmail));
router.post('/forgot-password', asHandler(forgotPassword));
router.post('/reset-password/:token', asHandler(resetPassword));

export default router;
