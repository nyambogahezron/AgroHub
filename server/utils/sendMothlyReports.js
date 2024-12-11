const PDFDocument = require('pdfkit');
const nodemailer = require('nodemailer');
const { getUsers, getTransactions, getBudgets } = require('./dataService');


async function sendMonthlyReports() {
    const users = await getUsers();
    const transactions = await getTransactions();
    const budgets = await getBudgets();

    users.forEach(user => {
        const doc = new PDFDocument();
        let pdfBuffer = [];

        doc.on('data', data => pdfBuffer.push(data));
        doc.on('end', async () => {
            const pdfData = Buffer.concat(pdfBuffer);

            let transporter = nodemailer.createTransport({
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

sendMonthlyReports();