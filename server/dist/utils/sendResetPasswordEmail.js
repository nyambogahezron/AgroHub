"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const mailgen_1 = __importDefault(require("mailgen"));
const nodemailerConfig_1 = __importDefault(require("../config/nodemailerConfig"));
const sendResetPasswordEmail = async ({ name, email, token }) => {
    const transporter = nodemailer_1.default.createTransport(nodemailerConfig_1.default);
    let MailGenerator = new mailgen_1.default({
        theme: 'default',
        product: {
            name: 'AGROHUB',
            link: 'https://agrohub.vercel.app/',
        },
    });
    let response = {
        body: {
            name: name,
            intro: "Welcome to AgroHub ! We're very excited to have you on board.",
            action: {
                instructions: 'Enter the code below to reset your password:',
                button: {
                    color: '#22BC66',
                    text: token,
                },
            },
            outro: "Need help, or have questions? Just reply to this email, we'd love to help.",
        },
    };
    let mailBody = MailGenerator.generate(response);
    let message = {
        from: 'agrohubhelpdesk@gmail.com',
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
exports.default = sendResetPasswordEmail;
