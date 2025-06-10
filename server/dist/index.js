"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const xss_clean_1 = __importDefault(require("xss-clean"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const helmet_1 = __importDefault(require("helmet"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const yamljs_1 = __importDefault(require("yamljs"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
// Import models
require("./models/Notification");
// Express app
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: false }));
// Swagger setup
const swaggerDocument = yamljs_1.default.load('./swagger.yaml');
// Database connection
const connectDB_1 = __importDefault(require("./config/connectDB"));
// Import routes
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const organizationRoutes_1 = __importDefault(require("./routes/organizationRoutes"));
const budgetRoutes_1 = __importDefault(require("./routes/budgetRoutes"));
const transactionRoutes_1 = __importDefault(require("./routes/transactionRoutes"));
const subscriptionRoutes_1 = __importDefault(require("./routes/subscriptionRoutes"));
const organizationUserRoutes_1 = __importDefault(require("./routes/organizationUserRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const NotificationRoutes_1 = __importDefault(require("./routes/NotificationRoutes"));
// Import middlewares
const notFound_1 = __importDefault(require("./middleware/notFound"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
// Middleware setup
app.set('trust proxy', 1);
app.use((0, helmet_1.default)());
app.use((0, xss_clean_1.default)());
app.use((0, express_mongo_sanitize_1.default)());
app.use((0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
}));
app.use(body_parser_1.default.urlencoded({ extended: true })); // allow form data
app.use(express_1.default.json()); // allow json data
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)(process.env.JWT_SECRET));
app.get('/', (req, res) => {
    res.send(` AgroHub API is live. <br>
    <a href="/api-docs">API Documentation</a>`);
});
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
const corsOptions = {
    origin: ['https://agro-hub-nine.vercel.app', 'http://localhost:3000'],
    optionsSuccessStatus: 200,
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
// Routes
app.use('/api/v1/auth', authRoutes_1.default);
app.use('/api/v1/users', userRoutes_1.default);
app.use('/api/v1/org', organizationRoutes_1.default);
app.use('/api/v1/budget', budgetRoutes_1.default);
app.use('/api/v1/transaction', transactionRoutes_1.default);
app.use('/api/v1/sub', subscriptionRoutes_1.default);
app.use('/api/v1/org-user', organizationUserRoutes_1.default);
app.use('/api/v1/product', productRoutes_1.default);
app.use('/api/v1/notifications', NotificationRoutes_1.default);
// Error handling middleware
app.use(notFound_1.default);
app.use(errorHandler_1.default);
const port = process.env.PORT || 5000;
const startApp = async () => {
    try {
        const mongoUrl = process.env.MONGO_URL;
        await (0, connectDB_1.default)(mongoUrl);
        app.listen(port, () => console.log(`Server is listen on port ${port}`));
    }
    catch (error) {
        console.log(error);
    }
};
startApp();
