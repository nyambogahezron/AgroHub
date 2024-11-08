const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/authentication');

const {
  createTransaction,
  getUserTransactions,
  updateTransaction,
  deleteTransaction,
} = require('../controllers/transactionControllers');

router
  .route('/')
  .post(authenticateUser, createTransaction)
  .get(authenticateUser, getUserTransactions);
router
  .route('/:id')
  .put(authenticateUser, updateTransaction)
  .delete(authenticateUser, deleteTransaction);

module.exports = router;
