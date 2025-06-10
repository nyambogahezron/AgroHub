interface NodemailerConfig {
	service: string;
	auth: {
		user: string | undefined;
		pass: string | undefined;
	};
}

const nodemailerConfig: NodemailerConfig = {
	service: 'gmail',
	auth: {
		user: process.env.email,
		pass: process.env.pass,
	},
};

export default nodemailerConfig;
