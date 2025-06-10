import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';

interface VerificationEmailParams {
	name: string;
	email: string;
	verificationToken: string;
}

interface EmailResponse {
	msg: string;
}

const sendVerificationEmail = async ({
	name,
	email,
	verificationToken,
}: VerificationEmailParams): Promise<EmailResponse> => {
	const nodemailerConfig = {
		service: 'gmail',
		auth: {
			user: process.env.email,
			pass: process.env.pass,
		},
	};
	const transporter = nodemailer.createTransport(nodemailerConfig);

	let MailGenerator = new Mailgen({
		theme: 'default',
		product: {
			name: 'AgroHub',
			link: process.env.clientLink as string,
		},
	});

	let response = {
		body: {
			name: name,
			intro: "Welcome to AgroHub! We're very excited to have you on board.",
			action: {
				instructions: 'To get started, please enter the code below:',
				button: {
					color: '#22BC66',
					text: verificationToken,
				},
			},
			outro:
				"Need help, or have questions? Just reply to this email, we'd love to help.",
		},
	};

	let mailBody = MailGenerator.generate(response);

	let message = {
		from: process.env.email as string,
		to: email,
		subject: 'Verification Code',
		html: mailBody,
	};

	try {
		await transporter.sendMail(message);
		return { msg: 'Email send Successful' };
	} catch (error) {
		return { msg: 'Email not sent, something went wrong' };
	}
};

export default sendVerificationEmail;
