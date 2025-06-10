import { gql } from 'apollo-server-express';

const organizationTypeDefs = gql`
	extend type Query {
		getOrganization(id: ID!): Organization
		getAllOrganizations: [Organization]
		getUserOrganizations: [Organization]
	}

	extend type Mutation {
		createOrganization(
			name: String!
			email: String!
			phone: String!
			address: String!
		): Organization

		updateOrganization(
			id: ID!
			name: String
			email: String
			phone: String
			address: String
		): Organization

		deleteOrganization(id: ID!): MessageResponse
	}

	type Organization {
		_id: ID!
		user: ID!
		name: String!
		email: String!
		logo: String
		phone: String!
		address: String!
		createdAt: Date
		updatedAt: Date
	}
`;

export default organizationTypeDefs;
