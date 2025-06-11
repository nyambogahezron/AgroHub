import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { Express } from 'express';
import typeDefs from './schemas';
import resolvers from './resolvers';
import { createContext } from './context';

export const setupApolloServer = async (app: Express): Promise<void> => {
	try {
		// Create schema with typeDefs and resolvers
		const schema = makeExecutableSchema({
			typeDefs,
			resolvers,
		});

		// Create ApolloServer instance
		const server = new ApolloServer({
			schema,
			context: createContext,
			formatError: (error) => {
				// Log errors for debugging
				console.error('GraphQL Error:', error);
				const message = error.message || 'An error occurred';
				const code = error.extensions?.code || 'INTERNAL_SERVER_ERROR';
				const statusCode = error.extensions?.statusCode || 500;

				return {
					message,
					code,
					statusCode,
				};
			},
			introspection: true, // Enable introspection in all environments
			csrfPrevention: false, // Allow operations from sources other than graphQL playground
		});

		// Start the Apollo Server
		await server.start();

		console.log('Apollo Server started successfully');

		// Apply Express middleware with specific path and CORS configuration
		server.applyMiddleware({
			app,
			path: '/graphql',
			// Use the existing CORS configuration from Express
			cors: false,
			// Ensure GraphQL routes are properly accessible
			bodyParserConfig: false,
		});

		console.log(
			`🚀 GraphQL server ready at http://localhost:${process.env.PORT || 5000}${
				server.graphqlPath
			}`
		);
	} catch (error) {
		console.error('Error setting up Apollo Server:', error);
		throw error;
	}
};
