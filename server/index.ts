import dotenv from 'dotenv';
dotenv.config();
import 'express-async-errors';
import express, {
	Express,
	Request,
	Response,
	ErrorRequestHandler,
	RequestHandler,
} from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';

// Initialize Express app
const app: Express = express();

// Load swagger documentation
const swaggerDocument = YAML.load('./swagger.yaml');

import connectDB from './config/connectDB';

import { setupApolloServer } from './graphql/server';

import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import organizationRoutes from './routes/organizationRoutes';
import budgetRoutes from './routes/budgetRoutes';
import transactionRoutes from './routes/transactionRoutes';
import subscriptionRoutes from './routes/subscriptionRoutes';
import organizationUserRoutes from './routes/organizationUserRoutes';
import productRoutes from './routes/productRoutes';
import notificationRoutes from './routes/NotificationRoutes';

import notFoundMiddleware from './middleware/notFound';
import errorHandlerMiddleware from './middleware/errorHandler';

const corsOptions = {
	origin: ['https://agro-hub-nine.vercel.app', 'http://localhost:3000'],
	optionsSuccessStatus: 200,
	credentials: true,
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
	allowedHeaders: [
		'Content-Type',
		'Authorization',
		'X-Requested-With',
		'Accept',
		'Origin',
		'Apollo-Require-Preflight', // Required for Apollo Client
	],
};

app.use(cors(corsOptions));

app.set('trust proxy', 1);
app.use(
	helmet({
		contentSecurityPolicy:
			process.env.NODE_ENV === 'production' ? undefined : false,
	})
);
app.use(mongoSanitize());
app.use(
	rateLimit({
		windowMs: 15 * 60 * 1000,
		max: 100,
	})
);

app.use(bodyParser.urlencoded({ extended: true })); // allow form data
app.use(express.json()); // allow json data
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.JWT_SECRET));

app.get('/', (req: Request, res: Response) => {
	res.send(` AgroHub API is live. <br>
    <a href="/api-docs">REST API Documentation</a> <br>
    <a href="/graphql">GraphQL Playground</a>`);
});

// Simple diagnostic route to confirm GraphQL path is accessible
app.get('/graphql-status', (req: Request, res: Response) => {
	res.json({
		status: 'ok',
		message: 'GraphQL endpoint should be accessible at /graphql',
		timestamp: new Date().toISOString(),
	});
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/org', organizationRoutes);
app.use('/api/v1/budget', budgetRoutes);
app.use('/api/v1/transaction', transactionRoutes);
app.use('/api/v1/sub', subscriptionRoutes);
app.use('/api/v1/org-user', organizationUserRoutes);
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/notifications', notificationRoutes);

const port = parseInt(process.env.PORT || '5000', 10);

const startApp = async (): Promise<void> => {
	try {
		console.log('Starting AgroHub API server...');

		// Connect to database
		const mongoUrl = process.env.MONGO_URL as string;
		console.log('Connecting to MongoDB...');
		await connectDB(mongoUrl);
		console.log('Connected to MongoDB successfully');

		// Setup Apollo GraphQL server
		console.log('Setting up Apollo GraphQL server...');
		await setupApolloServer(app);
		console.log('GraphQL setup complete');

		// Apply error handling middleware after GraphQL setup
		app.use(notFoundMiddleware as unknown as RequestHandler);
		app.use(errorHandlerMiddleware as unknown as ErrorRequestHandler);

		// Start the Express server
		const server = app.listen(port, '0.0.0.0', () => {
			console.log(`🚀 Server is listening on http://localhost:${port}`);
			console.log(
				`📚 REST API docs available at http://localhost:${port}/api-docs`
			);
			console.log(
				`🔍 GraphQL playground available at http://localhost:${port}/graphql`
			);
		});

		// Add graceful shutdown
		process.on('SIGTERM', () => {
			console.log('SIGTERM received, shutting down gracefully');
			server.close(() => {
				console.log('Server closed');
				process.exit(0);
			});
		});
	} catch (error) {
		console.error('Error starting server:', error);
		process.exit(1);
	}
};

startApp();
