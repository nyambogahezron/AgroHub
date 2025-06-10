import mongoose, { Schema } from 'mongoose';
import validator from 'validator';
import { IOrganization } from '../types/models';
import User from './User';
import CustomError from '../errors';

// Update the Organization interface in models.ts
const OrganizationSchema = new Schema<IOrganization>(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: [true, 'Please provide user'],
		},
		name: {
			type: String,
			required: [true, 'Please provide Name'],
			minlength: [3, 'Name too short'],
			maxlength: [50, 'Name too long'],
		},
		email: {
			type: String,
			unique: true,
			required: [true, 'Please provide email'],
			validate: {
				validator: validator.isEmail,
				message: 'Please provide valid email',
			},
		},
		logo: {
			type: String,
			default: '/images/org-default.jpg',
		},
		phone: {
			type: String,
			required: [true, 'Please provide phone number'],
			minlength: [10, 'Phone number too short'],
			maxlength: [15, 'Phone number too long'],
		},
		address: {
			type: String,
			required: [true, 'Please provide address'],
		},
	},
	{ timestamps: true }
);

// Pre-save hook to validate user reference
OrganizationSchema.pre('save', async function (next) {
	try {
		const user = await User.findById(this.user);
		if (!user) {
			throw new CustomError.BadRequestError('Invalid user ref');
		}
		next();
	} catch (error) {
		next(error instanceof Error ? error : new Error('Unknown error'));
	}
});

export default mongoose.model<IOrganization>(
	'Organization',
	OrganizationSchema
);
