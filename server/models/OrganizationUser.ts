import mongoose, { Schema, Document, Model, Types } from 'mongoose';
import { IOrganizationUser } from '../types/models';

interface IOrganizationUserDocument extends Document {
	user: Types.ObjectId;
	organization: Types.ObjectId;
	name: string;
	email: string;
	phone: string;
	location: string;
	role: 'admin' | 'member';
	date: Date;
}

type IOrganizationUserModel = Model<IOrganizationUserDocument>;

const organizationUserSchema = new Schema<
	IOrganizationUserDocument,
	IOrganizationUserModel
>(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: [true, 'Please provide user'],
		},
		organization: {
			type: Schema.Types.ObjectId,
			ref: 'Organization',
			required: [true, 'Please provide organization'],
		},
		name: {
			type: String,
			required: [true, 'Please provide name'],
			trim: true,
		},
		email: {
			type: String,
			required: [true, 'Please provide email'],
			trim: true,
			lowercase: true,
		},
		phone: {
			type: String,
			required: [true, 'Please provide phone number'],
			trim: true,
		},
		location: {
			type: String,
			required: [true, 'Please provide location'],
			trim: true,
		},
		role: {
			type: String,
			enum: {
				values: ['admin', 'member'],
				message: '{VALUE} is not supported',
			},
			default: 'member',
		},
		date: {
			type: Date,
			default: Date.now,
		},
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

// Add indexes for better query performance
organizationUserSchema.index({ user: 1, organization: 1 }, { unique: true });
organizationUserSchema.index({ email: 1 });
organizationUserSchema.index({ role: 1 });

const OrganizationUser = mongoose.model<
	IOrganizationUserDocument,
	IOrganizationUserModel
>('OrganizationUser', organizationUserSchema);

export default OrganizationUser;
