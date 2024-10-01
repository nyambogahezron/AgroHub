const mongoose = require('mongoose');

const OrganizationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
    name: {
      type: String,
      required: [true, 'Please provide Name'],
      minlength: [3, 'Name too short'],
      maxlength: [50, 'Name too long'],
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Please provide email'],
      validate: {
        validator: validator.isEmail,
        message: 'Please provide valid email',
      },
    },
    logo: {
      type: String,
      default: '/images/org-default.jpg',
    },
    phone: {
      type: String,
      required: [true, 'Please provide phone number'],
      minlength: [10, 'Phone number too short'],
      maxlength: [15, 'Phone number too long'],
    },
    address: {
      type: String,
      required: [true, 'Please provide address'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Organization', OrganizationSchema);
