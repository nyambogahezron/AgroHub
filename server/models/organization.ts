import mongoose, { Schema, Document, Model, Types } from 'mongoose';
import validator from 'validator';
import { IOrganization } from '../types/models';
import User from './User';
import * as CustomError from '../errors';

// Define the schema type with proper ObjectId handling
interface IOrganizationSchema {
	user: Types.ObjectId;
	name: string;
	email: string;
	logo: string;
	phone: string;
	address: string;
}

// Define the methods interface
interface IOrganizationMethods {
	validateUser(): Promise<boolean>;
}

// Define the document interface that combines schema and methods
interface IOrganizationDocument
	extends IOrganizationSchema,
		Document,
		IOrganizationMethods {}

// Define the model interface
type IOrganizationModel = Model<IOrganizationDocument>;

const OrganizationSchema = new Schema<
	IOrganizationDocument,
	IOrganizationModel
>(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: [true, 'Please provide user'],
			index: true,
		},
		name: {
			type: String,
			required: [true, 'Please provide organization name'],
			trim: true,
			minlength: [3, 'Organization name must be at least 3 characters long'],
			maxlength: [50, 'Organization name cannot exceed 50 characters'],
		},
		email: {
			type: String,
			unique: true,
			required: [true, 'Please provide email'],
			trim: true,
			lowercase: true,
			validate: {
				validator: function (value: string) {
					return validator.isEmail(value);
				},
				message: 'Please provide a valid email address',
			},
		},
		logo: {
			type: String,
			default: '/images/org-default.jpg',
			trim: true,
		},
		phone: {
			type: String,
			required: [true, 'Please provide phone number'],
			trim: true,
			validate: {
				validator: function (value: string) {
					return validator.isMobilePhone(value);
				},
				message: 'Please provide a valid phone number',
			},
		},
		address: {
			type: String,
			required: [true, 'Please provide address'],
			trim: true,
			minlength: [5, 'Address must be at least 5 characters long'],
			maxlength: [200, 'Address cannot exceed 200 characters'],
		},
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

// Add indexes for better query performance
OrganizationSchema.index({ name: 'text' });

// Add method to validate user reference
OrganizationSchema.methods.validateUser = async function (
	this: IOrganizationDocument
): Promise<boolean> {
	const user = await User.findById(this.user);
	return !!user;
};

// Pre-save hook to validate user reference
OrganizationSchema.pre(
	'save',
	async function (this: IOrganizationDocument, next) {
		try {
			const isValid = await this.validateUser();
			if (!isValid) {
				throw new CustomError.BadRequestError('Invalid user reference');
			}
			next();
		} catch (error) {
			next(error instanceof Error ? error : new Error('Unknown error'));
		}
	}
);

// Pre-update hook to validate user reference
OrganizationSchema.pre('findOneAndUpdate', async function (next) {
	try {
		const update = this.getUpdate() as { user?: Types.ObjectId };
		if (update?.user) {
			const user = await User.findById(update.user);
			if (!user) {
				throw new CustomError.BadRequestError('Invalid user reference');
			}
		}
		next();
	} catch (error) {
		next(error instanceof Error ? error : new Error('Unknown error'));
	}
});

const Organization = mongoose.model<IOrganizationDocument, IOrganizationModel>(
	'Organization',
	OrganizationSchema
);

export default Organization;
