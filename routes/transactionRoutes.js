const express = require('express');
const router = express.Router();

const {
  createTransaction,
  getUserTransactions,
  updateTransaction,
  deleteTransaction,
} = require('../controllers/transactionControllers');

router.route('/').post(createTransaction).get(getUserTransactions);
router.route('/:id').put(updateTransaction).delete(deleteTransaction);

module.exports = router;
