import { Request, Response } from 'express';

const notFound = (req: Request, res: Response) =>
	res.status(404).send(`Route Not Found - ${req.originalUrl}`);

export default notFound;
