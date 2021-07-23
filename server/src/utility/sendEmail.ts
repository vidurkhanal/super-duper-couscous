"use strict";
import nodemailer from "nodemailer";

// const getTestAcc = async () => {
//   let testAccount = await nodemailer.createTestAccount();
//   console.log(testAccount);
// };

// getTestAcc().catch((e) => console.log(e.message));

export async function sendEmail(
  _emailToSendTo: string,
  emailTitle: string,
  emailContent: string
) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  //   let testAccount = await nodemailer.createTestAccount();
  //   console.log(testAccount);

  // create reusable transporter object using the default SMTP transport
  //   let transporter = nodemailer.createTransport({
  //     service: "SendinBlue",
  //     host: "smtp-relay.sendinblue.com",
  //     port: 587,
  //     secure: false, // true for 465, false for other ports
  //     auth: {
  //       user: "SEND IN BLUE EMAIK",
  //       pass: "SEND IN BLUE PWD",
  //     },
  //   });

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "xfcqlzq7xrtkfcrr@ethereal.email",
      pass: "vGCHCKgBvr3uXJFj1F",
    },
  });

  //   // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"K Pass 12" <topilama23@gmail.com>', // sender address
    to: "rux12@icloud.com, vidur1@outlook.com", // list of receivers
    subject: emailTitle, // Subject line
    html: emailContent, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
