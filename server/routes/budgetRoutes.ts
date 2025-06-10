import express from 'express';
const router = express.Router();
import { authenticateUser } from '../middleware/authentication';

import {
	CreateBudget,
	GetUserBudget,
	GetUserOrgBudget,
	GetUserSingleBudget,
	UpdateBudget,
	DeleteBudget,
} from '../controllers/budgetController';

router
	.route('/')
	.post(authenticateUser, CreateBudget)
	.get(authenticateUser, GetUserBudget);

router
	.route('/:id')
	.get(authenticateUser, GetUserSingleBudget)
	.delete(authenticateUser, DeleteBudget)
	.patch(authenticateUser, UpdateBudget);

router.route('/org/:id').get(authenticateUser, GetUserOrgBudget);

export default router;
