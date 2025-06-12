// This file creates a test server for testing purposes
import express from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import cookieParser from 'cookie-parser';
import { errorHandler } from '../middleware/errorHandler';
import { notFound } from '../middleware/notFound';

// Import routes
import authRoutes from '../routes/authRoutes';
import userRoutes from '../routes/userRoutes';
import organizationRoutes from '../routes/organizationRoutes';
import organizationUserRoutes from '../routes/organizationUserRoutes';
import budgetRoutes from '../routes/budgetRoutes';
import transactionRoutes from '../routes/transactionRoutes';
import productRoutes from '../routes/productRoutes';
import subscriptionRoutes from '../routes/subscriptionRoutes';
import notificationRoutes from '../routes/NotificationRoutes';

// Create Express app for testing
const createTestServer = async () => {
	const app = express();

	// Use JSON middleware
	app.use(express.json());
	app.use(cookieParser());

	// Setup routes
	app.use('/api/auth', authRoutes);
	app.use('/api/users', userRoutes);
	app.use('/api/organizations', organizationRoutes);
	app.use('/api/organization-users', organizationUserRoutes);
	app.use('/api/budgets', budgetRoutes);
	app.use('/api/transactions', transactionRoutes);
	app.use('/api/products', productRoutes);
	app.use('/api/subscriptions', subscriptionRoutes);
	app.use('/api/notifications', notificationRoutes);

	// Use error middleware
	app.use(notFound);
	app.use(errorHandler);

	return app;
};

// Create MongoDB Memory Server for isolated testing
export const setupTestDB = async () => {
	const mongoServer = await MongoMemoryServer.create();
	const mongoUri = mongoServer.getUri();

	await mongoose.connect(mongoUri);

	return {
		mongoServer,
		mongoUri,
	};
};

// Close MongoDB Memory Server
export const closeTestDB = async (mongoServer: MongoMemoryServer) => {
	await mongoose.disconnect();
	await mongoServer.stop();
};

export default createTestServer;
