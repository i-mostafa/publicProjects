const express = require("express");
const path = require("path");
const simulatorRouter = require("./routes/simulator.router");
const ArduinoModel = require("./models/arduino.model");
const bodyParserMW = require("body-parser").urlencoded({
  extended: true,
});
const app = express();
ArduinoModel.openSerialPort();
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParserMW);

app.use("/simulator", simulatorRouter);
app.use("/", (req, res, next) => {
  res.render("index");
});
app.listen(3000, (err) => {
  console.log("server is running");
});
