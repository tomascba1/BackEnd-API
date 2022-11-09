const nodemailer = require("nodemailer");
require("dotenv").config()

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.emailuser,
      pass: process.env.emailpass
    }
  });

module.exports = transport