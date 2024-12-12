# Server Setup

For the API documentation, please refer to the [API Documentation](https://agrohub-5p17.onrender.com).

For more information on the technologies used in this project, please refer to the following documentation:

- [Express.js Documentation](https://expressjs.com/)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [MongoDB Documentation](https://docs.mongodb.com/)

This guide will help you set up and start the Express server and MongoDB for the project.

## Prerequisites

Make sure you have the following installed on your machine:

- Node.js
- npm (Node Package Manager)
- MongoDB

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/nyambogahezron/AgroHub
cd your-repo
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory and add the following variables:

```
MONGO_URI=your_mongodb_connection_string
PORT=your_port_number
```

### 4. Start MongoDB

Make sure MongoDB is running. You can start MongoDB using the following command:

```bash
mongod
```

### 5. Start the Server

```bash
npm start
```

The server should now be running on the port specified in your `.env` file.

## Additional Commands

### Running in Development Mode

```bash
npm run dev
```

### Running Tests

```bash
npm test
```

## Troubleshooting

If you encounter any issues, please check the following:

- Ensure MongoDB is running and accessible.
- Verify that your environment variables are correctly set in the `.env` file.
- Check the server logs for any error messages.

For further assistance, refer to the project's documentation or open an issue on the repository.

## Example `.env` File

Here is an example of what your `.env` file might look like:

```
MONGO_URL=
JWT_SECRET=
email=email-to-send-verifications-from
pass=password from app password for gmail
NODE_ENV=
PAYPAL_CLIENT_ID=
PAYPAL_CLIENT_SECRET=
clientLink=
```

The project also include emails

## Setting Up Email Sending

To set up email sending in your Node.js project, follow these steps:

### 1. Install Nodemailer

First, you need to install Nodemailer, a module for Node.js applications to allow easy email sending.

```bash
npm install nodemailer
```

### 2. Configure Nodemailer

Create a new file called `emailConfig.js` in your project directory and add the following code:

```javascript
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

module.exports = transporter;
```

### 3. Set Up Environment Variables

Add your email and app password to your `.env` file:

```
EMAIL=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

### 4. Get Your Email App Password

To get your email app password, follow these steps:

1. Go to your Google Account.
2. Select Security.
3. Under "Signing in to Google," select App Passwords. You might need to sign in.
4. At the bottom, choose Select app and choose the app you’re using.
5. Choose Select device and choose the device you’re using.
6. Follow the instructions to generate an app password. The app password is the 16-character code in the yellow bar on your device.
7. Copy the app password and use it in your `.env` file.

### 5. Send an Email

You can now use the configured transporter to send emails. Here is an example of how to send an email:

```javascript
const transporter = require('./emailConfig');

const mailOptions = {
  from: process.env.EMAIL,
  to: 'recipient@example.com',
  subject: 'Test Email',
  text: 'This is a test email sent from Node.js using Nodemailer.',
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error);
  }
  console.log('Email sent: ' + info.response);
});
```

With these steps, you should be able to send emails from your Node.js application using Nodemailer.
