const refreshData = () => {
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", `/simulator/refreshData`, true);
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var response = JSON.parse(this.responseText);
      console.log(response);
      updateData(response);
    }
  };
  xhttp.send();
};

const changeWindAngle = (windAngle) => {
  var xhttp = new XMLHttpRequest();
  xhttp.open(
    "GET",
    `/simulator/windAngle?windAngle=${windAngle}&turbineAngle=${turbineAngle}&temp=${temp}`,
    true
  );
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var response = JSON.parse(this.responseText);
      console.log(response);
      updateData(response);
    }
  };
  xhttp.send();
};
const sendChangeMode = (mode) => {
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", `/simulator/mode?mode=${mode}`, true);
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
    }
  };
  xhttp.send();
};
const sendEmail = (temp) => {
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", `/simulator/email?temp=${temp}`, true);
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
    }
  };
  xhttp.send();
};
const updateData = (data) => {
  windAngleObj.value = data.windAngle + " deg";
  pointer.style.transform = "rotate(" + data.windAngle + "deg)";

  tempObj.value = data.temp + " deg";
  if (temp != data.temp) changeTempByValue(data.temp);
  sliderObj.value = data.temp;
  temp = data.temp;
  degrees = data.windAngle;
  //turbine.style.transform = `rotate3d(0, 1, 0, ${data.turbineAngle + 180}deg)`;
  // let deg = data.turbineAngle % 360;
  // deg = deg > 0 ? deg : deg + 360;
  // turbineAngleObj.value = deg + " deg";
  // turbineSpeedObj.value = data.turbineSpeed + " RPM";
  // if (speed != data.turbineSpeed) changeSpeedByValue(data.turbineSpeed);
  // speedSliderObj.value = data.turbineSpeed;
  // speed = data.turbineSpeed;
};

refreshData();

window.setInterval(function () {
  if (mode == "automatic") refreshData();
}, 500);
