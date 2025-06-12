// This file contains tests for the authController.
import request from 'supertest';
import app from '../index';
import { StatusCodes } from 'http-status-codes';
import { createTestUser, generateAuthToken } from './helpers';
import mongoose from 'mongoose';
import User from '../models/User';

describe('Auth Controller', () => {
	// Clean up test data after all tests
	afterAll(async () => {
		await User.deleteMany({ email: /test@/ });
	});

	describe('Login', () => {
		it('should return 401 for invalid login credentials', async () => {
			const res = await request(app)
				.post('/api/auth/login')
				.send({ email: 'fake@example.com', password: 'wrongpass' });
			expect(res.statusCode).toBe(StatusCodes.UNAUTHORIZED);
		});

		it('should login successfully with valid credentials', async () => {
			// Create a test user
			const testUser = await createTestUser();

			const res = await request(app)
				.post('/api/auth/login')
				.send({ email: testUser.email, password: 'password123' });

			expect(res.statusCode).toBe(StatusCodes.OK);
			expect(res.body).toHaveProperty('token');
			expect(res.body).toHaveProperty('user');
		});
	});

	describe('Register', () => {
		it('should register a new user', async () => {
			const newUser = {
				name: 'New Test User',
				email: 'newtest@example.com',
				password: 'password123',
			};

			const res = await request(app).post('/api/auth/register').send(newUser);

			expect(res.statusCode).toBe(StatusCodes.CREATED);
			expect(res.body).toHaveProperty('token');
			expect(res.body).toHaveProperty('user');
			expect(res.body.user.name).toBe(newUser.name);
			expect(res.body.user.email).toBe(newUser.email);
		});

		it('should return 400 for duplicate email', async () => {
			const existingUser = await createTestUser({
				email: 'duplicate@example.com',
			});

			const res = await request(app).post('/api/auth/register').send({
				name: 'Duplicate User',
				email: existingUser.email,
				password: 'password123',
			});

			expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
		});
	});

	// Add more tests for other auth controller methods
});
