import mongoose, { Schema, Document, PopulatedDoc, Types } from 'mongoose';
import { ITransaction, IUser, IBudget } from '../types/models';
import * as CustomError from '../errors';
import sendAlertEmail from '../utils/EmailAlert';

// Extend the ITransaction interface to include populated fields
interface ITransactionWithPopulatedFields
	extends Omit<ITransaction, 'user' | 'budget'> {
	user: PopulatedDoc<IUser & Document>;
	budget: PopulatedDoc<IBudget & Document>;
}

interface ITransactionDocument extends Document {
	user: Types.ObjectId;
	organization: Types.ObjectId;
	budget: Types.ObjectId;
	title: string;
	amount: number;
	category: 'sales' | 'expense';
	description: string;
	transaction_date: Date;
	receipt: string;
}

const transactionSchema = new Schema<ITransactionDocument>(
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
		budget: {
			type: Schema.Types.ObjectId,
			ref: 'Budget',
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		amount: {
			type: Number,
			required: true,
		},
		category: {
			type: String,
			enum: ['sales', 'expense'],
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		transaction_date: {
			type: Date,
			required: true,
		},
		receipt: {
			type: String,
			default: 'default-receipt.jpg',
		},
	},
	{
		timestamps: true,
	}
);

// check if the transaction exceed the budget
transactionSchema.pre('save', async function (next) {
	try {
		const budget = await mongoose
			.model('Budget')
			.findById(this.budget)
			.populate('user');
		if (!budget) {
			throw new CustomError.NotFoundError('Budget not found');
		}

		if (this.category === 'expense' && this.amount > budget.amount) {
			const budgetUser = budget.user as IUser & Document;

			if (budgetUser) {
				await sendAlertEmail({
					email: budgetUser.email,
					message: `You have exceeded the budget for '${this.title}' Budget
					the amount spent is ${this.amount} and the budget is ${budget.amount}
					Please take note of this and adjust.
					To review the budget, click .`,
					title: `Budget Exceeded`,
					subject: `Budget Exceeded`,
					action: process.env.clientLink || '',
					name: budgetUser.name,
				});

				// create a notification
				await mongoose.model('Notification').create({
					user: budgetUser._id,
					message: `You have exceeded the budget for ${this.title}
					the amount spent is ${this.amount} and the budget is ${budget.amount}
					Please take note of this and adjust.`,
				});
			}
		}
		next();
	} catch (error) {
		next(error instanceof Error ? error : new Error('Unknown error'));
	}
});

const Transaction = mongoose.model<ITransactionDocument>(
	'Transaction',
	transactionSchema
);

export default Transaction;
