# AgroHub API Testing Documentation

This document outlines the testing strategy and procedures for the AgroHub API server.

## Test Structure

The tests are organized into the following categories:

1. **Controller Tests** - Test each controller's functionality
2. **GraphQL Resolver Tests** - Test GraphQL queries and mutations
3. **Integration Tests** - Test the interaction between components
4. **Authentication Tests** - Specifically test authentication and authorization

## Testing Tools

- **Jest**: Main testing framework
- **Supertest**: HTTP assertions for API endpoints
- **MongoDB Memory Server**: In-memory MongoDB for isolated testing

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (development)
npm run test:watch

# Run specific test file
npm test -- tests/authController.test.ts

# Run tests with coverage report
npm test -- --coverage
```

## Creating New Tests

### Controller Tests

When creating tests for controllers, follow this pattern:

1. Import necessary dependencies
2. Create test data using helper functions from `tests/helpers.ts`
3. Test all controller methods
4. Test both successful and error scenarios
5. Clean up test data after tests

Example:

```typescript
import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import { createTestUser, generateAuthToken } from './helpers';
import createTestServer from './testServer';

describe('SomeController', () => {
	let app;

	beforeAll(async () => {
		app = await createTestServer();
	});

	it('should perform some action', async () => {
		// Arrange
		const testUser = await createTestUser();
		const token = generateAuthToken(testUser);

		// Act
		const res = await request(app)
			.post('/api/some-endpoint')
			.set('Authorization', `Bearer ${token}`)
			.send({ someData: 'value' });

		// Assert
		expect(res.statusCode).toBe(StatusCodes.OK);
		expect(res.body).toHaveProperty('expectedProperty');
	});
});
```

### GraphQL Tests

For GraphQL tests:

1. Set up an ApolloServer instance for testing
2. Test queries and mutations
3. Verify responses and error handling

## Authentication Testing

For endpoints requiring authentication:

1. Create a test user
2. Generate a valid token using the `generateAuthToken` helper
3. Include the token in the Authorization header
4. Test both authorized and unauthorized scenarios

## Mocking External Services

Use Jest's mocking capabilities to mock external services:

```typescript
// Example of mocking a service
jest.mock('../utils/sendEmail', () => ({
	sendEmail: jest.fn().mockResolvedValue({ success: true }),
}));
```

## Best Practices

1. Keep tests independent and isolated
2. Use descriptive test names
3. Test both success and error cases
4. Use helper functions for common setup tasks
5. Clean up after tests
6. Use MongoDB Memory Server for database tests

## Coverage Goals

- Controllers: 85%+ coverage
- GraphQL Resolvers: 85%+ coverage
- Models: 80%+ coverage
- Middleware: 90%+ coverage

Run the coverage report to identify areas needing additional testing.

## Continuous Integration

Tests are automatically run in the CI pipeline on each pull request and merge to main. PRs with failing tests or insufficient coverage will be rejected.
