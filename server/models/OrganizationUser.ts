import mongoose, { Schema } from 'mongoose';
import { IOrganizationUser } from '../types/models';

const organizationUserSchema = new Schema<IOrganizationUser>(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		organization: {
			type: Schema.Types.ObjectId,
			ref: 'Organization',
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			required: true,
		},
		location: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			default: 'member',
			enum: ['admin', 'member'],
		},
		date: {
			type: Date,
			default: Date.now,
		},
	},
	{ timestamps: true }
);

export default mongoose.model<IOrganizationUser>(
	'OrganizationUser',
	organizationUserSchema
);
