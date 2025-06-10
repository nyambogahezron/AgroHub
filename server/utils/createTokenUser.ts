import { IUser } from '../types/models';
import { UserPayload } from '../types/auth';

const createTokenUser = (user: IUser): UserPayload => {
	return {
		name: user.name,
		userId: user._id.toString(),
		role: user.role,
		email: user.email,
	};
};

export default createTokenUser;
