import express, { RequestHandler } from 'express';
const router = express.Router();
import { authenticateUser } from '../middleware/authentication';
import {
	getSingleUser,
	showCurrentUser,
	updateUser,
	updateUserPassword,
} from '../controllers/userController';

router
	.route('/showMe')
	.get(authenticateUser, showCurrentUser as RequestHandler);
router
	.route('/updateUser')
	.patch(authenticateUser, updateUser as RequestHandler);
router
	.route('/updateUserPassword')
	.patch(authenticateUser, updateUserPassword as RequestHandler);

router.route('/:id').get(authenticateUser, getSingleUser as RequestHandler);

export default router;
