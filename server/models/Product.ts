import mongoose, { Schema } from 'mongoose';
import { IProduct } from '../types/models';

const productSchema = new Schema<IProduct>(
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
		price: {
			type: Number,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		stock: {
			type: Number,
			required: true,
		},
		imageUrl: {
			type: String,
			default: 'https://via.placeholder.com/150',
		},
	},
	{ timestamps: true }
);

export default mongoose.model<IProduct>('Product', productSchema);
