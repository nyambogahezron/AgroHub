// This file contains sample tests for the NotificationController. Add more tests for each controller method.
import request from 'supertest';
import app from '../index';
import mongoose from 'mongoose';
import { StatusCodes } from 'http-status-codes';

// Mock data
const mockNotification = {
	userId: '60d0fe4f5311236168a109ca', // Example MongoDB ObjectId
	message: 'Test notification message',
	type: 'alert',
};

let authToken: string;

describe('Notification Controller', () => {
	beforeAll(async () => {
		// This is a placeholder for getting an auth token
		// In a real test, you would login and get a valid token
	});

	afterAll(async () => {
		// Clean up after all tests
		await mongoose.connection.close();
	});

	it('should return 401 for unauthorized notification access', async () => {
		const res = await request(app).get('/api/notifications');

		expect(res.statusCode).toBe(StatusCodes.UNAUTHORIZED);
	});

	it.skip('should create a notification with valid token', async () => {
		// Skip until we have proper authentication setup for tests
		const res = await request(app)
			.post('/api/notifications')
			.set('Authorization', `Bearer ${authToken}`)
			.send(mockNotification);

		expect(res.statusCode).toBe(StatusCodes.CREATED);
	});

	// Add more tests for each controller method
});
