import mongoose, { Schema } from 'mongoose';
import { IToken } from '../types/models';

const TokenSchema = new Schema<IToken>(
	{
		refreshToken: {
			type: String,
			required: true,
		},
		ip: {
			type: String,
			required: true,
		},
		userAgent: {
			type: String,
			required: true,
		},
		isValid: {
			type: Boolean,
			default: true,
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.model<IToken>('Token', TokenSchema);
