import mongoose, { Schema, Document, Model, Types } from 'mongoose';
import { INotification } from '../types/models';

// Define the schema type with proper ObjectId handling
interface INotificationSchema {
	user: Types.ObjectId;
	message: string;
	read: boolean;
}

// Define the model interface
type INotificationModel = Model<INotificationSchema & Document>;

const notificationSchema = new Schema<INotificationSchema & Document>(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: [true, 'Please provide user'],
			index: true,
		},
		message: {
			type: String,
			required: [true, 'Please provide notification message'],
			trim: true,
			minlength: [1, 'Message cannot be empty'],
			maxlength: [500, 'Message cannot exceed 500 characters'],
		},
		read: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

// Add compound index for user and read status for efficient querying
notificationSchema.index({ user: 1, read: 1 });

// Add a method to mark notification as read
notificationSchema.methods.markAsRead = async function (
	this: INotificationSchema & Document
): Promise<void> {
	this.read = true;
	await this.save();
};

const Notification = mongoose.model<INotificationSchema & Document>(
	'Notification',
	notificationSchema
);

export default Notification;
