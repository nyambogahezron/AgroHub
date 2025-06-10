import { UserPayload } from './auth';

declare global {
	namespace Express {
		interface Request {
			user?: UserPayload;
			files?: {
				file?: Express.Multer.File;
				[key: string]: Express.Multer.File | Express.Multer.File[] | undefined;
			};
		}
	}
}
