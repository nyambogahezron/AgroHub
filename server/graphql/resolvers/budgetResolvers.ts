// Placeholder resolver for budgets
// You can implement full resolvers later based on your controllers

const budgetResolvers = {
	Query: {
		getBudget: async () => null,
		getAllBudgets: async () => [],
		getOrganizationBudgets: async () => [],
	},
	Mutation: {
		createBudget: async () => null,
		updateBudget: async () => null,
		deleteBudget: async () => ({ message: 'Not implemented yet' }),
	},
};

export default budgetResolvers;
