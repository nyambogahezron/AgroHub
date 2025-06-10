import { gql } from 'apollo-server-express';

const productTypeDefs = gql`
	extend type Query {
		getProduct(id: ID!): Product
		getAllProducts: [Product]
		getOrganizationProducts(organizationId: ID!): [Product]
	}

	extend type Mutation {
		createProduct(
			organization: ID!
			name: String!
			price: Float!
			description: String!
			category: String!
			stock: Int!
		): Product

		updateProduct(
			id: ID!
			name: String
			price: Float
			description: String
			category: String
			stock: Int
		): Product

		deleteProduct(id: ID!): MessageResponse
	}

	type Product {
		_id: ID!
		user: ID!
		organization: ID!
		name: String!
		price: Float!
		description: String!
		category: String!
		stock: Int!
		imageUrl: String
		createdAt: Date
		updatedAt: Date
	}
`;

export default productTypeDefs;
