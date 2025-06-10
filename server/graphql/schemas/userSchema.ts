import { gql } from 'apollo-server-express';

const userTypeDefs = gql`
	extend type Query {
		getUser(id: ID!): User
		getCurrentUser: User
		getAllUsers: [User]
	}

	extend type Mutation {
		updateUser(
			name: String
			email: String
			state: String
			city: String
			phone: String
		): User
		updateUserPassword(
			oldPassword: String!
			newPassword: String!
		): MessageResponse
	}

	type User {
		_id: ID!
		name: String!
		email: String!
		state: String
		city: String
		phone: String
		role: String!
		subscription: String!
		isVerified: Boolean!
		verified: Date
	}

	type MessageResponse {
		message: String!
	}
`;

export default userTypeDefs;
