"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pdfkit_1 = __importDefault(require("pdfkit"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const dataService_1 = require("./dataService");
async function sendMonthlyReports() {
    const users = await (0, dataService_1.getUsers)();
    const transactions = await (0, dataService_1.getTransactions)();
    const budgets = await (0, dataService_1.getBudgets)();
    users.forEach(user => {
        const doc = new pdfkit_1.default();
        let pdfBuffer = [];
        doc.on('data', (data) => pdfBuffer.push(data));
        doc.on('end', async () => {
            const pdfData = Buffer.concat(pdfBuffer);
            let transporter = nodemailer_1.default.createTransport({
                service: 'gmail',
                auth: {
                    user: 'your-email@gmail.com',
                    pass: 'your-email-password'
                }
            });
            let mailOptions = {
                from: 'your-email@gmail.com',
                to: user.email,
                subject: 'Monthly Report',
                text: 'Please find attached your monthly report.',
                attachments: [
                    {
                        filename: 'MonthlyReport.pdf',
                        content: pdfData
                    }
                ]
            };
            await transporter.sendMail(mailOptions);
        });
        doc.text(`Monthly Report for ${user.name}`);
        doc.text(`Transactions: ${JSON.stringify(transactions)}`);
        doc.text(`Budgets: ${JSON.stringify(budgets)}`);
        doc.end();
    });
}
// Note: You might want to call this from a scheduled job rather than immediately
// sendMonthlyReports();
exports.default = sendMonthlyReports;
