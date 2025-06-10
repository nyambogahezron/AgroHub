import express from 'express';
const router = express.Router();
import { authenticateUser } from '../middleware/authentication';
import {
	createOrganizationUser,
	getOrganizationUsers,
	getOrganizationUserById,
	updateOrganizationUser,
	deleteOrganizationUser,
} from '../controllers/organizationUserController';

router
	.route('/')
	.get(authenticateUser, getOrganizationUsers)
	.post(authenticateUser, createOrganizationUser);
router
	.route('/:id')
	.get(authenticateUser, getOrganizationUserById)
	.patch(authenticateUser, updateOrganizationUser)
	.delete(authenticateUser, deleteOrganizationUser);

export default router;
