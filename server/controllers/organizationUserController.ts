import OrganizationUser from '../models/OrganizationUser';
import Organization from '../models/organization';
import * as CustomError from '../errors';
import asyncHandler from '../middleware/asyncHandler';
import { StatusCodes } from 'http-status-codes';
import { Response, NextFunction } from 'express';
import { AuthenticatedRequestWithUser } from '../types/auth';
import path from 'path';

// @desc  Get all organization users
// @route GET /api/v1/organization-users
// @access Private

const getOrganizationUsers = asyncHandler(
	async (req: AuthenticatedRequestWithUser, res: Response) => {
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
	async (
		req: AuthenticatedRequestWithUser,
		res: Response,
		next: NextFunction
	) => {
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

// @desc      Create organization user
// @route     POST /api/v1/organization-users
// @access    Private
const createOrganizationUser = asyncHandler(
	async (req: AuthenticatedRequestWithUser, res: Response) => {
		const user = req.user.userId;

		const organization = await Organization.findOne({ user: user });

		if (!organization) {
			throw new CustomError.NotFoundError('No organization found');
		}

		const organizationUser = await OrganizationUser.create({
			...req.body,
			user,
			organization: organization._id,
		});

		res.status(StatusCodes.CREATED).json({
			success: true,
			organizationUser,
		});
	}
);

// @desc      Update organization user
// @route     PATCH /api/v1/organization-users/:id
// @access    Private
const updateOrganizationUser = asyncHandler(
	async (req: AuthenticatedRequestWithUser, res: Response) => {
		const user = req.user.userId;

		const organizationUser = await OrganizationUser.findById(req.params.id);

		if (!organizationUser) {
			throw new CustomError.NotFoundError(
				`Organization user not found with id of ${req.params.id}`
			);
		}

		// Check if user is the owner of the organization
		const organization = await Organization.findOne({
			_id: organizationUser.organization,
			user: user,
		});

		if (!organization) {
			throw new CustomError.UnauthorizedError(
				'Not authorized to update this organization user'
			);
		}

		const updatedOrganizationUser = await OrganizationUser.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
				runValidators: true,
			}
		);

		res.status(StatusCodes.OK).json({
			success: true,
			organizationUser: updatedOrganizationUser,
		});
	}
);

// @desc      Delete organization user
// @route     DELETE /api/v1/organization-users/:id
// @access    Private
const deleteOrganizationUser = asyncHandler(
	async (req: AuthenticatedRequestWithUser, res: Response) => {
		const user = req.user.userId;

		const organizationUser = await OrganizationUser.findById(req.params.id);

		if (!organizationUser) {
			throw new CustomError.NotFoundError(
				`Organization user not found with id of ${req.params.id}`
			);
		}

		// Check if user is the owner of the organization
		const organization = await Organization.findOne({
			_id: organizationUser.organization,
			user: user,
		});

		if (!organization) {
			throw new CustomError.UnauthorizedError(
				'Not authorized to delete this organization user'
			);
		}

		await organizationUser.deleteOne();

		res.status(StatusCodes.OK).json({
			success: true,
			msg: 'Organization user deleted',
		});
	}
);

// @desc      Upload photo for organization user
// @route     PUT /api/v1/organization-users/:id/photo
// @access    Private
const organizationUserPhotoUpload = asyncHandler(
	async (
		req: AuthenticatedRequestWithUser,
		res: Response,
		next: NextFunction
	) => {
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
		const maxFileSize = process.env.MAX_FILE_UPLOAD || '15000';

		if (file.size > parseInt(maxFileSize)) {
			return next(
				new CustomError.BadRequestError(
					`Please upload an image less than ${maxFileSize}`
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
