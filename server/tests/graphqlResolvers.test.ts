// This file tests GraphQL queries and mutations
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from '../graphql/schemas';
import { resolvers } from '../graphql/resolvers';
import { createTestUser, generateAuthToken } from './helpers';
import User from '../models/User';
import { setupTestDB, closeTestDB } from './testServer';
import { MongoMemoryServer } from 'mongodb-memory-server';

let server: ApolloServer;
let mongoServer: MongoMemoryServer;
let testUser: any;
let authToken: string;

// Create authenticated and unauthenticated context functions
const createContext = (token?: string) => {
	if (!token) {
		return { user: null };
	}

	try {
		// In a real implementation, you would decode the token and get the user
		return { user: testUser };
	} catch (error) {
		return { user: null };
	}
};

describe('GraphQL API', () => {
	beforeAll(async () => {
		// Setup test database
		const testDB = await setupTestDB();
		mongoServer = testDB.mongoServer;

		// Create a test user
		testUser = await createTestUser();
		authToken = generateAuthToken(testUser);

		// Create Apollo Server instance
		server = new ApolloServer({
			typeDefs,
			resolvers,
			context: ({ req }: any) => {
				const token = req?.headers?.authorization?.split(' ')[1] || '';
				return createContext(token);
			},
		});

		await server.start();
	});

	afterAll(async () => {
		await server.stop();
		await closeTestDB(mongoServer);
	});

	// Clean up test data after each test
	afterEach(async () => {
		await User.deleteMany({});
	});

	describe('Auth Resolvers', () => {
		it('should not login with invalid credentials', async () => {
			const loginMutation = `
        mutation {
          login(email: "fake@example.com", password: "wrongpass") {
            user {
              id
              name
              email
            }
            token
          }
        }
      `;

			const response = await server.executeOperation({
				query: loginMutation,
			});

			expect(response.errors).toBeDefined();
		});

		it('should register a new user', async () => {
			const registerMutation = `
        mutation {
          register(
            name: "GraphQL Test User", 
            email: "graphql_test@example.com", 
            password: "password123"
          ) {
            user {
              name
              email
            }
            token
          }
        }
      `;

			const response = await server.executeOperation({
				query: registerMutation,
			});

			expect(response.errors).toBeUndefined();
			expect(response.data?.register).toHaveProperty('user');
			expect(response.data?.register).toHaveProperty('token');
			expect(response.data?.register.user.email).toBe(
				'graphql_test@example.com'
			);
		});
	});

	describe('User Resolvers', () => {
		it('should not allow fetching user data without authentication', async () => {
			const userQuery = `
        query {
          getCurrentUser {
            id
            name
            email
          }
        }
      `;

			const response = await server.executeOperation({
				query: userQuery,
			});

			expect(response.errors).toBeDefined();
		});

		it('should fetch user data with authentication', async () => {
			// Create a test user in the database
			const user = await createTestUser({
				name: 'GraphQL Auth User',
				email: 'graphql_auth@example.com',
			});

			const userQuery = `
        query {
          getCurrentUser {
            id
            name
            email
          }
        }
      `;

			const response = await server.executeOperation({
				query: userQuery,
				context: { user },
			});

			expect(response.errors).toBeUndefined();
			expect(response.data?.getCurrentUser).toHaveProperty('id');
			expect(response.data?.getCurrentUser.name).toBe(user.name);
			expect(response.data?.getCurrentUser.email).toBe(user.email);
		});
	});

	describe('Organization Resolvers', () => {
		it('should not allow creating an organization without authentication', async () => {
			const createOrgMutation = `
        mutation {
          createOrganization(
            name: "Test Org",
            description: "A test organization"
          ) {
            id
            name
            description
          }
        }
      `;

			const response = await server.executeOperation({
				query: createOrgMutation,
			});

			expect(response.errors).toBeDefined();
		});
	});

	// More tests for other resolver types can be added here
});
