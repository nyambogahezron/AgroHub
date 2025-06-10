import { gql } from 'apollo-server-express';

const budgetTypeDefs = gql`
	extend type Query {
		getBudget(id: ID!): Budget
		getAllBudgets: [Budget]
		getOrganizationBudgets(organizationId: ID!): [Budget]
	}

	extend type Mutation {
		createBudget(
			organization: ID!
			title: String!
			amount: Float!
			date: Date!
			items: [ItemInput]
		): Budget

		updateBudget(
			id: ID!
			title: String
			amount: Float
			date: Date
			items: [ItemInput]
		): Budget

		deleteBudget(id: ID!): MessageResponse
	}

	input ItemInput {
		name: String!
		amount: Float!
	}

	type Item {
		name: String!
		amount: Float!
	}

	type Budget {
		_id: ID!
		user: ID!
		organization: ID!
		title: String!
		amount: Float!
		date: Date!
		items: [Item]
		createdAt: Date
		updatedAt: Date
	}
`;

export default budgetTypeDefs;
