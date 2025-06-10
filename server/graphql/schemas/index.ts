import { gql } from 'apollo-server-express';
import userTypeDefs from './userSchema';
import authTypeDefs from './authSchema';
import organizationTypeDefs from './organizationSchema';
import budgetTypeDefs from './budgetSchema';
import transactionTypeDefs from './transactionSchema';
import productTypeDefs from './productSchema';
import subscriptionTypeDefs from './subscriptionSchema';
import notificationTypeDefs from './notificationSchema';
import organizationUserTypeDefs from './organizationUserSchema';

// Base schema that ties everything together
const baseTypeDefs = gql`
	type Query {
		_: Boolean
	}

	type Mutation {
		_: Boolean
	}

	scalar Date
`;

// Combine all schemas
export default [
	baseTypeDefs,
	userTypeDefs,
	authTypeDefs,
	organizationTypeDefs,
	budgetTypeDefs,
	transactionTypeDefs,
	productTypeDefs,
	subscriptionTypeDefs,
	notificationTypeDefs,
	organizationUserTypeDefs,
];
