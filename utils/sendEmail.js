const nodemailer = require("nodemailer");

const sendEmail = (options) => {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },

    // for node mailer
    // host: process.env.EMAIL_SERVICE,
    // port: process.env.EMAIL_PORT,
    // auth: {
    //   user: process.env.EMAIL_USERNAME,
    //   pass: process.env.EMAIL_PASSWORD,
    // },
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: options.to,
    subject: options.subject,
    html: options.text,
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

module.exports = sendEmail;

// for mail trap

// EMAIL_SERVICE = smtp.mailtrap.io
// EMAIL_PORT = 2525
// EMAIL_USERNAME = 19e9d5fc8b27f1
// EMAIL_PASSWORD = cfed7819425b62
// EMAIL_FROM = asifulhaque086@gmail.com

// for gmail

// EMAIL_SERVICE = gmail
// EMAIL_PORT = 2525
// EMAIL_USERNAME = asifulhaque085@gmail.com
// EMAIL_PASSWORD = sekwtkubawdwqtfx
// EMAIL_FROM = asifulhaque085@gmail.com
