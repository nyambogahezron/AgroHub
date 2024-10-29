const CustomError = require('../errors');
const Budget = require('../models/Budget');
const Organization = require('../models/organization');
const { StatusCodes } = require('http-status-codes');
const asyncWrapper = require('../middleware/asyncHandler');

// @ Get User's Budget
// @ endpoint /api/v1/budget
// @ method GET
const GetUserBudget = asyncWrapper(async (req, res) => {
  const user = req.user.userId;
  const budgets = await Budget.find({ user: user });

  if (!budgets) {
    throw new CustomError.NotFoundError('No budgets found');
  }

  res.status(StatusCodes.OK).json({ success: true, budgets });
});

// @ Get User's single Budget
// @ endpoint /api/v1/budget/:id
// @ method GET
const GetUserSingleBudget = asyncWrapper(async (req, res) => {
  const user = req.user.userId;
  const { id: budgetId } = req.params;

  const budget = await Budget.findOne({ _id: budgetId, user: user });

  if (!budget) {
    throw new CustomError.NotFoundError(`No budget with id : ${budgetId}`);
  }

  res.status(StatusCodes.OK).json({ success: true, budget });
});

// @ Get User's Organization Budget
// @ endpoint /api/v1/budget/org/:id
// @ method GET
const GetUserOrgBudget = asyncWrapper(async (req, res) => {
  const user = req.user.userId;
  const { id: orgId } = req.params;

  const budget = await Budget.findOne({ organization: orgId, user: user });

  if (!budget) {
    throw new CustomError.NotFoundError(
      `No budget with id : ${orgId} for this organization`
    );
  }

  res.status(StatusCodes.OK).json({ success: true, budget });
});

// @ Create Budget
// @ endpoint /api/v1/org
// @ method POST
const CreateBudget = asyncWrapper(async (req, res) => {
  const user = req.user.userId;
  const { title, amount, date, items, organization } = req.body;

  const org = await Organization.findOne({ _id: organization, user: user });

  if (!org) {
    throw new CustomError.NotFoundError(
      `No organization with id : ${organization}`
    );
  }
  const budget = new Budget({
    user,
    title,
    date,
    items,
    organization,
  });

  await budget.save();

  if (!budget) {
    throw new CustomError.InternalServerError('Budget could not be created');
  }

  res
    .status(StatusCodes.CREATED)
    .json({ success: true, msg: 'Budget created successfully', budget });
});

// @ Update Budget
// @ endpoint /api/v1/org/:id
// @ method PATCH
const UpdateBudget = asyncWrapper(async (req, res) => {
  const user = req.user.userId;
  const { id: budgetId } = req.params;
  const { title, date, items, organization } = req.body;

  const budget = await Budget.findOneAndUpdate(
    { _id: budgetId, user: user },
    { title, date, items, organization },
    { new: true, runValidators: true }
  );

  if (!budget) {
    throw new CustomError.NotFoundError(`No budget with id : ${budgetId}`);
  }

  res
    .status(StatusCodes.OK)
    .json({ success: true, msg: 'Budget updated successful', budget });
});

// @ Update Budget
// @ endpoint /api/v1/budget/:id
// @ method DELETE
const DeleteBudget = asyncWrapper(async (req, res) => {
  const user = req.user.userId;
  const { id: budgetId } = req.params;
  const budget = await Budget.findOneAndDelete({ _id: budgetId, user: user });
  if (!budget) {
    throw new CustomError.NotFoundError(`No budget with id : ${budgetId}`);
  }
  res
    .status(StatusCodes.OK)
    .json({ success: true, msg: 'Budget deleted successful' });
});

module.exports = {
  CreateBudget,
  GetUserBudget,
  GetUserSingleBudget,
  GetUserOrgBudget,
  UpdateBudget,
  DeleteBudget,
};
