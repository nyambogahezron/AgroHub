import * as CustomError from '../errors';
import Organization from '../models/organization';
import { StatusCodes } from 'http-status-codes';
import asyncWrapper from '../middleware/asyncHandler';
import { Request, Response } from 'express';
import { AuthenticatedRequestWithUser } from '../types/auth';

// @ Get User's Organization
// @ endpoint /api/v1/org/
// @ method GET
const GetUserOrganization = asyncWrapper<AuthenticatedRequestWithUser>(
	async (req, res) => {
		const user = req.user.userId;
		const organization = await Organization.find({ user: user });

		if (!organization) {
			throw new CustomError.NotFoundError('Organization not found');
		}

		res.status(StatusCodes.OK).json({ organization });
	}
);

// @ Get User's single Organization
// @ endpoint /api/v1/org/:id
// @ method GET
const GetSingleOrganization = asyncWrapper<AuthenticatedRequestWithUser>(
	async (req, res) => {
		const orgId = req.params.id;

		if (!orgId) {
			throw new CustomError.BadRequestError('Please provide organization id');
		}

		const organization = await Organization.findOne({ _id: req.params.id });

		if (!organization) {
			throw new CustomError.NotFoundError('Organization not found');
		}

		res.status(StatusCodes.OK).json({ organization });
	}
);

// @ Create Organization
// @ endpoint /api/v1/org
// @ method POST
const CreateOrganization = asyncWrapper<AuthenticatedRequestWithUser>(
	async (req, res) => {
		const user = req.user.userId;
		const { email, name, phone, address } = req.body;

		if (!email || !name || !phone || !address) {
			throw new CustomError.BadRequestError('Please provide all fields');
		}

		const org = await Organization.findOne({ email: email });

		if (org) {
			throw new CustomError.BadRequestError('Organization already exists');
		}
		const organization = await Organization.create({ user, ...req.body });

		if (!organization) {
			throw new CustomError.InternalServerError(
				'Organization could not be created'
			);
		}

		res.status(StatusCodes.CREATED).json({ organization });
	}
);

// @ Update Organization
// @ endpoint /api/v1/org/
// @ method PATCH
const UpdateOrganization = asyncWrapper<AuthenticatedRequestWithUser>(
	async (req, res) => {
		const { name, email, phone, address, logo } = req.body;
		const user = req.user.userId;
		const org = await Organization.findOne({ user: user, _id: req.params.id });

		if (!org) {
			throw new CustomError.NotFoundError('Organization not found');
		}

		org.name = name || org.name;
		org.email = email || org.email;
		org.phone = phone || org.phone;
		org.address = address || org.address;
		org.logo = logo || org.logo;

		await org.save();

		res.status(StatusCodes.OK).json({
			success: true,
			msg: 'Organization updated successfully',
			organization: org,
		});
	}
);

// @ Update Organization
// @ endpoint /api/v1/org/
// @ method DELETE
const DeleteOrganization = asyncWrapper<AuthenticatedRequestWithUser>(
	async (req, res) => {
		const orgId = req.params.id;
		const user = req.user.userId;

		if (!orgId) {
			throw new CustomError.BadRequestError('Please provide organization id');
		}

		const organization = await Organization.findOneAndDelete({
			_id: req.params.id,
			user: user,
		});

		if (!organization) {
			throw new CustomError.NotFoundError('Organization not found');
		}

		res
			.status(StatusCodes.OK)
			.json({ success: true, message: 'Organization deleted successfully' });
	}
);

export {
	CreateOrganization,
	GetUserOrganization,
	UpdateOrganization,
	DeleteOrganization,
	GetSingleOrganization,
};
