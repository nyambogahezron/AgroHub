import { Request, Response, NextFunction } from 'express';

type AsyncRequestHandler<T extends Request = Request> = (
	req: T,
	res: Response,
	next: NextFunction
) => Promise<any>;

const asyncHandler = <T extends Request>(fn: AsyncRequestHandler<T>) => {
	return async (req: T, res: Response, next: NextFunction) => {
		try {
			await fn(req, res, next);
		} catch (error) {
			next(error);
		}
	};
};

export default asyncHandler;
