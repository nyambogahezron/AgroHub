import dotenv from 'dotenv';
dotenv.config();
import 'express-async-errors';
import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import xss from 'xss-clean';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';

// Import models
import './models/Notification';

// Express app
const app: Express = express();
app.use(bodyParser.urlencoded({ extended: false }));

// Swagger setup
const swaggerDocument = YAML.load('./swagger.yaml');

// Database connection
import connectDB from './config/connectDB';

// Import routes
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import organizationRoutes from './routes/organizationRoutes';
import budgetRoutes from './routes/budgetRoutes';
import transactionRoutes from './routes/transactionRoutes';
import subscriptionRoutes from './routes/subscriptionRoutes';
import organizationUserRoutes from './routes/organizationUserRoutes';
import productRoutes from './routes/productRoutes';
import notificationRoutes from './routes/NotificationRoutes';

// Import middlewares
import notFoundMiddleware from './middleware/notFound';
import errorHandlerMiddleware from './middleware/errorHandler';
import asyncHandler from './middleware/asyncHandler';

// Middleware setup
app.set('trust proxy', 1);
app.use(helmet());
app.use(xss());
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
    <a href="/api-docs">API Documentation</a>`);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const corsOptions = {
	origin: ['https://agro-hub-nine.vercel.app', 'http://localhost:3000'],
	optionsSuccessStatus: 200,
	credentials: true,
};

app.use(cors(corsOptions));

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/org', organizationRoutes);
app.use('/api/v1/budget', budgetRoutes);
app.use('/api/v1/transaction', transactionRoutes);
app.use('/api/v1/sub', subscriptionRoutes);
app.use('/api/v1/org-user', organizationUserRoutes);
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/notifications', notificationRoutes);

// Error handling middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const startApp = async (): Promise<void> => {
	try {
		const mongoUrl = process.env.MONGO_URL as string;
		await connectDB(mongoUrl);
		app.listen(port, () => console.log(`Server is listen on port ${port}`));
	} catch (error) {
		console.log(error);
	}
};

startApp();
