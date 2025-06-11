import { Request, Response, NextFunction, RequestHandler } from 'express';

const graphqlCors = (req: Request, res: Response, next: NextFunction): void => {
	if (req.path.includes('/graphql')) {
		// Set required CORS headers for Apollo Studio
		res.header(
			'Access-Control-Allow-Origin',
			req.headers.origin || 'https://studio.apollographql.com'
		);
		res.header('Access-Control-Allow-Credentials', 'true');
		res.header(
			'Access-Control-Allow-Headers',
			'Origin, X-Requested-With, Content-Type, Accept, Authorization, Apollo-Require-Preflight'
		);
		res.header(
			'Access-Control-Allow-Methods',
			'GET, POST, PUT, DELETE, OPTIONS'
		);

		// Handle preflight requests
		if (req.method === 'OPTIONS') {
			res.status(200).end();
			return;
		}
	}

	next();
};

export default graphqlCors;
