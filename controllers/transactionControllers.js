const CustomError = require('../errors');
const Transaction = require('../models/Transaction');
const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const asyncWrapper = require('../middleware/asyncHandler');

// @ Create Transaction
// @ endpoint /api/v1/transaction/
// @ method POST
const createTransaction = asyncWrapper(async (req, res) => {
  res.send('Create Transaction');
});

// @ Get User's Transaction
// @ endpoint /api/v1/transaction/
// @ method GET
const getUserTransactions = asyncWrapper(async (req, res) => {
  res.send('Get User Transaction');
});

// @ Update Transaction
// @ endpoint /api/v1/transaction/:id
// @ method PUT
const updateTransaction = asyncWrapper(async (req, res) => {
  res.send('Update Transaction');
});

// @ Delete Transaction
// @ endpoint /api/v1/transaction/:id
// @ method DELETE
const deleteTransaction = asyncWrapper(async (req, res) => {
  res.send('Delete Transaction');
});

module.exports = {
  createTransaction,
  getUserTransactions,
  updateTransaction,
  deleteTransaction,
};
