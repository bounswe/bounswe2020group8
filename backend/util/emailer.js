const nodemailer = require("nodemailer");
const Config = require("../config");

const sendEmail = async ({ email, subject, message }) => {
  // 1) Create a transporter
  var transporter = nodemailer.createTransport({
    host: Config.emailer.host,
    port: Config.emailer.port,
    auth: {
      user: Config.emailer.user,
      pass: Config.emailer.pass,
    },
  });
  // 2) Define the email options
  const mailOptions = {
    from: Config.emailer.host,
    to: email,
    subject: subject,
    text: message,
    // html:
  };

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};
module.exports = sendEmail;
