const play = document.querySelector(".player__button");
const video = document.querySelector("video");
const progressFilled = document.querySelector(".progress__filled");
const secondsToSkip = document.querySelectorAll("[data-skip]");
const inputs = document.querySelectorAll("input");
const progress = document.querySelector(".progress");
let videoPaused = true;

progressFilled.style.flexBasis = "0%";

play.addEventListener("click", function () {
  if (videoPaused === true) {
    video.play();
    setInterval(getCurrTime, 1000);
    play.innerHTML = "=";
    play.style.fontWeight = "bold";
    videoPaused = false;
  } else {
    videoPaused = true;
    video.pause();
    play.innerHTML = "►";
  }
});

function getCurrTime() {
  let percentage = (video.currentTime / video.duration) * 100;
  progressFilled.style.flexBasis = `${percentage}%`;
}

Array.from(secondsToSkip).forEach((button) => {
  button.addEventListener("click", function () {
    if (button.dataset.skip === "-10") {
      video.currentTime -= 10;
    } else if (button.dataset.skip === "25") {
      video.currentTime += 25;
    }
  });
});

function handleUpdate(e) {
  if (e.target.name === "playbackRate") {
    video.playbackRate = this.value;
  } else if (e.target.name === "volume") {
    video.volume = this.value;
  }
}

Array.from(inputs).forEach((input) =>
  input.addEventListener("change", handleUpdate)
);
Array.from(inputs).forEach((input) =>
  input.addEventListener("mousemove", handleUpdate)
);

progress.addEventListener("click", function (e) {
  video.currentTime = (e.offsetX / this.offsetWidth) * video.duration;
});
