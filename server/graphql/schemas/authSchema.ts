import { gql } from 'apollo-server-express';

const authTypeDefs = gql`
	extend type Mutation {
		register(name: String!, email: String!, password: String!): AuthResponse
		login(email: String!, password: String!): AuthResponse
		logout: MessageResponse
		verifyEmail(email: String!, verificationToken: String!): MessageResponse
		forgotPassword(email: String!): MessageResponse
		resetPassword(
			email: String!
			token: String!
			password: String!
		): MessageResponse
	}

	type AuthResponse {
		user: User!
		token: String
		refreshToken: String
	}
`;

export default authTypeDefs;
