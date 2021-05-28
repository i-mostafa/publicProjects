const ArduinoModel = require("../models/arduino.model");

exports.sendDataToArduino = (data) => {
  let stringData = `${data.angle}`;
  ArduinoModel.sendData(stringData);
};
