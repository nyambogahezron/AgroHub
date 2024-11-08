const CustomError = require('../errors');
const Transaction = require('../models/Transaction');
const Budget = require('../models/Budget');
const Organization = require('../models/organization');
const { StatusCodes } = require('http-status-codes');
const asyncWrapper = require('../middleware/asyncHandler');

// @ Create Transaction
// @ endpoint /api/v1/transaction/
// @ method POST
const createTransaction = asyncWrapper(async (req, res) => {
  const user = req.user.userId;
  const {
    organization,
    budget,
    title,
    amount,
    category,
    description,
    transaction_date,
    receipt,
  } = req.body;

  // check if its user's organization
  const isUserOrg = await Organization.findOne({
    user: user,
    _id: organization,
  });

  if (!isUserOrg) {
    throw new CustomError.BadRequestError(
      'User not allowed to create transaction for this organization'
    );
  }
  const isUserBudget = await Budget.findOne({
    user: user,
    _id: budget,
  });

  if (!isUserBudget) {
    throw new CustomError.BadRequestError(
      'User not allowed to create transaction for this budget'
    );
  }

  const transaction = await Transaction.create({
    user,
    organization,
    budget,
    title,
    amount,
    category,
    description,
    transaction_date,
    receipt,
  });

  res.status(StatusCodes.CREATED).json({ transaction });
});

// @ Get User's Transaction
// @ endpoint /api/v1/transaction/
// @ method GET
const getUserTransactions = asyncWrapper(async (req, res) => {
  const user = req.user.userId;

  const transactions = await Transaction.find({ user });

  res.status(StatusCodes.OK).json({ transactions });
});

// @ Update Transaction
// @ endpoint /api/v1/transaction/:id
// @ method PUT
const updateTransaction = asyncWrapper(async (req, res) => {
  const user = req.user.userId;
  const {
    organization,
    budget,
    title,
    amount,
    category,
    description,
    transaction_date,
    receipt,
  } = req.body;

  // check if its user's organization
  const isUserOrg = await Organization.findOne({
    user: user,
    _id: organization,
  });

  if (!isUserOrg) {
    throw new CustomError.BadRequestError(
      'User not allowed to update transaction for this organization'
    );
  }
  const isUserBudget = await Budget.findOne({
    user: user,
    _id: budget,
  });

  if (!isUserBudget) {
    throw new CustomError.BadRequestError(
      'User not allowed to update transaction for this budget'
    );
  }

  const transaction = await Transaction.findOne({
    _id: req.params.id,
    user: user,
  });
  if (!transaction) {
    throw new CustomError.NotFoundError(
      `No transaction found with id ${req.params.id}`
    );
  }

  transaction.organization = organization || transaction.organization;
  transaction.budget = budget || transaction.budget;
  transaction.title = title || transaction.title;
  transaction.amount = amount || transaction.amount;
  transaction.category = category || transaction.category;
  transaction.description = description || transaction.description;
  transaction.transaction_date =
    transaction_date || transaction.transaction_date;
  transaction.recept = receipt || transaction.receipt;

  await transaction.save();

  res.status(StatusCodes.CREATED).json({ transaction });
});

// @ Delete Transaction
// @ endpoint /api/v1/transaction/:id
// @ method DELETE
const deleteTransaction = asyncWrapper(async (req, res) => {
  const user = req.user.userId;

  const transaction = await Transaction.findOne({
    _id: req.params.id,
    user: user,
  });
  if (!transaction) {
    throw new CustomError.NotFoundError(
      `No transaction found with id ${req.params.id}`
    );
  }

  await transaction.deleteOne();

  res.status(StatusCodes.OK).json({ message: 'Transaction removed' });
});

module.exports = {
  createTransaction,
  getUserTransactions,
  updateTransaction,
  deleteTransaction,
};
