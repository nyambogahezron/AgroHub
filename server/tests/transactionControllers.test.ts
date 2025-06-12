// This file contains sample tests for the transactionControllers. Add more tests for each controller method.
import request from 'supertest';
import app from '../index';
import mongoose from 'mongoose';
import { StatusCodes } from 'http-status-codes';

// Mock data
const mockTransaction = {
	title: 'Test Transaction',
	amount: 100,
	category: 'Test Category',
	type: 'income',
	description: 'Test description',
};

let authToken: string;

describe('Transaction Controllers', () => {
	// Before all tests, we should have a setup to get an auth token
	// This is a placeholder and should be implemented with actual login functionality

	beforeAll(async () => {
		// This is a placeholder for getting an auth token
		// In a real test, you would login and get a valid token
	});

	afterAll(async () => {
		// Clean up after all tests
		await mongoose.connection.close();
	});

	it('should return 401 for unauthorized transaction access', async () => {
		const res = await request(app).get('/api/transactions');

		expect(res.statusCode).toBe(StatusCodes.UNAUTHORIZED);
	});

	// Example of a test that would run with authentication
	it.skip('should create a new transaction with valid token', async () => {
		// Skip until we have proper authentication setup for tests
		const res = await request(app)
			.post('/api/transactions')
			.set('Authorization', `Bearer ${authToken}`)
			.send(mockTransaction);

		expect(res.statusCode).toBe(StatusCodes.CREATED);
		expect(res.body.transaction).toHaveProperty('_id');
	});

	// Add more tests for each controller method
});
