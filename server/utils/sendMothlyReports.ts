import PDFDocument from 'pdfkit';
import nodemailer from 'nodemailer';
import { getUsers, getTransactions, getBudgets } from './dataService';
import { IUser } from '../types/models';

// These interfaces should be defined in your types folder, but temporarily placing here
interface Transaction {
	_id: string;
	// Add other transaction properties
}

interface Budget {
	_id: string;
	// Add other budget properties
}

async function sendMonthlyReports(): Promise<void> {
	const users = (await getUsers()) as IUser[];
	const transactions = (await getTransactions()) as Transaction[];
	const budgets = (await getBudgets()) as Budget[];

	users.forEach((user) => {
		const doc = new PDFDocument();
		let pdfBuffer: Buffer[] = [];

		doc.on('data', (data: Buffer) => pdfBuffer.push(data));
		doc.on('end', async () => {
			const pdfData = Buffer.concat(pdfBuffer);

			let transporter = nodemailer.createTransport({
				service: 'gmail',
				auth: {
					user: 'your-email@gmail.com',
					pass: 'your-email-password',
				},
			});

			let mailOptions = {
				from: 'your-email@gmail.com',
				to: user.email,
				subject: 'Monthly Report',
				text: 'Please find attached your monthly report.',
				attachments: [
					{
						filename: 'MonthlyReport.pdf',
						content: pdfData,
					},
				],
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

export default sendMonthlyReports;
