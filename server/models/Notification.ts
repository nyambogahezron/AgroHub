import mongoose, { Schema } from 'mongoose';
import { INotification } from '../types/models';

const notificationSchema = new Schema<INotification>(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		message: {
			type: String,
			required: true,
		},
		read: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

const Notification = mongoose.model<INotification>(
	'Notification',
	notificationSchema
);

export default Notification;
