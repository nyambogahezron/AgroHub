import { gql } from 'apollo-server-express';

const notificationTypeDefs = gql`
	extend type Query {
		getNotification(id: ID!): Notification
		getUserNotifications: [Notification]
		getUnreadNotifications: [Notification]
	}

	extend type Mutation {
		markNotificationAsRead(id: ID!): Notification
		markAllNotificationsAsRead: MessageResponse
		deleteNotification(id: ID!): MessageResponse
	}

	type Notification {
		_id: ID!
		user: ID!
		message: String!
		read: Boolean!
		createdAt: Date
		updatedAt: Date
	}
`;

export default notificationTypeDefs;
