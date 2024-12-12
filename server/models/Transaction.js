const mongoose = require('mongoose');
const CustomError = require('../errors');
const sendAlertEmail = require('../utils/EmailAlert');
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

// check if the transaction exceed the budget

transactionSchema.pre('save', async function (next) {
  const budget = await mongoose.model('Budget').findById(this.budget);
  if (!budget) {
    throw CustomError.NotFoundError('Budget not found');
  }
  if (this.category === 'expense' && this.amount > budget.amount) {
    const user = await mongoose
      .model('User')
      .findById(budget.user || this.user);

    await sendAlertEmail({
      email: user.email,
      message: `You have exceeded the budget for '${this.title}' Budget
      the amount spent is ${this.amount} and the budget is ${budget.amount}
      Please take note of this and adjust.
      To review the budget, click .`,
      title: `Budget Exceeded`,
      subject: `Budget Exceeded`,
      action: process.env.clientLink,
      name: budget.user.name,
    });

    // create a notification
    await mongoose.model('Notification').create({
      user: budget.user._id,
      message: `You have exceeded the budget for ${this.title}
      the amount spent is ${this.amount} and the budget is ${budget.amount}
      Please take note of this and adjust.`,
    });
  }
  next();
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
