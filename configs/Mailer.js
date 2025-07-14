const nodemailer = require("nodemailer");

console.log("✅ Mailer.js - MAIL_USERNAME:", process.env.MAIL_USERNAME);
console.log("✅ Mailer.js - MAIL_PASSWORD:", process.env.MAIL_PASSWORD);

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD
  }
});

module.exports = transporter;
