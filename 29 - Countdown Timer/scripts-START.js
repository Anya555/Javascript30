let buttons = document.querySelectorAll(".timer__button");
let itemInput = document.querySelector("input");
let displayTime = document.querySelector("h1");
let timeToBeBack = document.querySelector("p");
let form = document.querySelector("form");
let timer, minutes, seconds, now, currentTime, currentHour, currentSecond;

const getCurrentTime = () => {
  now = new Date();
  currentTime = now.toLocaleString().split(",")[1];
  currentHour = Number(currentTime.split(":")[0]);
  currentMinute = Number(currentTime.split(":")[1]);
  currentSecond = now.getSeconds();
  console.log(currentSecond);
};
setInterval(getCurrentTime, 1000);

const calculateTimeToBeBack = (currentHour, minutes, seconds) => {
  currentTime = now.toLocaleString().split(",")[1];
  if (minutes === 0) {
    seconds = seconds += currentSecond;
    minutes = currentMinute;
  }
  if (seconds > 60) {
    minutes += 1;
  }
  if (minutes > 60) {
    currentHour += 1;
    minutes = minutes - 60;
  }
  timeToBeBack.innerHTML = "Be back at " + currentHour + ":" + minutes;
  if (minutes < 10) {
    timeToBeBack.innerHTML = "Be back at " + currentHour + ":" + "0" + minutes;
  }
};

const startMinuteTimer = () => {
  form.reset();
  seconds -= 1;
  displayTime.innerHTML = minutes - 1 + ":" + seconds;
  if (seconds < 10) {
    displayTime.innerHTML = minutes - 1 + ":" + "0" + seconds;
  }
  if (seconds === 0) {
    seconds = 60;
    minutes -= 1;
  }
  if (minutes === 0) {
    clearInterval(timer);
  }
};

const startTimer = (button) => {
  if (button.dataset.time >= 60) {
    minutes = button.dataset.time / 60;
    displayTime.innerHTML = minutes + ":" + "00";
    seconds = 60;
    timer = setInterval(startMinuteTimer, 1000);
  } else {
    let seconds = Number(button.dataset.time);
    displayTime.innerHTML = "00" + ":" + seconds;
    timer = setInterval(function () {
      seconds -= 1;
      displayTime.innerHTML = "00" + ":" + seconds;
      if (seconds < 10) {
        displayTime.innerHTML = "00" + ":" + "0" + seconds;
      }
      if (seconds === 0) {
        clearInterval(timer);
      }
    }, 1000);
  }
};

buttons.forEach((button) => {
  button.addEventListener("click", function () {
    clearInterval(timer);
    startTimer(button);
    let seconds = Number(button.dataset.time);
    let minutes;
    if (seconds < 60) {
      minutes = 0;
    } else {
      minutes = button.dataset.time / 60 + currentMinute;
    }
    calculateTimeToBeBack(currentHour, minutes, seconds);
  });
});

const getInput = (e) => {
  clearInterval(timer);
  minutes = e.target.value;
  displayTime.innerHTML = minutes + ":" + "00";
  seconds = 60;
  timer = setInterval(startMinuteTimer, 1000);
  calculateTimeToBeBack(currentHour, Number(minutes) + currentMinute);
};

itemInput.onkeyup = getInput;
