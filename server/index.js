require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const xxs = require('xss-clean');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');

require('./models/Notification');

app.use(bodyParser.urlencoded({ extended: false }));

//swagger
const swaggerDocument = YAML.load('./swagger.yaml');

// database
const connectDB = require('./config/connectDB');

//routers
const authRoutes = require('./routes/authRoutes');
const userRouters = require('./routes/userRoutes');
const organizationRouters = require('./routes/organizationRoutes');
const budgetRouters = require('./routes/budgetRoutes');
const transactionRouters = require('./routes/transactionRoutes');
const subscriptionRouters = require('./routes/subscriptionRoutes');
const organizationUserRoutes = require('./routes/organizationUserRoutes');
const productRoutes = require('./routes/productRoutes');
const notificationRoutes = require('./routes/NotificationRoutes');

// middlewares
app.set('trust proxy', 1);
app.use(helmet());
app.use(xxs());
app.use(mongoSanitize());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

const notFoundMiddleware = require('./middleware/notFound');
const errorHandlerMiddleware = require('./middleware/errorHandler');
const asyncHandlerMiddleware = require('./middleware/asyncHandler');

app.use(bodyParser.urlencoded({ extended: true })); // allow form data
app.use(express.json()); // allow json data
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.JWT_SECRET));

app.get('/', (req, res) => {
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

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRouters);
app.use('/api/v1/org', organizationRouters);
app.use('/api/v1/budget', budgetRouters);
app.use('/api/v1/transaction', transactionRouters);
app.use('/api/v1/sub', subscriptionRouters);
app.use('/api/v1/org-user', organizationUserRoutes);
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/notifications', notificationRoutes);

// Error handling middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
app.use(asyncHandlerMiddleware);

const port = process.env.PORT || 5000;

const startApp = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => console.log(`Server is listen on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};
startApp();
