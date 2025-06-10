import express from 'express';
const router = express.Router();
import { authenticateUser } from '../middleware/authentication';

import {
	createTransaction,
	getUserTransactions,
	updateTransaction,
	deleteTransaction,
} from '../controllers/transactionControllers';

router
	.route('/')
	.post(authenticateUser, createTransaction)
	.get(authenticateUser, getUserTransactions);
router
	.route('/:id')
	.put(authenticateUser, updateTransaction)
	.delete(authenticateUser, deleteTransaction);

export default router;
