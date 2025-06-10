import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CustomAPIError } from '../errors/custom-api';

interface MongooseError extends Error {
	code?: number;
	keyValue?: Record<string, any>;
	errors?: Record<string, { message: string }>;
	kind?: string;
	value?: any;
}

const errorHandlerMiddleware = (
	err: MongooseError,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	// Default error
	let customError = {
		statusCode: (err as any).statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
		msg: err.message || 'Something went wrong try again later',
	};

	if (err instanceof CustomAPIError) {
		return res.status((err as any).statusCode).json({ msg: err.message });
	}

	if (err.name === 'ValidationError') {
		customError.msg = Object.values(err.errors || {})
			.map((item) => item.message)
			.join(',');
		customError.statusCode = StatusCodes.BAD_REQUEST;
	}

	if (err.code && err.code === 11000) {
		customError.msg = `Duplicate value entered for ${Object.keys(
			err.keyValue || {}
		)} field, please choose another value`;
		customError.statusCode = StatusCodes.BAD_REQUEST;
	}

	// Mongoose not found error
	if (err.name === 'CastError' && err.kind === 'ObjectId') {
		customError.msg = `No item found with id : ${err.value}`;
		customError.statusCode = StatusCodes.NOT_FOUND;
	}

	return res.status(customError.statusCode).json({
		msg: customError.msg,
		stack: process.env.NODE_ENV === 'production' ? null : err.stack,
	});
};

export default errorHandlerMiddleware;
