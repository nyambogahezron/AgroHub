// Placeholder resolver for notifications
// You can implement full resolvers later based on your controllers

const notificationResolvers = {
	Query: {
		getNotification: async () => null,
		getUserNotifications: async () => [],
		getUnreadNotifications: async () => [],
	},
	Mutation: {
		markNotificationAsRead: async () => null,
		markAllNotificationsAsRead: async () => ({
			message: 'Not implemented yet',
		}),
		deleteNotification: async () => ({ message: 'Not implemented yet' }),
	},
};

export default notificationResolvers;
