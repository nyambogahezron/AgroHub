// Placeholder resolver for products
// You can implement full resolvers later based on your controllers

const productResolvers = {
	Query: {
		getProduct: async () => null,
		getAllProducts: async () => [],
		getOrganizationProducts: async () => [],
	},
	Mutation: {
		createProduct: async () => null,
		updateProduct: async () => null,
		deleteProduct: async () => ({ message: 'Not implemented yet' }),
	},
};

export default productResolvers;
