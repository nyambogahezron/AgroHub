import mongoose, { Schema, Document, Model, Types } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import { IUser } from '../types/models';

// Define user role and subscription types
type UserRole = 'user' | 'admin';
type UserSubscription = 'free' | 'pro' | 'premium';

// Define the schema type with proper validation
interface IUserSchema {
	name: string;
	email: string;
	state: string | null;
	city: string | null;
	phone: string | null;
	role: UserRole;
	subscription: UserSubscription;
	password: string;
	verificationToken?: string;
	isVerified: boolean;
	verified?: Date;
	passwordToken?: string;
	passwordTokenExpirationDate?: Date;
}

// Define the methods interface
interface IUserMethods {
	comparePassword(enteredPassword: string): Promise<boolean>;
}

// Define the document interface that combines schema and methods
interface IUserDocument extends IUserSchema, Document, IUserMethods {}

// Define the model interface
type IUserModel = Model<IUserDocument>;

const UserSchema = new Schema<IUserDocument, IUserModel>(
	{
		name: {
			type: String,
			required: [true, 'Please provide name'],
			trim: true,
			minlength: [3, 'Name must be at least 3 characters long'],
			maxlength: [50, 'Name cannot exceed 50 characters'],
		},
		email: {
			type: String,
			unique: true,
			required: [true, 'Please provide email'],
			trim: true,
			lowercase: true,
			validate: {
				validator: function (value: string) {
					return validator.isEmail(value);
				},
				message: 'Please provide a valid email address',
			},
		},
		state: {
			type: String,
			trim: true,
			default: null,
		},
		city: {
			type: String,
			trim: true,
			default: null,
		},
		phone: {
			type: String,
			trim: true,
			default: null,
			validate: {
				validator: function (value: string | null) {
					if (!value) return true;
					return validator.isMobilePhone(value);
				},
				message: 'Please provide a valid phone number',
			},
		},
		role: {
			type: String,
			enum: {
				values: ['user', 'admin'],
				message: '{VALUE} is not a supported role',
			},
			default: 'user',
		},
		subscription: {
			type: String,
			enum: {
				values: ['free', 'pro', 'premium'],
				message: '{VALUE} is not a supported subscription plan',
			},
			default: 'free',
		},
		password: {
			type: String,
			required: [true, 'Please provide password'],
			minlength: [6, 'Password must be at least 6 characters long'],
			select: false, // Don't include password in queries by default
		},
		verificationToken: {
			type: String,
			select: false,
		},
		isVerified: {
			type: Boolean,
			default: false,
		},
		verified: {
			type: Date,
		},
		passwordToken: {
			type: String,
			select: false,
		},
		passwordTokenExpirationDate: {
			type: Date,
			select: false,
		},
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

// Add indexes for better query performance
UserSchema.index({ role: 1 });
UserSchema.index({ subscription: 1 });

// Encrypt password before save
UserSchema.pre('save', async function (this: IUserDocument, next) {
	if (!this.isModified('password')) return next();

	try {
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password, salt);
		next();
	} catch (error) {
		next(error instanceof Error ? error : new Error('Error hashing password'));
	}
});

// Compare password method
UserSchema.methods.comparePassword = async function (
	this: IUserDocument,
	enteredPassword: string
): Promise<boolean> {
	try {
		return await bcrypt.compare(enteredPassword, this.password);
	} catch (error) {
		throw new Error('Error comparing passwords');
	}
};

const User = mongoose.model<IUserDocument, IUserModel>('User', UserSchema);

export default User;
