// This file contains integration tests for the AgroHub API
import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import { createTestUser, generateAuthToken } from './helpers';
import createTestServer, { setupTestDB, closeTestDB } from './testServer';
import { MongoMemoryServer } from 'mongodb-memory-server';
import User from '../models/User';
import Organization from '../models/organization';
import Transaction from '../models/Transaction';
import Budget from '../models/Budget';
import Product from '../models/Product';

let app: any;
let mongoServer: MongoMemoryServer;

describe('API Integration Tests', () => {
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

	// Clean up test data after each test
	afterEach(async () => {
		await Organization.deleteMany({});
		await User.deleteMany({});
		await Transaction.deleteMany({});
		await Budget.deleteMany({});
		await Product.deleteMany({});
	});

	describe('Full User Journey', () => {
		it('should register, create org, add budget, transaction, and product', async () => {
			// Step 1: Register a new user
			const newUser = {
				name: 'Integration Test User',
				email: 'integration@example.com',
				password: 'password123',
			};

			const registerRes = await request(app)
				.post('/api/auth/register')
				.send(newUser);

			expect(registerRes.statusCode).toBe(StatusCodes.CREATED);
			expect(registerRes.body).toHaveProperty('token');
			const token = registerRes.body.token;
			const userId = registerRes.body.user.id || registerRes.body.user._id;

			// Step 2: Create an organization
			const orgData = {
				name: 'Integration Test Org',
				description: 'Organization for integration testing',
			};

			const orgRes = await request(app)
				.post('/api/organizations')
				.set('Authorization', `Bearer ${token}`)
				.send(orgData);

			expect(orgRes.statusCode).toBe(StatusCodes.CREATED);
			expect(orgRes.body.organization).toHaveProperty('_id');
			const orgId = orgRes.body.organization._id;

			// Step 3: Create a budget
			const budgetData = {
				name: 'Test Budget',
				category: 'Farming',
				amount: 5000,
				organizationId: orgId,
			};

			const budgetRes = await request(app)
				.post('/api/budgets')
				.set('Authorization', `Bearer ${token}`)
				.send(budgetData);

			expect(budgetRes.statusCode).toBe(StatusCodes.CREATED);
			expect(budgetRes.body.budget).toHaveProperty('_id');
			const budgetId = budgetRes.body.budget._id;

			// Step 4: Add a transaction
			const transactionData = {
				title: 'Test Transaction',
				amount: 500,
				category: 'Seeds',
				type: 'expense',
				description: 'Purchased seeds',
				budgetId: budgetId,
				organizationId: orgId,
			};

			const transactionRes = await request(app)
				.post('/api/transactions')
				.set('Authorization', `Bearer ${token}`)
				.send(transactionData);

			expect(transactionRes.statusCode).toBe(StatusCodes.CREATED);
			expect(transactionRes.body.transaction).toHaveProperty('_id');

			// Step 5: Add a product
			const productData = {
				name: 'Test Product',
				description: 'A test agricultural product',
				price: 100,
				category: 'Seeds',
				organizationId: orgId,
			};

			const productRes = await request(app)
				.post('/api/products')
				.set('Authorization', `Bearer ${token}`)
				.send(productData);

			expect(productRes.statusCode).toBe(StatusCodes.CREATED);
			expect(productRes.body.product).toHaveProperty('_id');

			// Step 6: Verify the budget has been updated with the transaction
			const getBudgetRes = await request(app)
				.get(`/api/budgets/${budgetId}`)
				.set('Authorization', `Bearer ${token}`);

			expect(getBudgetRes.statusCode).toBe(StatusCodes.OK);
			// Check that the used amount has been updated correctly
			expect(getBudgetRes.body.budget.usedAmount).toBe(500);

			// Step 7: Get the organization details with associated data
			const getOrgRes = await request(app)
				.get(`/api/organizations/${orgId}`)
				.set('Authorization', `Bearer ${token}`);

			expect(getOrgRes.statusCode).toBe(StatusCodes.OK);
		});
	});

	describe('Error Handling', () => {
		it('should handle validation errors gracefully', async () => {
			// Create a test user
			const testUser = await createTestUser();
			const token = generateAuthToken(testUser);

			// Try to create an organization with missing required fields
			const invalidOrgData = {
				// Missing 'name' which is required
				description: 'Invalid org data',
			};

			const res = await request(app)
				.post('/api/organizations')
				.set('Authorization', `Bearer ${token}`)
				.send(invalidOrgData);

			expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
			expect(res.body).toHaveProperty('message');
		});

		it('should handle not found resources gracefully', async () => {
			// Create a test user
			const testUser = await createTestUser();
			const token = generateAuthToken(testUser);

			// Try to get a non-existent budget
			const res = await request(app)
				.get('/api/budgets/60d0fe4f5311236168a109ca') // Valid ObjectId that doesn't exist
				.set('Authorization', `Bearer ${token}`);

			expect(res.statusCode).toBe(StatusCodes.NOT_FOUND);
			expect(res.body).toHaveProperty('message');
		});
	});
});
