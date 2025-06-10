import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import typeDefs from './schemas';
import resolvers from './resolvers';
import { createContext } from './context';

export const setupApolloServer = async (app: any): Promise<void> => {
	// Create the schema
	const schema = makeExecutableSchema({
		typeDefs,
		resolvers,
	});

	// Create an Apollo server
	const server = new ApolloServer({
		schema,
		context: createContext,
		formatError: (error) => {
			// Customize error format if needed
			const message = error.message || 'An error occurred';
			const code = error.extensions?.code || 'INTERNAL_SERVER_ERROR';
			const statusCode = error.extensions?.statusCode || 500;

			return {
				message,
				code,
				statusCode,
			};
		},
		// Configure Apollo Server options
		introspection: true, // Enable introspection in all environments
		csrfPrevention: false, // Allow operations from sources other than graphQL playground
	});

	// Start the Apollo server
	await server.start();

	// Apply middleware to Express app
	server.applyMiddleware({
		app,
		path: '/graphql',
		cors: {
			origin: ['https://agro-hub-nine.vercel.app', 'http://localhost:3000'],
			credentials: true,
		},
	});

	console.log(
		`🚀 GraphQL server ready at http://localhost:${process.env.PORT || 5000}${
			server.graphqlPath
		}`
	);
};
