const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    plan: {
      type: String,
      enum: ['free', 'basic', 'premium'],
      default: 'free',
    },
    price: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['active', 'trial', 'past_due', 'canceled'],
      required: true,
    },
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
    stripe_id: {
      type: String,
      default: null,
    },
    payPal_id: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

subscriptionSchema.methods.Pricing = function () {
  const plan = this.plan;
  let price = 0;

  if (plan === 'free') {
    price = 0;
  } else if (plan === 'basic') {
    price = 10;
  } else if (plan === 'premium') {
    price = 22;
  }

  this.price = price;

  return price;
};

subscriptionSchema.pre('save', async function (next) {
  try {
    this.Pricing();
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
