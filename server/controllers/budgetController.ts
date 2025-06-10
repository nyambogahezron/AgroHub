import { Response } from 'express';
import * as CustomError from '../errors';
import Budget from '../models/Budget';
import Organization from '../models/organization';
import { StatusCodes } from 'http-status-codes';
import asyncWrapper from '../middleware/asyncHandler';
import { AuthenticatedRequestWithUser } from '../types/auth';

// @ Get User's Budget
// @ endpoint /api/v1/budget
// @ method GET
const GetUserBudget = asyncWrapper(
	async (req: AuthenticatedRequestWithUser, res: Response) => {
		const user = req.user.userId;
		const budgets = await Budget.find({ user: user });

		if (!budgets) {
			throw new CustomError.NotFoundError('No budgets found');
		}

		res.status(StatusCodes.OK).json({ success: true, budgets });
	}
);

// @ Get User's single Budget
// @ endpoint /api/v1/budget/:id
// @ method GET
const GetUserSingleBudget = asyncWrapper(
	async (req: AuthenticatedRequestWithUser, res: Response) => {
		const user = req.user.userId;
		const { id: budgetId } = req.params;

		const budget = await Budget.findOne({ _id: budgetId, user: user });

		if (!budget) {
			throw new CustomError.NotFoundError(`No budget with id : ${budgetId}`);
		}

		res.status(StatusCodes.OK).json({ success: true, budget });
	}
);

// @ Get User's Organization Budget
// @ endpoint /api/v1/budget/budget/:id
// @ method GET
const GetUserOrgBudget = asyncWrapper(
	async (req: AuthenticatedRequestWithUser, res: Response) => {
		const user = req.user.userId;
		const { id: orgId } = req.params;

		const budget = await Budget.findOne({ organization: orgId, user: user });

		if (!budget) {
			throw new CustomError.NotFoundError(
				`No budget with id : ${orgId} for this organization`
			);
		}

		res.status(StatusCodes.OK).json({ success: true, budget });
	}
);

// @ Create Budget
// @ endpoint /api/v1/budget
// @ method POST
const CreateBudget = asyncWrapper(
	async (req: AuthenticatedRequestWithUser, res: Response) => {
		const user = req.user.userId;

		const organization = await Organization.findOne({ user: user });

		if (!organization) {
			throw new CustomError.NotFoundError('No organization found');
		}

		const budget = await Budget.create({
			...req.body,
			user,
			organization: organization._id,
		});

		res.status(StatusCodes.CREATED).json({
			success: true,
			budget,
		});
	}
);

// @ Update Budget
// @ endpoint /api/v1/budget/:id
// @ method PATCH
const UpdateBudget = asyncWrapper(
	async (req: AuthenticatedRequestWithUser, res: Response) => {
		const user = req.user.userId;

		const budget = await Budget.findById(req.params.id);

		if (!budget) {
			throw new CustomError.NotFoundError(
				`Budget not found with id of ${req.params.id}`
			);
		}

		// Check if user is the owner of the budget
		const organization = await Organization.findOne({
			_id: budget.organization,
			user: user,
		});

		if (!organization) {
			throw new CustomError.UnauthorizedError(
				'Not authorized to update this budget'
			);
		}

		const updatedBudget = await Budget.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
				runValidators: true,
			}
		);

		res.status(StatusCodes.OK).json({
			success: true,
			budget: updatedBudget,
		});
	}
);

// @ Delete Budget
// @ endpoint /api/v1/budget/:id
// @ method DELETE
const DeleteBudget = asyncWrapper(
	async (req: AuthenticatedRequestWithUser, res: Response) => {
		const user = req.user.userId;

		const budget = await Budget.findById(req.params.id);

		if (!budget) {
			throw new CustomError.NotFoundError(
				`Budget not found with id of ${req.params.id}`
			);
		}

		// Check if user is the owner of the budget
		const organization = await Organization.findOne({
			_id: budget.organization,
			user: user,
		});

		if (!organization) {
			throw new CustomError.UnauthorizedError(
				'Not authorized to delete this budget'
			);
		}

		await budget.deleteOne();

		res.status(StatusCodes.OK).json({
			success: true,
			msg: 'Budget deleted',
		});
	}
);

export {
	GetUserBudget,
	GetUserSingleBudget,
	GetUserOrgBudget,
	CreateBudget,
	UpdateBudget,
	DeleteBudget,
};
