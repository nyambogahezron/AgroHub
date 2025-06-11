import { Request, Response, NextFunction } from 'express';

const notFound = (req: Request, res: Response, next: NextFunction) => {
	// Skip 404 for GraphQL routes which are handled by Apollo
	if (req.originalUrl.includes('/graphql')) {
		return next();
	}

	return res.status(404).send(`Route Not Found - ${req.originalUrl}`);
};

export default notFound;
