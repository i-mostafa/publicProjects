const fs = require("fs");

const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");
const port = new SerialPort("COM7", { baudRate: 9600 });
const parser = port.pipe(new Readline({ delimiter: "\n" }));

parser.on("data", (data) => {
  console.log(data);
  fs.writeFile("./models/dbFiles/data.json", data, (err) => {
    if (err) throw err;
  });
  if (data.mode == "M") {
    this.getTurbineAngle().then((turbine) => {
      let deg = turbine.turbineAngle % 360;
      deg = deg > 0 ? deg : deg + 360;
      this.sendData(`${deg}\n`);
    });
  } else {
    let turbine = JSON.parse(data);
    this.setturbineAngle(turbine.turbineAngle);
  }
});

exports.openSerialPort = () => {
  port.on("open", () => {
    console.log("serial port open");
  });
};

exports.sendData = (data) => {
  port.write(data, (err) => {
    if (err) {
      return console.log("Error on write: ", err.message);
    }
  });
};

exports.arduinoData = () => {
  return new Promise((resolve, reject) => {
    fs.readFile("./models/dbFiles/data.json", function (err, data) {
      if (err) throw err;
      data = String(data).replace(/(\r\n|\n|\r)/gm, "");
      let jsonData;
      try {
        jsonData = JSON.parse(data);
      } catch (err) {
        console.log(err);
      }
      resolve(jsonData);
    });
  });
};

exports.getTurbineAngle = () => {
  return new Promise((resolve, reject) => {
    fs.readFile("./models/dbFiles/turbineAngle.json", function (err, data) {
      if (err) throw err;
      data = String(data).replace(/(\r\n|\n|\r)/gm, "");
      // console.log("data", data);

      let jsonData;
      try {
        jsonData = JSON.parse(data);
      } catch (err) {
        console.log(err);
      }

      resolve(jsonData);
    });
  });
};
exports.getWindAngle = () => {
  return new Promise((resolve, reject) => {
    fs.readFile("./models/dbFiles/windAngle.json", function (err, data) {
      if (err) throw err;
      data = String(data).replace(/(\r\n|\n|\r)/gm, "");
      let jsonData;
      try {
        jsonData = JSON.parse(data);
      } catch (err) {
        console.log(err);
      }

      resolve(jsonData);
    });
  });
};
exports.setWindAngle = (windAngle) => {
  //console.log(JSON.stringify({ windAngle: windAngle }));
  fs.writeFile(
    "./models/dbFiles/windAngle.json",
    JSON.stringify({ windAngle: windAngle }),
    (err) => {
      if (err) throw err;
    }
  );
};
exports.setturbineAngle = (turbineAngle) => {
  //console.log(JSON.stringify({ turbineAngle: turbineAngle }));
  fs.writeFile(
    "./models/dbFiles/turbineAngle.json",
    JSON.stringify({ turbineAngle: turbineAngle }),
    (err) => {
      if (err) throw err;
    }
  );
};
