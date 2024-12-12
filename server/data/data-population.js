const fs = require('fs');
const path = require('path');
const Transaction = require('../models/Transaction');

const filePath = path.join(__dirname, 'data/transactions.json');
const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

Transaction.insertMany(jsonData)
  .then(() => {
    console.log('Data successfully inserted');
  })
  .catch((error) => {
    console.error('Error inserting data:', error);
  });
