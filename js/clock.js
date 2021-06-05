// const clockContainer = document.querySelector(".js-clock"),
// clockTitle = clockContainer.querySelector(".js-title");

var date;
var hours;
var minutes;
var seconds;

export function lt10Moments(self) {
  return self < 10 ? `0${self}` : self;
}

export function setTime(target) {
  getTime();

  target.innerText = `${lt10Moments(hours)}:${lt10Moments(minutes)}:${lt10Moments(seconds)}`;
}

// export function setTime() {
//   getTime();

//   return `${lt10Moments(hours)}:${lt10Moments(minutes)}:${lt10Moments(seconds)}`;
// }

function getTime() {
  date = new Date();
  hours = date.getHours();
  minutes = date.getMinutes();
  seconds = date.getSeconds();
}

// function init() {
//   getTime(clockTitle);
//   setInterval(getTime, 1000);
// }

// init();