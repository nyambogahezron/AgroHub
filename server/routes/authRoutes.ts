import express from 'express';
const router = express.Router();

import {
	register,
	login,
	logout,
	verifyEmail,
	forgotPassword,
	resetPassword,
} from '../controllers/authController';

router.post('/register', register);
router.post('/login', login);
router.delete('/logout', logout);
router.post('/verify-email', verifyEmail);
router.post('/reset-password', resetPassword);
router.post('/forgot-password', forgotPassword);

export default router;
