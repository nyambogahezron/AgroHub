import { gql } from 'apollo-server-express';

const subscriptionTypeDefs = gql`
	extend type Query {
		getSubscription(id: ID!): Subscription
		getCurrentUserSubscription: Subscription
	}

	extend type Mutation {
		createSubscription(
			plan: String!
			price: Float!
			status: String!
			start_date: Date!
			end_date: Date!
			stripe_id: String
			payPal_id: String
		): Subscription

		updateSubscription(
			id: ID!
			plan: String
			price: Float
			status: String
			start_date: Date
			end_date: Date
			stripe_id: String
			payPal_id: String
		): Subscription

		cancelSubscription(id: ID!): MessageResponse
	}

	type Subscription {
		_id: ID!
		user: ID!
		plan: String!
		price: Float!
		status: String!
		start_date: Date!
		end_date: Date!
		stripe_id: String
		payPal_id: String
		createdAt: Date
		updatedAt: Date
	}
`;

export default subscriptionTypeDefs;
