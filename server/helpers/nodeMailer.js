let nodemailer = require('nodemailer');

function NodeMailer(payload) {

  const { toReceiver, subjectEmail, message } = payload;

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'inspect.development.hactiv8@gmail.com',
      pass: 'Inspect123!'
    }
  });

  let mailOptions = {
    from: 'inspect.development.hactiv8@gmail.com',
    to: toReceiver,
    subject: subjectEmail,
    html: message
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) throw err;
  });
}

module.exports = NodeMailer
