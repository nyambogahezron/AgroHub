const mongoose = require('mongoose');

const BudgetScheme = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide user'],
  },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    required: [true, 'Please provide Organization'],
  },
  title: {
    type: String,
    required: [true, 'Please provide Title'],
  },
  amount: {
    type: Number,
    required: [true, 'Please provide Amount'],
  },
});

module.exports = mongoose.model('Budget', BudgetScheme);
