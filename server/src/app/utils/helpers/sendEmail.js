const nodemailer = require("nodemailer");
const nodemailerSendgrid = require("nodemailer-sendgrid");

const gridConfig = require("../configs/nodemailerConfig");

const transport = nodemailer.createTransport(
  nodemailerSendgrid({
    apiKey:
      "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",
  })
);

const sendEmail = async () => {
  const res = await transport.sendMail({
    from: "moeedawan2121@gmail.com",
    to: "Abdul Moeed <iqceazbiffbpoxrjur@bvhrk.com>",
    subject: "hello world",
    html: "<h1>Hello world!</h1>",
  });

  console.log(res);
  //   console.log(gridConfig.sendGridApiKey);
};

sendEmail();
