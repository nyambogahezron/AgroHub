// This file contains test helper functions
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import User from '../models/User';

// Helper function to create a test user
export const createTestUser = async (userData = {}) => {
	const defaultUser = {
		name: 'Test User',
		email: 'test@example.com',
		password: 'password123',
		role: 'user',
	};

	const user = await User.create({ ...defaultUser, ...userData });
	return user;
};

// Helper function to generate an auth token for testing
export const generateAuthToken = (user: any) => {
	const token = jwt.sign(
		{ userId: user._id, role: user.role },
		process.env.JWT_SECRET || 'jwt-secret-for-testing',
		{ expiresIn: '1d' }
	);
	return token;
};

// Helper function to create test data
export const createTestData = async () => {
	// Create test data for various models as needed
	// Example: Create users, organizations, products, etc.
};

// Helper function to clean up test data
export const cleanupTestData = async () => {
	// Clean up test data after tests
	// Example: Delete all test users, organizations, products, etc.
};

// Generate a random MongoDB ObjectId
export const generateObjectId = () => new Types.ObjectId().toString();
