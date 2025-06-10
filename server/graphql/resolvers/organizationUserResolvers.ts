// Placeholder resolver for organization users
// You can implement full resolvers later based on your controllers

const organizationUserResolvers = {
	Query: {
		getOrganizationUser: async () => null,
		getAllOrganizationUsers: async () => [],
	},
	Mutation: {
		createOrganizationUser: async () => null,
		updateOrganizationUser: async () => null,
		deleteOrganizationUser: async () => ({ message: 'Not implemented yet' }),
	},
};

export default organizationUserResolvers;
