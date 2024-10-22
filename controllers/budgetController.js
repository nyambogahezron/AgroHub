
const CustomError = require('../errors');
const Budget = require('../models/budget');
const { StatusCodes } = require('http-status-codes');
const asyncWrapper = require('../middleware/asyncHandler');

// @ Get User's Budget
// @ endpoint /api/v1/org/:id
// @ method GET
const GetUserBudget = asyncWrapper(async (req, res) => {
  res.send('get user budget');
});

// @ Create Budget
// @ endpoint /api/v1/org
// @ method POST
const CreateBudget = asyncWrapper(async (req, res) => {
  res.send('create budget');
});

// @ Update Budget
// @ endpoint /api/v1/org/
// @ method PATCH
const UpdateBudget = asyncWrapper(async (req, res) => {
  res.send('update budget');
});

// @ Update Budget
// @ endpoint /api/v1/org/
// @ method DELETE
const DeleteBudget = asyncWrapper(async (req, res) => {
  res.send('delete budget');
});

module.exports = {
  CreateBudget,
  GetUserBudget,
  UpdateBudget,
  DeleteBudget,
};
