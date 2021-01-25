
const nodemailer = require("nodemailer");
require('dotenv').config()

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });


module.exports = transporter;