import User from '../models/User';
import Transaction from '../models/Transaction';
import Budget from '../models/Budget';
import { IUser } from '../types/models';

// Functions to get data for reports

export const getUsers = async () => {
	try {
		return await User.find({});
	} catch (error) {
		console.error('Error fetching users:', error);
		return [];
	}
};

export const getTransactions = async () => {
	try {
		return await Transaction.find({});
	} catch (error) {
		console.error('Error fetching transactions:', error);
		return [];
	}
};

export const getBudgets = async () => {
	try {
		return await Budget.find({});
	} catch (error) {
		console.error('Error fetching budgets:', error);
		return [];
	}
};
