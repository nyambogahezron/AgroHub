// Placeholder resolver for subscriptions
// You can implement full resolvers later based on your controllers

const subscriptionResolvers = {
	Query: {
		getSubscription: async () => null,
		getCurrentUserSubscription: async () => null,
	},
	Mutation: {
		createSubscription: async () => null,
		updateSubscription: async () => null,
		cancelSubscription: async () => ({ message: 'Not implemented yet' }),
	},
};

export default subscriptionResolvers;
