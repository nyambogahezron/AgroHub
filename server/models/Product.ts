import mongoose, { Schema, Document, Model, Types } from 'mongoose';
import { IProduct } from '../types/models';

// Define the model interface that combines Document and IProduct
type IProductModel = Model<IProduct & Document>;

// Define the schema type with proper ObjectId handling
interface IProductSchema {
	user: Types.ObjectId;
	organization: Types.ObjectId;
	name: string;
	price: number;
	description: string;
	category: string;
	stock: number;
	imageUrl: string;
}

const productSchema = new Schema<IProductSchema & Document>(
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
			required: [true, 'Please provide product name'],
			trim: true,
			minlength: [3, 'Product name must be at least 3 characters long'],
			maxlength: [100, 'Product name cannot exceed 100 characters'],
		},
		price: {
			type: Number,
			required: [true, 'Please provide product price'],
			min: [0, 'Price cannot be negative'],
		},
		description: {
			type: String,
			required: [true, 'Please provide product description'],
			trim: true,
			minlength: [10, 'Description must be at least 10 characters long'],
			maxlength: [1000, 'Description cannot exceed 1000 characters'],
		},
		category: {
			type: String,
			required: [true, 'Please provide product category'],
			trim: true,
		},
		stock: {
			type: Number,
			required: [true, 'Please provide stock quantity'],
			min: [0, 'Stock cannot be negative'],
			default: 0,
		},
		imageUrl: {
			type: String,
			default: 'https://via.placeholder.com/150',
			trim: true,
		},
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

// Add indexes for better query performance
productSchema.index({ user: 1, organization: 1 });
productSchema.index({ category: 1 });
productSchema.index({ name: 'text', description: 'text' });

// Add a pre-save hook to ensure price and stock are numbers
productSchema.pre('save', function (this: IProductSchema & Document, next) {
	if (typeof this.price !== 'number' || isNaN(this.price)) {
		next(new Error('Price must be a valid number'));
	}
	if (typeof this.stock !== 'number' || isNaN(this.stock)) {
		next(new Error('Stock must be a valid number'));
	}
	next();
});

const Product = mongoose.model<IProductSchema & Document>(
	'Product',
	productSchema
);

export default Product;
