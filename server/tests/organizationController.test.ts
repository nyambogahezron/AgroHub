// This file contains tests for the organizationController
import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import { createTestUser, generateAuthToken } from './helpers';
import createTestServer, { setupTestDB, closeTestDB } from './testServer';
import { MongoMemoryServer } from 'mongodb-memory-server';
import User from '../models/User';
import Organization from '../models/organization';

let app: any;
let mongoServer: MongoMemoryServer;

describe('Organization Controller', () => {
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
	});

	describe('Create Organization', () => {
		it('should return 401 for unauthorized organization access', async () => {
			const res = await request(app).get('/api/organizations');
			expect(res.statusCode).toBe(StatusCodes.UNAUTHORIZED);
		});

		it('should create an organization with valid token', async () => {
			// Create test user
			const testUser = await createTestUser();
			const token = generateAuthToken(testUser);

			const mockOrg = {
				name: 'Test Organization',
				description: 'This is a test organization',
			};

			const res = await request(app)
				.post('/api/organizations')
				.set('Authorization', `Bearer ${token}`)
				.send(mockOrg);

			expect(res.statusCode).toBe(StatusCodes.CREATED);
			expect(res.body.organization).toHaveProperty('_id');
			expect(res.body.organization.name).toBe(mockOrg.name);
		});
	});

	describe('Get Organizations', () => {
		it('should return organizations for authenticated user', async () => {
			// Create test user
			const testUser = await createTestUser();
			const token = generateAuthToken(testUser);

			// Create test organization for the user
			await Organization.create({
				name: 'Test Org 1',
				description: 'Test description',
				ownerId: testUser._id,
			});

			const res = await request(app)
				.get('/api/organizations')
				.set('Authorization', `Bearer ${token}`);

			expect(res.statusCode).toBe(StatusCodes.OK);
			expect(res.body.organizations).toBeInstanceOf(Array);
			expect(res.body.organizations.length).toBeGreaterThan(0);
		});
	});

	describe('Get Single Organization', () => {
		it('should get a single organization by ID', async () => {
			// Create test user
			const testUser = await createTestUser();
			const token = generateAuthToken(testUser);

			// Create test organization
			const org = await Organization.create({
				name: 'Single Test Org',
				description: 'Test description',
				ownerId: testUser._id,
			});

			const res = await request(app)
				.get(`/api/organizations/${org._id}`)
				.set('Authorization', `Bearer ${token}`);

			expect(res.statusCode).toBe(StatusCodes.OK);
			expect(res.body.organization).toHaveProperty('_id');
			expect(res.body.organization.name).toBe('Single Test Org');
		});

		it('should return 404 for non-existent organization', async () => {
			// Create test user
			const testUser = await createTestUser();
			const token = generateAuthToken(testUser);

			const res = await request(app)
				.get('/api/organizations/60d0fe4f5311236168a109ca') // Valid MongoDB ID that doesn't exist
				.set('Authorization', `Bearer ${token}`);

			expect(res.statusCode).toBe(StatusCodes.NOT_FOUND);
		});
	});

	describe('Update Organization', () => {
		it('should update organization with valid token and ownership', async () => {
			// Create test user
			const testUser = await createTestUser();
			const token = generateAuthToken(testUser);

			// Create test organization
			const org = await Organization.create({
				name: 'Original Name',
				description: 'Original description',
				ownerId: testUser._id,
			});

			const updatedData = {
				name: 'Updated Name',
				description: 'Updated description',
			};

			const res = await request(app)
				.patch(`/api/organizations/${org._id}`)
				.set('Authorization', `Bearer ${token}`)
				.send(updatedData);

			expect(res.statusCode).toBe(StatusCodes.OK);
			expect(res.body.organization.name).toBe(updatedData.name);
			expect(res.body.organization.description).toBe(updatedData.description);
		});
	});

	describe('Delete Organization', () => {
		it('should delete organization with valid token and ownership', async () => {
			// Create test user
			const testUser = await createTestUser();
			const token = generateAuthToken(testUser);

			// Create test organization
			const org = await Organization.create({
				name: 'Organization To Delete',
				description: 'Will be deleted',
				ownerId: testUser._id,
			});

			const res = await request(app)
				.delete(`/api/organizations/${org._id}`)
				.set('Authorization', `Bearer ${token}`);

			expect(res.statusCode).toBe(StatusCodes.OK);

			// Verify organization was deleted
			const checkOrg = await Organization.findById(org._id);
			expect(checkOrg).toBeNull();
		});
	});
});
