import { IUser } from '../types/models';
import { UserPayload } from '../types/auth';
import { Document } from 'mongoose';

// Extend IUser to include Document properties
type IUserWithDocument = IUser & Document;

const createTokenUser = (user: IUserWithDocument): UserPayload => {
	if (!user._id) {
		throw new Error('User document must have an _id');
	}

	return {
		name: user.name,
		userId: user._id.toString(),
		role: user.role,
		email: user.email,
	};
};

export default createTokenUser;
