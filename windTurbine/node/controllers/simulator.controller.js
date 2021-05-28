const ArduinoModel = require("../models/arduino.model");
const MailModel = require("../models/mailer.model");
exports.refreshSimulatorData = (req, res, next) => {
  ArduinoModel.arduinoData().then((data) => {
    ArduinoModel.getTurbineAngle().then((turbine) => {
      const response = {
        windAngle: data.windAngle,
        temp: data.temp,
        turbineAngle: turbine.turbineAngle,
        turbineSpeed: calcSpeed(data.windAngle, turbine.turbineAngle),
      };
      res.json(response);
    });
  });
};

exports.changeMode = (req, res, next) => {
  let mode = req.query.mode;
  ArduinoModel.sendData(mode == "manual" ? "M\n" : "A\n");
  res.send("sent");
};

exports.changeWindAngle = (req, res, next) => {
  const windAngle = req.query.windAngle,
    turbineAngle = req.query.turbineAngle;
  ArduinoModel.setWindAngle(windAngle);
  ArduinoModel.setturbineAngle(turbineAngle);
  let deg = turbineAngle % 360;
  deg = deg > 0 ? deg : deg + 360;
  ArduinoModel.sendData(String(deg) + "\n");
  console.log("angle sent: ", deg);
  const response = {
    windAngle: windAngle,
    turbineAngle: deg,
    turbineSpeed: calcSpeed(windAngle, turbineAngle),
    temp: req.query.temp,
  };
  res.json(response);
};

const map = (x, in_min, in_max, out_min, out_max) => {
  return ((x - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};
const calcSpeed = (windAngle, turbineAngle) => {
  let delta = Math.abs(windAngle - turbineAngle);
  if (delta >= 180) return Number(map(delta, 180, 360, 0, 100).toFixed(0));
  else return Number(map(delta, 180, 0, 0, 100).toFixed(0));
};

exports.sendTempMail = (req, res, next) => {
  MailModel.sendTemp(req.query.temp);
  res.send("done");
};
