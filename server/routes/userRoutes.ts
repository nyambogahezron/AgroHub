import express from 'express';
const router = express.Router();
import { authenticateUser } from '../middleware/authentication';
import {
	getSingleUser,
	showCurrentUser,
	updateUser,
	updateUserPassword,
} from '../controllers/userController';

router.route('/showMe').get(authenticateUser, showCurrentUser);
router.route('/updateUser').patch(authenticateUser, updateUser);
router.route('/updateUserPassword').patch(authenticateUser, updateUserPassword);

router.route('/:id').get(authenticateUser, getSingleUser);

export default router;
