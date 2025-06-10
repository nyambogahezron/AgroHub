import OrganizationUser from '../models/OrganizationUser';
import Organization from '../models/organization';
import * as CustomError from '../errors';
import asyncHandler from '../middleware/asyncHandler';
import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import path from 'path';

// @desc  Get all organization users
// @route GET /api/v1/organization-users
// @access Private

const getOrganizationUsers = asyncHandler(
	async (req: Request, res: Response) => {
		const user = req.user.userId;

		const users = await OrganizationUser.find({ user: user });

		if (!users) {
			throw new CustomError.NotFoundError('No organization users found');
		}

		res.status(StatusCodes.OK).json({ success: true, users: users });
	}
);

// @desc      Get single organization user
// @route     GET /api/v1/organization-users/:id
// @access    Private
const getOrganizationUserById = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const organizationUser = await OrganizationUser.findById(req.params.id);

		if (!organizationUser) {
			return next(
				new CustomError.NotFoundError(
					`Organization user not found with id of ${req.params.id}`
				)
			);
		}

		res.status(200).json({ success: true, data: organizationUser });
	}
);

// @desc  Create new organization user
// @route POST /api/v1/org-user
// @access Private
const createOrganizationUser = asyncHandler(
	async (req: Request, res: Response) => {
		const user = req.user.userId;

		const { organization, name, email, phone, location, role, date } = req.body;

		if (!organization) {
			throw new CustomError.BadRequestError('Invalid organization');
		}
		if (!name || !email || !phone || !location) {
			throw new CustomError.BadRequestError('Please provide all  fields');
		}

		const isOrgForUser = await Organization.findOne({
			user: user,
			_id: organization,
		});

		if (!isOrgForUser) {
			throw new CustomError.BadRequestError('Invalid organization');
		}

		const organizationUser = await OrganizationUser.create({
			user,
			organization,
			name,
			email,
			phone,
			location,
			role,
			date,
		});

		res.status(StatusCodes.CREATED).json({
			success: true,
			data: organizationUser,
		});
	}
);

// @desc  Update organization user
// @route PATCH /api/v1/org-user/:id
// @access Private
const updateOrganizationUser = asyncHandler(
	async (req: Request, res: Response) => {
		const user = req.user.userId;

		const { organization, name, email, phone, location, role, date } = req.body;

		if (!organization) {
			throw new CustomError.BadRequestError('Invalid organization');
		}

		const isOrgForUser = await Organization.findOne({
			user: user,
			_id: organization,
		});

		if (!isOrgForUser) {
			throw new CustomError.BadRequestError('Invalid organization');
		}

		const organizationUser = await OrganizationUser.findById(req.params.id);

		if (!organizationUser) {
			throw new CustomError.NotFoundError(
				`Organization user not found with id of ${req.params.id}`
			);
		}

		organizationUser.user = user || organizationUser.user;
		organizationUser.organization =
			organization || organizationUser.organization;
		organizationUser.name = name || organizationUser.name;
		organizationUser.email = email || organizationUser.email;
		organizationUser.phone = phone || organizationUser.phone;
		organizationUser.location = location || organizationUser.location;
		organizationUser.role = role || organizationUser.role;
		organizationUser.date = date || organizationUser.date;

		await organizationUser.save();

		res.status(200).json({ success: true, data: organizationUser });
	}
);

// @desc  Delete organization user
// @route DELETE /api/v1/org-user/:id
// @access Private
const deleteOrganizationUser = asyncHandler(
	async (req: Request, res: Response) => {
		const organizationUser = await OrganizationUser.findOne({
			_id: req.params.id,
			user: req.user.userId,
		});

		if (!organizationUser) {
			throw new CustomError.NotFoundError(
				`Organization user not found with id of ${req.params.id}`
			);
		}

		await organizationUser.deleteOne();

		res.status(200).json({ success: true, msg: 'Organization user deleted' });
	}
);

// @desc      Upload photo for organization user
// @route     PUT /api/v1/organization-users/:id/photo
// @access    Private
const organizationUserPhotoUpload = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const organizationUser = await OrganizationUser.findById(req.params.id);

		if (!organizationUser) {
			return next(
				new CustomError.NotFoundError(
					`Organization user not found with id of ${req.params.id}`
				)
			);
		}

		if (!req.files) {
			return next(new CustomError.BadRequestError(`Please upload a file`));
		}

		const file = req.files.file as any;

		// Make sure the image is a photo
		if (!file.mimetype.startsWith('image')) {
			return next(
				new CustomError.BadRequestError(`Please upload an image file`)
			);
		}

		// Check file size
		if (file.size > process.env.MAX_FILE_UPLOAD) {
			return next(
				new CustomError.BadRequestError(
					`Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`
				)
			);
		}

		// Create custom filename
		file.name = `photo_${organizationUser._id}${path.parse(file.name).ext}`;

		file.mv(
			`${process.env.FILE_UPLOAD_PATH}/${file.name}`,
			async (err: Error) => {
				if (err) {
					console.error(err);
					return next(
						new CustomError.InternalServerError(`Problem with file upload`)
					);
				}

				await OrganizationUser.findByIdAndUpdate(req.params.id, {
					photo: file.name,
				});

				res.status(200).json({
					success: true,
					data: file.name,
				});
			}
		);
	}
);

export {
	getOrganizationUsers,
	getOrganizationUserById,
	createOrganizationUser,
	updateOrganizationUser,
	deleteOrganizationUser,
	organizationUserPhotoUpload,
};
