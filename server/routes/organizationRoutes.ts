import express from 'express';
const router = express.Router();
import { authenticateUser } from '../middleware/authentication';

import {
	CreateOrganization,
	GetUserOrganization,
	UpdateOrganization,
	DeleteOrganization,
	GetSingleOrganization,
} from '../controllers/organizationController';

router
	.route('/')
	.post(authenticateUser, CreateOrganization)
	.get(authenticateUser, GetUserOrganization);

router
	.route('/:id')
	.get(GetSingleOrganization)
	.delete(authenticateUser, DeleteOrganization)
	.patch(authenticateUser, UpdateOrganization);

export default router;
