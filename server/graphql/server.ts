import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import typeDefs from './schemas';
import resolvers from './resolvers';
import { createContext } from './context';

export const setupApolloServer = async (app: any): Promise<void> => {
	try {
		const schema = makeExecutableSchema({
			typeDefs,
			resolvers,
		});

		const server = new ApolloServer({
			schema,
			context: createContext,
			formatError: (error) => {
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
			introspection: true,
			csrfPrevention: false,
		});

		await server.start();

		console.log('Apollo Server started successfully');

		server.applyMiddleware({
			app,
			path: '/graphql',
			cors: {
				origin: [
					'https://agro-hub-nine.vercel.app',
					'http://localhost:3000',
					'https://studio.apollographql.com',
				],
				credentials: true,
			},
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
