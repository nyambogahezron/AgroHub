const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide item name'],
    minlength: [3, 'Item name too short'],
    maxlength: [50, 'Item name too long'],
  },
  amount: {
    type: Number,
    required: [true, 'Please provide item amount'],
    min: [0, 'Amount cannot be negative'],
  },
});

const BudgetScheme = new mongoose.Schema(
  {
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
    },
    date: {
      type: Date,
      default: '',
    },
    items: {
      type: [ItemSchema],
      default: [],
    },
  },
  { timestamps: true }
);

// calculate total amount
BudgetScheme.methods.calculateTotalAmount = function () {
  let total = 0;
  this.items.forEach((item) => {
    total += item.amount;
  });
  this.amount = total;
  return total;
};

BudgetScheme.pre('save', function (next) {
  this.calculateTotalAmount();
  next();
});

BudgetScheme.pre('findOneAndUpdate', function (next) {
  if (this._update.items) {
    let total = 0;
    this._update.items.forEach((item) => {
      total += item.amount;
    });
    this._update.amount = total;
  }
  next();
});

module.exports = mongoose.model('Budget', BudgetScheme);
