import mongoose, { Schema, Document } from 'mongoose';
import { IBudget } from '../types/models';

interface IItem extends Document {
	name: string;
	amount: number;
}

interface IBudgetMethods {
	calculateTotalAmount(): number;
}

type IBudgetModel = IBudget & IBudgetMethods;

const ItemSchema = new Schema<IItem>({
	name: {
		type: String,
		required: [true, 'Please provide item name'],
		minlength: [3, 'Item name too short'],
		maxlength: [50, 'Item name too long'],
	},
	amount: {
		type: Number,
		required: [true, 'Please provide item amount'],
		min: [0, 'Amount cannot be negative'],
	},
});

const BudgetSchema = new Schema<IBudgetModel>(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: [true, 'Please provide user'],
		},
		organization: {
			type: Schema.Types.ObjectId,
			ref: 'Organization',
			required: [true, 'Please provide Organization'],
		},
		title: {
			type: String,
			required: [true, 'Please provide Title'],
		},
		amount: {
			type: Number,
		},
		date: {
			type: Date,
			default: '',
		},
		items: {
			type: [ItemSchema],
			default: [],
		},
	},
	{ timestamps: true }
);

// calculate total amount
BudgetSchema.methods.calculateTotalAmount = function (
	this: IBudgetModel
): number {
	let total = 0;
	this.items.forEach((item) => {
		total += item.amount;
	});
	this.amount = total;
	return total;
};

BudgetSchema.pre('save', function (next) {
	(this as IBudgetModel).calculateTotalAmount();
	next();
});

BudgetSchema.pre('findOneAndUpdate', function (next) {
	const update = this.getUpdate() as any;
	if (update.items) {
		let total = 0;
		update.items.forEach((item: IItem) => {
			total += item.amount;
		});
		update.amount = total;
	}
	next();
});

export default mongoose.model<IBudgetModel>('Budget', BudgetSchema);
