import authResolvers from './authResolvers';
import userResolvers from './userResolvers';
import organizationResolvers from './organizationResolvers';
import budgetResolvers from './budgetResolvers';
import transactionResolvers from './transactionResolvers';
import productResolvers from './productResolvers';
import subscriptionResolvers from './subscriptionResolvers';
import notificationResolvers from './notificationResolvers';
import organizationUserResolvers from './organizationUserResolvers';

// Custom scalar for Date
const dateScalar = {
	Date: {
		// Convert outgoing Date to ISO string for JSON
		serialize(value: Date) {
			return value.toISOString();
		},
		// Convert incoming ISO string to Date object
		parseValue(value: string) {
			return new Date(value);
		},
		// Check if the value is a valid date string
		parseLiteral(ast: any) {
			if (ast.kind === 'StringValue') {
				return new Date(ast.value);
			}
			return null;
		},
	},
};

// Health check resolver
const healthResolver = {
	Query: {
		health: () => ({
			status: 'ok',
			message: 'GraphQL server is running',
			timestamp: new Date(),
		}),
	},
};

// Combine all resolvers
export default [
	dateScalar,
	healthResolver,
	authResolvers,
	userResolvers,
	organizationResolvers,
	budgetResolvers,
	transactionResolvers,
	productResolvers,
	subscriptionResolvers,
	notificationResolvers,
	organizationUserResolvers,
];
