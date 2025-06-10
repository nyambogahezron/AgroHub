"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const mailgen_1 = __importDefault(require("mailgen"));
async function sendAlertEmail({ email, message, title, subject, action, name, }) {
    const nodemailerConfig = {
        service: 'gmail',
        auth: {
            user: process.env.email,
            pass: process.env.pass,
        },
    };
    const mailGenerator = new mailgen_1.default({
        theme: 'default',
        product: {
            name: 'AgroHub',
            link: process.env.clientLink,
        },
    });
    // Create the email content using Mailgen
    const emailContent = {
        body: {
            name: name,
            intro: title,
            action: {
                instructions: message,
                button: {
                    color: '#22BC66',
                    text: 'Click Here',
                    link: action,
                },
            },
            outro: `If you have any questions, feel free to reach out to us.`,
        },
    };
    let mailBody = mailGenerator.generate(emailContent);
    let messageBody = {
        from: process.env.email,
        to: email,
        subject: subject,
        html: mailBody,
    };
    const transporter = nodemailer_1.default.createTransport(nodemailerConfig);
    try {
        await transporter.sendMail(messageBody);
        return { msg: 'Email send Successful' };
    }
    catch (error) {
        return { msg: 'Email not sent, something went wrong' };
    }
}
exports.default = sendAlertEmail;
