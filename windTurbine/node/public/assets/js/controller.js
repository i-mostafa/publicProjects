var degrees = 0,
  temp = 50,
  speed = 50,
  mode = "automatic";
const windAngleObj = document.getElementById("windAngle"),
  tempObj = document.getElementById("temp"),
  turbineAngleObj = document.getElementById("turbineAngle"),
  turbineSpeedObj = document.getElementById("turbineSpeed"),
  pointer = document.getElementById("pointer"),
  turbine = document.getElementById("turbineContainer"),
  sliderObj = document.getElementById("slider"),
  speedSliderObj = document.getElementById("Speedslider");

windAngleObj.value = degrees + " deg";
tempObj.value = temp + " deg";
turbineAngleObj.value = degrees + " deg";
turbineSpeedObj.value = speed + " RPM";

document.addEventListener("DOMContentLoaded", function () {
  function rotatePointer(e) {
    if (mode === "manual") {
      var pointerEvent = e;
      if (pointerEvent.wheelDelta > 0) degrees++;
      else if (pointerEvent.wheelDelta < 0) degrees--;
      // console.log(degrees);
      pointer.style.transform = "rotate(" + degrees + "deg)";
      let deg = degrees % 360,
        printapleDeg = deg > 0 ? deg : deg + 360;
      windAngleObj.value = printapleDeg + " deg";
      changeWindAngle(printapleDeg);
    }
  }
  window.addEventListener("mousewheel", rotatePointer);
});

const changeMode = (radio) => {
  mode = radio.value;
  sliderObj.disabled = mode !== "manual";
  speedSliderObj.disabled = mode !== "manual";
  sendChangeMode(mode);
};

const changeSpeed_ = (slider) => {
  speed = slider.value;
  turbineSpeedObj.value = speed + " RPM";
  rate = 100 - speed;
  if (rate != 100) changeSpeed();
  else zeroSpeed();
};
const changeSpeedByValue = (value) => {
  speed = value;
  rate = 100 - speed;
  if (rate != 100) changeSpeed();
  else zeroSpeed();
};

let lastTempState = "stable";
const changeTemp = (slider) => {
  temp = slider.value;
  tempObj.value = temp + " deg";
  let status = document.getElementById("status");
  if (temp < 50) {
    status.className = "btn btn-success";
    status.innerText = "Stable";
    lastTempState = "Stable";
  } else if (temp < 70) {
    if (lastTempState != "Warning") {
      sendEmail(temp);
      lastTempState = "Warning";
    }
    status.className = "btn btn-warning";
    status.innerText = "Warning";
  } else {
    if (lastTempState != "Danger") {
      sendEmail(temp);
      lastTempState = "Danger";
    }
    status.className = "btn btn-danger";
    status.innerText = "Danger";
  }
};

const changeTempByValue = (value) => {
  temp = value;
  tempObj.value = temp + " deg";
  let status = document.getElementById("status");
  if (temp < 50) {
    status.className = "btn btn-success";
    status.innerText = "Stable";
    lastTempState = "Stable";
  } else if (temp < 70) {
    if (lastTempState != "Warning") {
      sendEmail(temp);
      lastTempState = "Warning";
    }
    status.className = "btn btn-warning";
    status.innerText = "Warning";
  } else {
    if (lastTempState != "Danger") {
      sendEmail(temp);
      lastTempState = "Danger";
    }
    status.className = "btn btn-danger";
    status.innerText = "Danger";
  }
};
