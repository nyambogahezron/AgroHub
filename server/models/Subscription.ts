import mongoose, { Schema, Document, Model, Types } from 'mongoose';
import { ISubscription } from '../types/models';

// Define subscription plan types
type SubscriptionPlan = 'free' | 'basic' | 'premium';
type SubscriptionStatus = 'active' | 'trial' | 'past_due' | 'canceled';

// Define pricing constants
const SUBSCRIPTION_PRICES: Record<SubscriptionPlan, number> = {
	free: 0,
	basic: 10,
	premium: 22,
};

// Define the schema type with proper ObjectId handling
interface ISubscriptionSchema {
	user: Types.ObjectId;
	plan: SubscriptionPlan;
	price: number;
	status: SubscriptionStatus;
	start_date: Date;
	end_date: Date;
	stripe_id: string | null;
	payPal_id: string | null;
}

// Define the methods interface
interface ISubscriptionMethods {
	calculatePrice(): number;
	isActive(): boolean;
	daysRemaining(): number;
}

// Define the document interface that combines schema and methods
interface ISubscriptionDocument
	extends ISubscriptionSchema,
		Document,
		ISubscriptionMethods {}

// Define the model interface
type ISubscriptionModel = Model<ISubscriptionDocument>;

const subscriptionSchema = new Schema<
	ISubscriptionDocument,
	ISubscriptionModel
>(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: [true, 'Please provide user'],
			index: true,
		},
		plan: {
			type: String,
			enum: {
				values: ['free', 'basic', 'premium'],
				message: '{VALUE} is not a supported plan',
			},
			default: 'free',
		},
		price: {
			type: Number,
			default: 0,
			min: [0, 'Price cannot be negative'],
		},
		status: {
			type: String,
			enum: {
				values: ['active', 'trial', 'past_due', 'canceled'],
				message: '{VALUE} is not a supported status',
			},
			required: [true, 'Please provide subscription status'],
		},
		start_date: {
			type: Date,
			required: [true, 'Please provide start date'],
			default: Date.now,
		},
		end_date: {
			type: Date,
			required: [true, 'Please provide end date'],
			validate: {
				validator: function (this: ISubscriptionDocument, value: Date) {
					return value > this.start_date;
				},
				message: 'End date must be after start date',
			},
		},
		stripe_id: {
			type: String,
			default: null,
		},
		payPal_id: {
			type: String,
			default: null,
		},
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

// Add indexes for better query performance
subscriptionSchema.index({ user: 1, status: 1 });
subscriptionSchema.index({ end_date: 1 });

// Add methods
subscriptionSchema.methods.calculatePrice = function (
	this: ISubscriptionDocument
): number {
	const price = SUBSCRIPTION_PRICES[this.plan];
	this.price = price;
	return price;
};

subscriptionSchema.methods.isActive = function (
	this: ISubscriptionDocument
): boolean {
	const now = new Date();
	return (
		this.status === 'active' && now >= this.start_date && now <= this.end_date
	);
};

subscriptionSchema.methods.daysRemaining = function (
	this: ISubscriptionDocument
): number {
	const now = new Date();
	if (now > this.end_date) return 0;
	const diffTime = this.end_date.getTime() - now.getTime();
	return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

// Add pre-save hook to calculate price
subscriptionSchema.pre('save', function (this: ISubscriptionDocument, next) {
	try {
		this.calculatePrice();
		next();
	} catch (error) {
		next(error instanceof Error ? error : new Error('Unknown error'));
	}
});

const Subscription = mongoose.model<ISubscriptionDocument, ISubscriptionModel>(
	'Subscription',
	subscriptionSchema
);

export default Subscription;
