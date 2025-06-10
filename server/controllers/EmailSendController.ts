import asyncHandler from '../middleware/asyncHandler';
import { sendVerificationEmail } from '../utils';

const sendMail = async () => {
	await sendVerificationEmail({
		name: 'John Doe',
		email: 'bsclmr166422@spu.ac.ke',
		verificationToken: '12345',
	});
};

export default sendMail;
