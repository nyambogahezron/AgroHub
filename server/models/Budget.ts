import mongoose, { Schema, Document, Model, Types } from 'mongoose';
import { IBudget, IItem } from '../types/models';

interface IBudgetDocument extends Document {
	user: Types.ObjectId;
	organization: Types.ObjectId;
	title: string;
	amount: number;
	date: Date;
	items: IItem[];
}

// Define the methods interface
interface IBudgetMethods {
	calculateTotalAmount(): number;
}

// Define the model interface
type IBudgetModel = Model<IBudgetDocument, {}, IBudgetMethods>;

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

const BudgetSchema = new Schema<IBudgetDocument, IBudgetModel>(
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
			default: 0,
		},
		date: {
			type: Date,
			default: Date.now,
		},
		items: {
			type: [ItemSchema],
			default: [],
		},
	},
	{ timestamps: true }
);

// calculate total amount
BudgetSchema.methods.calculateTotalAmount = function (): number {
	const total = this.items.reduce(
		(sum: number, item: IItem) => sum + item.amount,
		0
	);
	this.amount = total;
	return total;
};

BudgetSchema.pre(
	'save',
	function (this: IBudgetDocument & IBudgetMethods, next) {
		this.calculateTotalAmount();
		next();
	}
);

BudgetSchema.pre('findOneAndUpdate', function (next) {
	const update = this.getUpdate() as { items?: IItem[] };
	if (update?.items) {
		const total = update.items.reduce(
			(sum: number, item: IItem) => sum + item.amount,
			0
		);
		(this as any).set({ amount: total });
	}
	next();
});

const Budget = mongoose.model<IBudgetDocument, IBudgetModel>(
	'Budget',
	BudgetSchema
);

export default Budget;
