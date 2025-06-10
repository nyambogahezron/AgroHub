import { gql } from 'apollo-server-express';

const organizationUserTypeDefs = gql`
	extend type Query {
		getOrganizationUser(id: ID!): OrganizationUser
		getAllOrganizationUsers(organizationId: ID!): [OrganizationUser]
	}

	extend type Mutation {
		createOrganizationUser(
			organization: ID!
			name: String!
			email: String!
			phone: String!
			location: String!
			role: String!
			date: Date!
		): OrganizationUser

		updateOrganizationUser(
			id: ID!
			name: String
			email: String
			phone: String
			location: String
			role: String
			date: Date
		): OrganizationUser

		deleteOrganizationUser(id: ID!): MessageResponse
	}

	type OrganizationUser {
		_id: ID!
		user: ID!
		organization: ID!
		name: String!
		email: String!
		phone: String!
		location: String!
		role: String!
		date: Date!
		createdAt: Date
		updatedAt: Date
	}
`;

export default organizationUserTypeDefs;
