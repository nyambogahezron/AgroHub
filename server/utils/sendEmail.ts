import nodemailer, { Transporter } from 'nodemailer';
import Mailgen, { Content } from 'mailgen';
import * as CustomError from '../errors';

interface VerificationEmailParams {
	name: string;
	email: string;
	verificationToken: string;
}

interface EmailResponse {
	msg: string;
	success: boolean;
}

interface EmailConfig {
	service: string;
	auth: {
		user: string;
		pass: string;
	};
}

const createTransporter = (): Transporter => {
	const email = process.env.email;
	const pass = process.env.pass;

	if (!email || !pass) {
		throw new CustomError.BadRequestError('Email configuration is missing');
	}

	const config: EmailConfig = {
		service: 'gmail',
		auth: {
			user: email,
			pass: pass,
		},
	};

	return nodemailer.createTransport(config);
};

const createMailGenerator = () => {
	const clientLink = process.env.clientLink;
	if (!clientLink) {
		throw new CustomError.BadRequestError('Client link is missing');
	}

	return new Mailgen({
		theme: 'default',
		product: {
			name: 'AgroHub',
			link: clientLink,
		},
	});
};

const sendVerificationEmail = async ({
	name,
	email,
	verificationToken,
}: VerificationEmailParams): Promise<EmailResponse> => {
	try {
		const transporter = createTransporter();
		const MailGenerator = createMailGenerator();

		const response: Content = {
			body: {
				name,
				intro: "Welcome to AgroHub! We're very excited to have you on board.",
				action: {
					instructions: 'To get started, please enter the code below:',
					button: {
						color: '#22BC66',
						text: verificationToken,
						link: `${process.env.clientLink}/verify?token=${verificationToken}`,
					},
				},
				outro:
					"Need help, or have questions? Just reply to this email, we'd love to help.",
			},
		};

		const mailBody = MailGenerator.generate(response);
		const emailFrom = process.env.email;

		if (!emailFrom) {
			throw new CustomError.BadRequestError('Sender email is missing');
		}

		const message = {
			from: emailFrom,
			to: email,
			subject: 'Verification Code',
			html: mailBody,
		};

		await transporter.sendMail(message);
		return { msg: 'Email sent successfully', success: true };
	} catch (error) {
		if (error instanceof CustomError.BadRequestError) {
			throw error;
		}
		throw new CustomError.InternalServerError(
			'Failed to send verification email'
		);
	}
};

export default sendVerificationEmail;
