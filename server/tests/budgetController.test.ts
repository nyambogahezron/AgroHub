// This file contains sample tests for the budgetController. Add more tests for each controller method.
import request from 'supertest';
import app from '../index';

describe('Budget Controller', () => {
	it('should return 401 for unauthorized budget access', async () => {
		const res = await request(app).get('/api/budgets');
		expect(res.statusCode).toBe(401);
	});
});
