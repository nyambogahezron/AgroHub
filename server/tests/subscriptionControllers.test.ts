// This file contains sample tests for the subscriptionControllers. Add more tests for each controller method.
import request from 'supertest';
import app from '../index';
import mongoose from 'mongoose';
import { StatusCodes } from 'http-status-codes';

// Mock data
const mockSubscription = {
	plan: 'premium',
	paymentMethod: 'paypal',
};

let authToken: string;

describe('Subscription Controllers', () => {
	beforeAll(async () => {
		// This is a placeholder for getting an auth token
		// In a real test, you would login and get a valid token
	});

	afterAll(async () => {
		// Clean up after all tests
		await mongoose.connection.close();
	});

	it('should return 401 for unauthorized subscription access', async () => {
		const res = await request(app).get('/api/subscriptions');

		expect(res.statusCode).toBe(StatusCodes.UNAUTHORIZED);
	});

	it.skip('should create a new subscription with valid token', async () => {
		// Skip until we have proper authentication setup for tests
		const res = await request(app)
			.post('/api/subscriptions')
			.set('Authorization', `Bearer ${authToken}`)
			.send(mockSubscription);

		expect(res.statusCode).toBe(StatusCodes.CREATED);
	});

	// Add more tests for each controller method
});
