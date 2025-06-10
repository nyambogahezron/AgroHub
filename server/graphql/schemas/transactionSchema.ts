import { gql } from 'apollo-server-express';

const transactionTypeDefs = gql`
	extend type Query {
		getTransaction(id: ID!): Transaction
		getAllTransactions: [Transaction]
		getOrganizationTransactions(organizationId: ID!): [Transaction]
		getBudgetTransactions(budgetId: ID!): [Transaction]
	}

	extend type Mutation {
		createTransaction(
			organization: ID!
			budget: ID!
			title: String!
			amount: Float!
			category: String!
			description: String!
			transaction_date: Date!
		): Transaction

		updateTransaction(
			id: ID!
			title: String
			amount: Float
			category: String
			description: String
			transaction_date: Date
		): Transaction

		deleteTransaction(id: ID!): MessageResponse
	}

	type Transaction {
		_id: ID!
		user: ID!
		organization: ID!
		budget: ID!
		title: String!
		amount: Float!
		category: String!
		description: String!
		transaction_date: Date!
		receipt: String
		createdAt: Date
		updatedAt: Date
	}
`;

export default transactionTypeDefs;
