// This file contains tests for the userController
import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import { createTestUser, generateAuthToken } from './helpers';
import mongoose from 'mongoose';
import User from '../models/User';
import createTestServer, { setupTestDB, closeTestDB } from './testServer';
import { MongoMemoryServer } from 'mongodb-memory-server';

let app: any;
let mongoServer: MongoMemoryServer;

describe('User Controller', () => {
	beforeAll(async () => {
		// Setup test database
		const testDB = await setupTestDB();
		mongoServer = testDB.mongoServer;

		// Create test server
		app = await createTestServer();
	});

	afterAll(async () => {
		// Close test database
		await closeTestDB(mongoServer);
	});

	// Clean up test users after each test
	afterEach(async () => {
		await User.deleteMany({});
	});

	describe('Get User Profile', () => {
		it('should return 401 for unauthorized user profile access', async () => {
			const res = await request(app).get('/api/users/profile');

			expect(res.statusCode).toBe(StatusCodes.UNAUTHORIZED);
		});

		it('should return user profile with valid token', async () => {
			// Create test user
			const testUser = await createTestUser();
			const token = generateAuthToken(testUser);

			const res = await request(app)
				.get('/api/users/profile')
				.set('Authorization', `Bearer ${token}`);

			expect(res.statusCode).toBe(StatusCodes.OK);
			expect(res.body).toHaveProperty('user');
			expect(res.body.user.email).toBe(testUser.email);
		});
	});

	describe('Update User Profile', () => {
		it('should update user profile with valid token', async () => {
			// Create test user
			const testUser = await createTestUser();
			const token = generateAuthToken(testUser);

			const updatedProfile = {
				name: 'Updated Name',
				email: testUser.email,
			};

			const res = await request(app)
				.put('/api/users/profile')
				.set('Authorization', `Bearer ${token}`)
				.send(updatedProfile);

			expect(res.statusCode).toBe(StatusCodes.OK);
			expect(res.body.user.name).toBe(updatedProfile.name);
		});

		it('should not update profile with invalid data', async () => {
			// Create test user
			const testUser = await createTestUser();
			const token = generateAuthToken(testUser);

			const invalidProfile = {
				name: '', // Invalid empty name
				email: testUser.email,
			};

			const res = await request(app)
				.put('/api/users/profile')
				.set('Authorization', `Bearer ${token}`)
				.send(invalidProfile);

			expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
		});
	});

	// Add additional tests for other user controller methods
});
