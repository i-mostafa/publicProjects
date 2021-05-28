const accountSid = "AC0b605e63229ee8cb0e6ee4dc9657ae82";
const authToken = "b46ae4042b2da4a9aedbb453b647b98a";
const client = require("twilio")(accountSid, authToken);

client.messages
  .create({
    body: "ana islam ya habla",
    from: "whatsapp:+14155238886",
    to: "whatsapp:+201030969730",
  })
  .then((message) => console.log(message.sid))
  .done();
