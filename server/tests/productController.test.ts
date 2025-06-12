// This file contains tests for the productController
import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import { createTestUser, generateAuthToken } from './helpers';
import createTestServer, { setupTestDB, closeTestDB } from './testServer';
import { MongoMemoryServer } from 'mongodb-memory-server';
import User from '../models/User';
import Organization from '../models/organization';
import Product from '../models/Product';

let app: any;
let mongoServer: MongoMemoryServer;

describe('Product Controller', () => {
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
		await Product.deleteMany({});
		await Organization.deleteMany({});
		await User.deleteMany({});
	});

	describe('Create Product', () => {
		it('should return 401 for unauthorized product creation', async () => {
			const res = await request(app)
				.post('/api/products')
				.send({ name: 'Test Product', price: 100 });
			expect(res.statusCode).toBe(StatusCodes.UNAUTHORIZED);
		});

		it('should create a product with valid token', async () => {
			// Create test user
			const testUser = await createTestUser();
			const token = generateAuthToken(testUser);

			// Create test organization
			const org = await Organization.create({
				name: 'Test Org',
				description: 'Test description',
				ownerId: testUser._id,
			});

			const mockProduct = {
				name: 'Test Product',
				description: 'This is a test product',
				price: 100,
				category: 'Seeds',
				organizationId: org._id,
			};

			const res = await request(app)
				.post('/api/products')
				.set('Authorization', `Bearer ${token}`)
				.send(mockProduct);

			expect(res.statusCode).toBe(StatusCodes.CREATED);
			expect(res.body.product).toHaveProperty('_id');
			expect(res.body.product.name).toBe(mockProduct.name);
			expect(res.body.product.price).toBe(mockProduct.price);
		});
	});

	describe('Get Products', () => {
		it('should return 401 for unauthorized products access', async () => {
			const res = await request(app).get('/api/products');

			expect(res.statusCode).toBe(StatusCodes.UNAUTHORIZED);
		});

		it('should return products for authenticated user', async () => {
			// Create test user
			const testUser = await createTestUser();
			const token = generateAuthToken(testUser);

			// Create test organization
			const org = await Organization.create({
				name: 'Test Org',
				description: 'Test description',
				ownerId: testUser._id,
			});

			// Create test products
			await Product.create({
				name: 'Product 1',
				description: 'Product 1 description',
				price: 100,
				category: 'Seeds',
				organizationId: org._id,
				createdBy: testUser._id,
			});

			await Product.create({
				name: 'Product 2',
				description: 'Product 2 description',
				price: 200,
				category: 'Fertilizers',
				organizationId: org._id,
				createdBy: testUser._id,
			});

			const res = await request(app)
				.get('/api/products')
				.set('Authorization', `Bearer ${token}`);

			expect(res.statusCode).toBe(StatusCodes.OK);
			expect(res.body.products).toBeInstanceOf(Array);
			expect(res.body.products.length).toBe(2);
		});
	});

	describe('Get Single Product', () => {
		it('should get a single product by ID', async () => {
			// Create test user
			const testUser = await createTestUser();
			const token = generateAuthToken(testUser);

			// Create test organization
			const org = await Organization.create({
				name: 'Test Org',
				description: 'Test description',
				ownerId: testUser._id,
			});

			// Create test product
			const product = await Product.create({
				name: 'Single Test Product',
				description: 'Test description',
				price: 150,
				category: 'Tools',
				organizationId: org._id,
				createdBy: testUser._id,
			});

			const res = await request(app)
				.get(`/api/products/${product._id}`)
				.set('Authorization', `Bearer ${token}`);

			expect(res.statusCode).toBe(StatusCodes.OK);
			expect(res.body.product).toHaveProperty('_id');
			expect(res.body.product.name).toBe('Single Test Product');
		});

		it('should return 404 for non-existent product', async () => {
			// Create test user
			const testUser = await createTestUser();
			const token = generateAuthToken(testUser);

			const res = await request(app)
				.get('/api/products/60d0fe4f5311236168a109ca') // Valid MongoDB ID that doesn't exist
				.set('Authorization', `Bearer ${token}`);

			expect(res.statusCode).toBe(StatusCodes.NOT_FOUND);
		});
	});

	describe('Update Product', () => {
		it('should update product with valid token and ownership', async () => {
			// Create test user
			const testUser = await createTestUser();
			const token = generateAuthToken(testUser);

			// Create test organization
			const org = await Organization.create({
				name: 'Test Org',
				description: 'Test description',
				ownerId: testUser._id,
			});

			// Create test product
			const product = await Product.create({
				name: 'Original Product Name',
				description: 'Original description',
				price: 100,
				category: 'Seeds',
				organizationId: org._id,
				createdBy: testUser._id,
			});

			const updatedData = {
				name: 'Updated Product Name',
				description: 'Updated description',
				price: 150,
			};

			const res = await request(app)
				.patch(`/api/products/${product._id}`)
				.set('Authorization', `Bearer ${token}`)
				.send(updatedData);

			expect(res.statusCode).toBe(StatusCodes.OK);
			expect(res.body.product.name).toBe(updatedData.name);
			expect(res.body.product.price).toBe(updatedData.price);
		});
	});

	describe('Delete Product', () => {
		it('should delete product with valid token and ownership', async () => {
			// Create test user
			const testUser = await createTestUser();
			const token = generateAuthToken(testUser);

			// Create test organization
			const org = await Organization.create({
				name: 'Test Org',
				description: 'Test description',
				ownerId: testUser._id,
			});

			// Create test product
			const product = await Product.create({
				name: 'Product To Delete',
				description: 'Will be deleted',
				price: 100,
				category: 'Seeds',
				organizationId: org._id,
				createdBy: testUser._id,
			});

			const res = await request(app)
				.delete(`/api/products/${product._id}`)
				.set('Authorization', `Bearer ${token}`);

			expect(res.statusCode).toBe(StatusCodes.OK);

			// Verify product was deleted
			const checkProduct = await Product.findById(product._id);
			expect(checkProduct).toBeNull();
		});
	});
});
