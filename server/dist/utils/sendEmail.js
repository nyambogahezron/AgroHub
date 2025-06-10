"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const mailgen_1 = __importDefault(require("mailgen"));
const sendVerificationEmail = async ({ name, email, verificationToken }) => {
    const nodemailerConfig = {
        service: 'gmail',
        auth: {
            user: process.env.email,
            pass: process.env.pass,
        },
    };
    const transporter = nodemailer_1.default.createTransport(nodemailerConfig);
    let MailGenerator = new mailgen_1.default({
        theme: 'default',
        product: {
            name: 'AgroHub',
            link: process.env.clientLink,
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
            outro: "Need help, or have questions? Just reply to this email, we'd love to help.",
        },
    };
    let mailBody = MailGenerator.generate(response);
    let message = {
        from: process.env.email,
        to: email,
        subject: 'Verification Code',
        html: mailBody,
    };
    try {
        await transporter.sendMail(message);
        return { msg: 'Email send Successful' };
    }
    catch (error) {
        return { msg: 'Email not sent, something went wrong' };
    }
};
exports.default = sendVerificationEmail;
