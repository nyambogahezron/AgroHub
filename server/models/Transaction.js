const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organization',
      required: true,
    },
    budget: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Budget',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: ['sales', 'expense'],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    transaction_date: {
      type: Date,
      required: true,
    },
    receipt: {
      type: String,
      default: 'default-receipt.jpg',
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
