// This file sets up the test environment
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Setup mongoose for testing
beforeAll(async () => {
	const mongoURI =
		process.env.MONGO_URI_TEST ||
		process.env.MONGO_URI ||
		'mongodb://localhost:27017/agroHub_test';

	try {
		// Connect to MongoDB with a unique database name for testing
		await mongoose.connect(mongoURI);
		console.log('Connected to test database');
	} catch (error) {
		console.error('Error connecting to test database:', error);
		process.exit(1);
	}
});

// Close mongoose connection after all tests
afterAll(async () => {
	await mongoose.connection.close();
	console.log('Test database connection closed');
});

// Set test timeout (10 seconds)
jest.setTimeout(10000);
