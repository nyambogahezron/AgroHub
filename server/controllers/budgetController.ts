import { Request, Response } from 'express';
import * as CustomError from '../errors';
import Budget from '../models/Budget';
import Organization from '../models/organization';
import { StatusCodes } from 'http-status-codes';
import asyncWrapper from '../middleware/asyncHandler';
import { AuthenticatedRequest } from '../types/auth';

// @ Get User's Budget
// @ endpoint /api/v1/budget
// @ method GET
const GetUserBudget = asyncWrapper(
	async (req: AuthenticatedRequest, res: Response) => {
		const user = req.user?.userId;
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
	async (req: AuthenticatedRequest, res: Response) => {
		const user = req.user?.userId;
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
	async (req: AuthenticatedRequest, res: Response) => {
		const user = req.user?.userId;
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
// @ endpoint /api/v1/org
// @ method POST
const CreateBudget = asyncWrapper(
	async (req: AuthenticatedRequest, res: Response) => {
		const user = req.user?.userId;
		const { title, date, items, organization } = req.body;

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
	}
);

// @ Update Budget
// @ endpoint /api/v1/budget/:id
// @ method PATCH
const UpdateBudget = asyncWrapper(
	async (req: AuthenticatedRequest, res: Response) => {
		const user = req.user?.userId;
		const { id: budgetId } = req.params;
		const { title, date, items, organization } = req.body;

		const budget = await Budget.findOne({ _id: budgetId, user: user });

		if (!budget) {
			throw new CustomError.NotFoundError(`No budget with id : ${budgetId}`);
		}

		budget.title = title || budget.title;
		budget.date = date || budget.date;
		budget.items = items || budget.items;
		budget.organization = organization || budget.organization;

		await budget.save();

		res
			.status(StatusCodes.OK)
			.json({ success: true, msg: 'Budget updated successful', budget });
	}
);

// @ Update Budget
// @ endpoint /api/v1/budget/:id
// @ method DELETE
const DeleteBudget = asyncWrapper(
	async (req: AuthenticatedRequest, res: Response) => {
		const user = req.user?.userId;
		const { id: budgetId } = req.params;
		const budget = await Budget.findOneAndDelete({ _id: budgetId, user: user });
		if (!budget) {
			throw new CustomError.NotFoundError(`No budget with id : ${budgetId}`);
		}
		res
			.status(StatusCodes.OK)
			.json({ success: true, msg: 'Budget deleted successful' });
	}
);

export {
	CreateBudget,
	GetUserBudget,
	GetUserSingleBudget,
	GetUserOrgBudget,
	UpdateBudget,
	DeleteBudget,
};
