var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sbs.sar.resetpass@gmail.com",
    pass: "forruawbhgpnkgpa",
  },
});

exports.sendTemp = (temp) => {
  var mailOptions = {
    from: "sbs.sar.resetpass@gmail.com",
    to: "basantthani@gmail.com",
    subject: "Temp Warning",
    text: `Be carefull the temprature is now ${temp}`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
