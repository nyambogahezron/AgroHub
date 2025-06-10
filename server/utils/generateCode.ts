import crypto from 'crypto';

const generateCode = (): string => {
	const randomBytes = crypto.randomBytes(3);
	const sixDigitCode = parseInt(randomBytes.toString('hex'), 16) % 1000000;
	return sixDigitCode.toString().padStart(6, '0');
};

export default generateCode;
