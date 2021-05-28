let intervalHolder;
let rate = 100;

let turbineAngle = 0;

const animate = () => {
  let i = 2;
  intervalHolder = setInterval(async () => {
    if (i > 99) {
      i = 2;
      document.getElementById(`img_100`).style.display = await "none";
    } else i++;
    document.getElementById(`img_${i - 1}`).style.display = await "none";
    document.getElementById(`img_${i}`).style.display = await "";
  }, rate);
};

const changeSpeed = () => {
  clearInterval(intervalHolder);
  document.getElementById(`img_${1}`).style.display = "none";
  for (let i = 2; i <= 100; i++)
    document.getElementById(`img_${i}`).style.display = "none";
  animate();
};

const zeroSpeed = () => {
  clearInterval(intervalHolder);
  document.getElementById(`img_${1}`).style.display = "";
  for (let i = 2; i <= 100; i++)
    document.getElementById(`img_${i}`).style.display = "none";
};

function preloadImage(i) {
  url = `./assets/images/turbine/frame ${i}.png`;
  var img = new Image();
  img.src = url;
  img.id = `img_${i}`;
  img.style.display = "none";
  img.style.width = "100%";
  document.getElementById("turbineContainer").append(img);
}
const preloadAllImages = () => {
  for (let i = 1; i < 101; i++) {
    preloadImage(i);
  }
};
setInterval(() => {
  //console.log(turbineAngle);
  if (turbineAngle != degrees) {
    if (turbineAngle > degrees) {
      turbineAngle -= 1;
    } else if (turbineAngle < degrees) {
      turbineAngle += 1;
    }
    let printapleDeg = turbineAngle > 0 ? turbineAngle : turbineAngle + 360;
    turbine.style.transform = `rotate3d(0, 1, 0, ${turbineAngle + 180}deg)`;
    turbineAngleObj.value = printapleDeg + " deg";

    let newSpeed = calcSpeed(degrees, turbineAngle);
    turbineSpeedObj.value = speed + " RPM";
    if (speed != newSpeed) changeSpeedByValue(newSpeed);
    speedSliderObj.value = newSpeed;
    speed = newSpeed;
  }
}, 20);

const map = (x, in_min, in_max, out_min, out_max) => {
  return ((x - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};
const calcSpeed = (windAngle, turbineAngle) => {
  windAngle = windAngle % 360;
  turbineAngle = turbineAngle % 360;
  let delta = Math.abs(windAngle - turbineAngle);
  if (delta >= 180) return Number(map(delta, 180, 360, 0, 100).toFixed(0));
  else return Number(map(delta, 180, 0, 0, 100).toFixed(0));
};

preloadAllImages();
animate();
