import { Document } from 'mongoose';

export interface IUser extends Document {
	name: string;
	email: string;
	state: string | null;
	city: string | null;
	phone: string | null;
	role: 'user' | 'admin';
	subscription: 'free' | 'pro' | 'premium';
	password: string;
	verificationToken?: string;
	isVerified: boolean;
	verified?: Date;
	passwordToken?: string;
	passwordTokenExpirationDate?: Date;
	comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IToken extends Document {
	refreshToken: string;
	ip: string;
	userAgent: string;
	isValid: boolean;
	user: IUser['_id'];
}

export interface IItem {
	name: string;
	amount: number;
}

export interface IBudget extends Document {
	user: string;
	organization: string;
	title: string;
	amount: number;
	date: Date;
	items: IItem[];
}

export interface INotification extends Document {
	user: string;
	message: string;
	read: boolean;
}

export interface IOrganization extends Document {
	user: string;
	name: string;
	email: string;
	logo: string;
	phone: string;
	address: string;
}

export interface IOrganizationUser extends Document {
	user: string;
	organization: string;
	name: string;
	email: string;
	phone: string;
	location: string;
	role: 'admin' | 'member';
	date: Date;
}

export interface IProduct extends Document {
	user: string;
	organization: string;
	name: string;
	price: number;
	description: string;
	category: string;
	stock: number;
	imageUrl: string;
}

export interface ISubscription extends Document {
	user: string;
	plan: 'free' | 'basic' | 'premium';
	price: number;
	status: 'active' | 'trial' | 'past_due' | 'canceled';
	start_date: Date;
	end_date: Date;
	stripe_id?: string | null;
	payPal_id?: string | null;
}

export interface ITransaction extends Document {
	user: string;
	organization: string;
	budget: string;
	title: string;
	amount: number;
	category: 'sales' | 'expense';
	description: string;
	transaction_date: Date;
	receipt: string;
}
