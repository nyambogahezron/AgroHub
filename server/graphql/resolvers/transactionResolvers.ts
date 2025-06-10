// Placeholder resolver for transactions
// You can implement full resolvers later based on your controllers

const transactionResolvers = {
	Query: {
		getTransaction: async () => null,
		getAllTransactions: async () => [],
		getOrganizationTransactions: async () => [],
		getBudgetTransactions: async () => [],
	},
	Mutation: {
		createTransaction: async () => null,
		updateTransaction: async () => null,
		deleteTransaction: async () => ({ message: 'Not implemented yet' }),
	},
};

export default transactionResolvers;
