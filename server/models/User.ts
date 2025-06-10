import mongoose, { Schema } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import { IUser } from '../types/models';

const UserSchema = new Schema<IUser>(
	{
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
		state: {
			type: String,
			default: null,
		},
		city: {
			type: String,
			default: null,
		},
		phone: {
			type: String,
			default: null,
		},
		role: {
			type: String,
			enum: ['user', 'admin'],
			default: 'admin',
		},
		subscription: {
			type: String,
			enum: ['free', 'pro', 'premium'],
			default: 'free',
		},
		password: {
			type: String,
			required: [true, 'Please provide password'],
			minlength: [6, 'Password too short'],
		},
		verificationToken: String,
		isVerified: {
			type: Boolean,
			default: false,
		},
		verified: Date,
		passwordToken: {
			type: String,
		},
		passwordTokenExpirationDate: {
			type: Date,
		},
	},
	{ timestamps: true }
);

//encrypt passwords before save
UserSchema.pre('save', async function () {
	if (!this.isModified('password')) return;
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

// compare password
UserSchema.methods.comparePassword = async function (
	enteredPassword: string
): Promise<boolean> {
	const isMatch = await bcrypt.compare(enteredPassword, this.password);
	return isMatch;
};

export default mongoose.model<IUser>('User', UserSchema);
