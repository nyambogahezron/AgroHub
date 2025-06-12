// This file demonstrates advanced testing techniques and best practices
import { setupTestDB, closeTestDB } from './testServer';
import { MongoMemoryServer } from 'mongodb-memory-server';
import User from '../models/User';
import Transaction from '../models/Transaction';
import Budget from '../models/Budget';
import { createTokenUser } from '../utils/createTokenUser';
import { createTestUser } from './helpers';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';

// Mock dependencies
jest.mock('../utils/sendEmail', () => ({
	sendEmail: jest.fn().mockResolvedValue({ success: true }),
}));

jest.mock('../utils/EmailAlert', () => ({
	EmailAlert: jest.fn().mockImplementation(() => ({
		sendTransactionAlert: jest.fn().mockResolvedValue({ success: true }),
		sendBudgetAlert: jest.fn().mockResolvedValue({ success: true }),
		sendWelcomeEmail: jest.fn().mockResolvedValue({ success: true }),
	})),
}));

// Import mocked modules to use in tests
import { sendEmail } from '../utils/sendEmail';
import { EmailAlert } from '../utils/EmailAlert';

let mongoServer: MongoMemoryServer;

describe('Advanced Testing Techniques', () => {
	beforeAll(async () => {
		// Setup test database
		const testDB = await setupTestDB();
		mongoServer = testDB.mongoServer;
	});

	afterAll(async () => {
		// Close test database
		await closeTestDB(mongoServer);
	});

	afterEach(() => {
		// Clear all mock calls between tests
		jest.clearAllMocks();
	});

	describe('Mocking External Dependencies', () => {
		it('should mock email sending', async () => {
			// Setup
			const emailData = {
				to: 'test@example.com',
				subject: 'Test Subject',
				html: '<p>Test content</p>',
			};

			// Execute
			await sendEmail(emailData);

			// Assert
			expect(sendEmail).toHaveBeenCalledTimes(1);
			expect(sendEmail).toHaveBeenCalledWith(emailData);
		});

		it('should mock EmailAlert class methods', async () => {
			// Setup
			const emailAlert = new EmailAlert();
			const user = { name: 'Test User', email: 'test@example.com' };

			// Execute
			await emailAlert.sendWelcomeEmail(user);

			// Assert
			expect(emailAlert.sendWelcomeEmail).toHaveBeenCalledTimes(1);
			expect(emailAlert.sendWelcomeEmail).toHaveBeenCalledWith(user);
		});
	});

	describe('Database Transactions and Rollbacks', () => {
		it('should demonstrate transaction with commit', async () => {
			// Start a session
			const session = await mongoose.startSession();

			try {
				// Start a transaction
				session.startTransaction();

				// Create a test user within the transaction
				const testUser = await createTestUser();

				// Create a budget within the transaction
				const budget = await Budget.create(
					[
						{
							name: 'Transaction Test Budget',
							category: 'Test',
							amount: 1000,
							createdBy: testUser._id,
						},
					],
					{ session }
				);

				// Create a transaction within the transaction
				await Transaction.create(
					[
						{
							title: 'Transaction in DB Transaction',
							amount: 500,
							category: 'Test',
							type: 'expense',
							description: 'Test transaction',
							budgetId: budget[0]._id,
							createdBy: testUser._id,
						},
					],
					{ session }
				);

				// Commit the transaction
				await session.commitTransaction();

				// Verify outside the transaction
				const transactions = await Transaction.find({
					title: 'Transaction in DB Transaction',
				});

				expect(transactions.length).toBe(1);
			} catch (error) {
				// Abort the transaction on error
				await session.abortTransaction();
				throw error;
			} finally {
				// End the session
				session.endSession();
			}
		});

		it('should demonstrate transaction with rollback', async () => {
			// Start a session
			const session = await mongoose.startSession();

			try {
				// Start a transaction
				session.startTransaction();

				// Create a test user within the transaction
				const testUser = await createTestUser({
					email: 'rollback@example.com',
				});

				// Create a transaction that should be rolled back
				await Transaction.create(
					[
						{
							title: 'Transaction to Rollback',
							amount: 300,
							category: 'Test',
							type: 'expense',
							description: 'This should be rolled back',
							createdBy: testUser._id,
						},
					],
					{ session }
				);

				// Explicitly abort the transaction
				await session.abortTransaction();

				// Verify the transaction was not persisted
				const transactions = await Transaction.find({
					title: 'Transaction to Rollback',
				});

				expect(transactions.length).toBe(0);
			} finally {
				// End the session
				session.endSession();
			}
		});
	});

	describe('Error and Edge Case Testing', () => {
		it('should handle database validation errors', async () => {
			try {
				// Try to create a user with invalid email (missing @ symbol)
				await User.create({
					name: 'Invalid User',
					email: 'invalidemail.com', // Invalid email format
					password: 'password123',
				});

				// Should not reach here
				expect(true).toBe(false);
			} catch (error) {
				// Verify we got a validation error
				expect(error).toBeDefined();
				expect(error.name).toBe('ValidationError');
			}
		});

		it('should handle ObjectId validation errors', async () => {
			try {
				// Try to find by an invalid ObjectId format
				await Budget.findById('invalid-id');

				// Should not reach here
				expect(true).toBe(false);
			} catch (error) {
				// Verify we got a CastError
				expect(error).toBeDefined();
				expect(error.name).toBe('CastError');
			}
		});

		it('should handle empty result sets', async () => {
			// Find transactions with a criteria that shouldn't match anything
			const transactions = await Transaction.find({
				title: 'This Title Does Not Exist',
			});

			// Should return empty array, not null or undefined
			expect(transactions).toBeDefined();
			expect(Array.isArray(transactions)).toBe(true);
			expect(transactions.length).toBe(0);
		});
	});
});
