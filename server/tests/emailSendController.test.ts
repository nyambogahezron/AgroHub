// This file contains tests for the EmailSendController
import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import { createTestUser, generateAuthToken } from './helpers';
import createTestServer, { setupTestDB, closeTestDB } from './testServer';
import { MongoMemoryServer } from 'mongodb-memory-server';
import User from '../models/User';

// Mock the sendEmail functionality
jest.mock('../utils/sendEmail', () => ({
	sendEmail: jest.fn().mockResolvedValue({ success: true }),
}));

let app: any;
let mongoServer: MongoMemoryServer;

describe('EmailSend Controller', () => {
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

	describe('Send Email', () => {
		it('should return 401 for unauthorized email sending', async () => {
			const mockEmailData = {
				to: 'recipient@example.com',
				subject: 'Test Email',
				text: 'This is a test email',
			};

			const res = await request(app)
				.post('/api/email/send')
				.send(mockEmailData);

			expect(res.statusCode).toBe(StatusCodes.UNAUTHORIZED);
		});

		it('should send an email with valid token and data', async () => {
			// Create test user with admin privileges
			const testUser = await createTestUser({
				role: 'admin',
			});
			const token = generateAuthToken(testUser);

			const mockEmailData = {
				to: 'recipient@example.com',
				subject: 'Test Email',
				text: 'This is a test email',
			};

			const res = await request(app)
				.post('/api/email/send')
				.set('Authorization', `Bearer ${token}`)
				.send(mockEmailData);

			// This will depend on your actual implementation
			// If your controller returns a success status
			expect(res.statusCode).toBe(StatusCodes.OK);
		});
	});
});
