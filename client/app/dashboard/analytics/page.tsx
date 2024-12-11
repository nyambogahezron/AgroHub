'use client';

import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Sales } from '@/components/dashboard/overview/sales';
import { Traffic } from '@/components/dashboard/overview/traffic';
import { useGlobalContext } from '@/context/GlobalProvider';
import { currencyFormatter } from '@/utils/currency-formatter';
import Button from '@mui/material/Button';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';

export default function Page(): React.JSX.Element {
  const {
    transactions,
    budgetData,
    users,
    organization: organizations,
  } = useGlobalContext();

  const totalExpenses = transactions
    .filter((transaction) => transaction.category === 'expense')
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalSales = transactions
    .filter((transaction) => transaction.category === 'sales')
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalProfit = currencyFormatter(totalSales - totalExpenses).toString();

  const generatePDFReport = async () => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(20);
    doc.text(' Report', 70, 20);

    doc.setFontSize(12);
    doc.text(`Total Sales: ${currencyFormatter(totalSales)}`, 10, 50);
    doc.text(`Total Expenses: ${currencyFormatter(totalExpenses)}`, 10, 60);
    doc.text(`Total Profit: ${totalProfit}`, 10, 70);

    let startY = 90;
    doc.setFontSize(14);
    doc.text('Users:', 10, startY);

    autoTable(doc, {
      head: [['Name', 'Email', 'Phone', 'Location', 'Role', 'Date']],
      body: users.map((user) => [
        user.name,
        user.email,
        user.phone,
        user.location,
        user.role,
        new Date(user.date).toLocaleDateString(),
      ]),
      startY: startY + 10,
      margin: { top: 10, bottom: 10 },
      theme: 'striped',
      styles: { fontSize: 10 },
    });

    budgetData.forEach((budget) => {
      doc.setFontSize(14);
      doc.text(`Budget Title: ${budget.title}`, 10, startY);
      doc.text(
        `Date: ${new Date(budget.date).toLocaleDateString()}`,
        10,
        startY + 10
      );

      autoTable(doc, {
        head: [['Item Name', 'Amount']],
        body: budget.items.map((item) => [
          item.name,
          currencyFormatter(item.amount),
        ]),
        startY: startY + 30,
        margin: { top: 10, bottom: 10 },
      });

      const totalBudgetAmount = currencyFormatter(budget.amount);

      doc.setFontSize(12);
      doc.text(`Total Budget Amount: ${totalBudgetAmount}`, 10, startY);
    });

    doc.setFontSize(14);
    doc.text('Transactions:', 10, startY);

    autoTable(doc, {
      head: [
        [
          'Title',
          'Amount',
          'Category',
          'Description',
          'Transaction Date',
          'Organization',
        ],
      ],
      body: transactions.map((transaction) => {
        const organization = organizations.find(
          (org) => org._id === transaction.organization
        );
        return [
          transaction.title,
          currencyFormatter(transaction.amount),
          transaction.category,
          transaction.description,
          new Date(transaction.transaction_date).toLocaleDateString(),
          organization ? organization.name : 'Unknown',
        ];
      }),
      startY: startY + 10,
      margin: { top: 10 },
    });

    autoTable(doc, {
      head: [['Name', 'ID']],
      body: organizations.map((org) => [org.name, org._id]),
      startY: startY + 10,
      margin: { top: 10 },
    });
    doc.setFontSize(14);
    doc.text('Organizations:', 10, startY);

    autoTable(doc, {
      head: [['Name', 'ID']],
      body: organizations.map((org) => [org.name, org._id]),
      startY: startY + 10,
      margin: { top: 10 },
    });

    doc.save('report.pdf');
  };

  return (
    <Box>
      <Grid item xs={12} className='p-3 mb-4'>
        <Button variant='contained' color='primary' onClick={generatePDFReport}>
          Generate Report
        </Button>
      </Grid>
      <Grid container spacing={3} className='px-3 py-2'>
        <Grid lg={8} xs={12}>
          <Sales sx={{ height: '100%' }} />
        </Grid>
        <Grid lg={4} md={6} xs={12}>
          <Traffic
            chartSeries={[totalExpenses, totalSales]}
            labels={['Expenses', 'Sales']}
            sx={{ height: '100%' }}
          />
        </Grid>

        <Grid item xs={12}>
          <Box>
            <h2>Budgets Overview</h2>
            {budgetData.map((budget) => (
              <Box key={budget.title} mb={4}>
                <h3>Budget Title: {budget.title}</h3>
                <p>Date: {new Date(budget.date).toLocaleDateString()}</p>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Item Name</TableCell>
                      <TableCell>Amount</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {budget.items.map((item) => (
                      <TableRow key={item.name}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{currencyFormatter(item.amount)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <p>Total Budget Amount: {currencyFormatter(budget.amount)}</p>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
