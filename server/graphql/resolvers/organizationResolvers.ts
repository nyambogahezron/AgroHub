import Organization from '../../models/organization';
import { StatusCodes } from 'http-status-codes';
import * as CustomError from '../../errors';
import { GraphQLContext } from '../types/context';
import {
	CreateOrganizationArgs,
	DeleteArgs,
	GetOrganizationArgs,
	UpdateOrganizationArgs,
} from '../types/args';

const organizationResolvers = {
	Query: {
		getOrganization: async (_: any, { id }: GetOrganizationArgs) => {
			if (!id) {
				throw new CustomError.BadRequestError('Please provide organization id');
			}

			const organization = await Organization.findOne({ _id: id });

			if (!organization) {
				throw new CustomError.NotFoundError(`No organization with id: ${id}`);
			}

			return organization;
		},

		getAllOrganizations: async () => {
			return await Organization.find({});
		},

		getUserOrganizations: async (_: any, __: any, { req }: GraphQLContext) => {
			if (!req.user) {
				throw new CustomError.UnauthenticatedError('You need to be logged in');
			}

			const user = req.user.userId;
			const organizations = await Organization.find({ user });

			return organizations;
		},
	},

	Mutation: {
		createOrganization: async (
			_: any,
			{ name, email, phone, address }: CreateOrganizationArgs,
			{ req }: GraphQLContext
		) => {
			if (!req.user) {
				throw new CustomError.UnauthenticatedError('You need to be logged in');
			}

			if (!email || !name || !phone || !address) {
				throw new CustomError.BadRequestError('Please provide all values');
			}

			const user = req.user.userId;

			const organization = await Organization.create({
				user,
				name,
				email,
				phone,
				address,
			});

			return organization;
		},

		updateOrganization: async (
			_: any,
			{ id, name, email, phone, address }: UpdateOrganizationArgs,
			{ req }: GraphQLContext
		) => {
			if (!req.user) {
				throw new CustomError.UnauthenticatedError('You need to be logged in');
			}

			if (!id) {
				throw new CustomError.BadRequestError('Please provide organization id');
			}

			const organization = await Organization.findOne({ _id: id });

			if (!organization) {
				throw new CustomError.NotFoundError(`No organization with id: ${id}`);
			}

			// Check if user is authorized to update this organization
			if (organization.user.toString() !== req.user.userId) {
				throw new CustomError.UnauthorizedError(
					'Not authorized to update this organization'
				);
			}

			if (name) organization.name = name;
			if (email) organization.email = email;
			if (phone) organization.phone = phone;
			if (address) organization.address = address;

			await organization.save();

			return organization;
		},

		deleteOrganization: async (
			_: any,
			{ id }: DeleteArgs,
			{ req }: GraphQLContext
		) => {
			if (!req.user) {
				throw new CustomError.UnauthenticatedError('You need to be logged in');
			}

			if (!id) {
				throw new CustomError.BadRequestError('Please provide organization id');
			}

			const organization = await Organization.findOne({ _id: id });

			if (!organization) {
				throw new CustomError.NotFoundError(`No organization with id: ${id}`);
			}

			// Check if user is authorized to delete this organization
			if (organization.user.toString() !== req.user.userId) {
				throw new CustomError.UnauthorizedError(
					'Not authorized to delete this organization'
				);
			}

			await Organization.findOneAndDelete({ _id: id });

			return { message: 'Organization deleted successfully' };
		},
	},
};

export default organizationResolvers;
