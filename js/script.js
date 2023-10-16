// Часы

const time = document.querySelector(".time");

const date1 = document.querySelector(".date");

const greeting = document.querySelector(".greeting");

const name = document.querySelector(".name");

const body = document.querySelector("body");

// кнопки
const slideNext = document.querySelector(".slide-next");
const slidePrev = document.querySelector(".slide-prev ");

function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  time.textContent = currentTime;
  greeting.textContent = `Good ${getTimeOfDay()}`;
  date1.textContent = showDate();
  setTimeout(showTime, 1000);
}
showTime();

// Дата

function showDate() {
  const date = new Date();
  const options = { weekday: "long", month: "long", day: "numeric" };
  const currentDate = date.toLocaleDateString("en-US", options);
  return currentDate;
}

// Приветствие , ,

function getTimeOfDay() {
  const date = new Date();
  const hours = date.getHours();

  if (hours <= 6 && hours >= 0) {
    return "night";
  } else if (hours >= 6 && hours < 12) {
    return "morning";
  } else if (hours >= 12 && hours < 18) {
    return "afternoon";
  } else {
    return "evening";
  }
}

// Ввод имени

function setLocalStorage() {
  localStorage.setItem("name", name.value);
  localStorage.setItem("city", city.value);
}
window.addEventListener("beforeunload", setLocalStorage);

function getLosalStorage() {
  if (localStorage.getItem("name")) {
    name.value = localStorage.getItem("name");
  }
  if (localStorage.getItem("city")) {
    city.value = localStorage.getItem("city");
  }
  getWeather();
}
window.addEventListener("load", getLosalStorage);

// Фон

let randomNum = Math.random() * 19 + 1;

function getRandomNum() {
  let randomTo20 = Math.floor(randomNum);

  if (randomNum == 0) {
    return (randomTo20 = 1);
  } else {
    return randomTo20;
  }
}
getRandomNum();

function setBg() {
  let timeOfDay = getTimeOfDay();
  let bgNum = getRandomNum().toString().padStart(2, "0");
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/ChessMasterr/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
  img.onload = () => {
    body.style.backgroundImage = `url(${img.src})`;
  };
}

setBg();

function getSlideNext() {
  randomNum = randomNum + 1;
  if (randomNum > 20) {
    return (randomNum = 1);
  }
  setBg();
}

function getSlidePrev() {
  randomNum = randomNum - 1;
  if (randomNum < 1) {
    return (randomNum = 20);
  }
  setBg();
}

slideNext.addEventListener("click", getSlideNext);
slidePrev.addEventListener("click", getSlidePrev);

//  Погода

const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const city = document.querySelector(".city");
const weatherError = document.querySelector(".weather-error");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");

async function getWeather() {
  if (city.value == "") {
    return (city.value = "Минск");
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=ru&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  if (res.ok == false) {
    return (
      (weatherError.textContent = "Error! Нет такого города"),
      (temperature.textContent = ""),
      (weatherDescription.textContent = ""),
      (weatherIcon.className = ""),
      (wind.textContent = ""),
      (humidity.textContent = "")
    );
  } // Это когда введен несуществующий город

  weatherIcon.className = "weather-icon owf";
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${Math.ceil(data.main.temp)}°C`;
  weatherDescription.textContent = data.weather[0].description;
  weatherError.textContent = "";
  wind.textContent = `${Math.ceil(data.wind.speed)}м/с`;
  humidity.textContent = `${Math.ceil(data.main.humidity)}%`;

  city.addEventListener("change", function (e) {
    return city.value;
  });
}
getWeather();
function setCity(event) {
  if (event.code === "Enter") {
    getWeather();
    city.blur();
  }
}

document.addEventListener("DOMContentLoaded", getWeather);
city.addEventListener("keypress", setCity);

// Цитаты

const quote = document.querySelector(".quote");
const author = document.querySelector(".author");
const changeQuote = document.querySelector(".change-quote");

async function getQuotes() {
  const quotes = "data.json";
  const res = await fetch(quotes);
  const data = await res.json();
  const rund = Math.floor(Math.random() * 4 + 1);

  quote.textContent = data[rund].text;
  author.textContent = data[rund].author;
}

window.addEventListener("load", getQuotes);
changeQuote.addEventListener("click", getQuotes);

// Audio

import playList from "./playList.js";

const songTitle = document.querySelector(".songTitle");

const audio = new Audio();
const play = document.querySelector(".play");
const button = document.querySelector(".button");
const playPrev = document.querySelector(".play-prev");
const playNext = document.querySelector(".play-next");
let isPlay = false;
let playNum = 0;

function playAudio() {
  audio.src = playList[playNum].src;

  if (!isPlay) {
    audio.play();
    isPlay = true;
  } else {
    audio.pause();
    isPlay = false;
  }

  songTitle.textContent = playList[playNum].title;
  ul.children[playNum].classList.add("item-active");
}

function toggleBtn() {
  button.classList.toggle("pause");
}

function getPlayNext() {
  ul.children[playNum].classList.remove("item-active");
  if (playNum < playList.length - 1) {
    playNum++;
  } else {
    playNum = 0;
  }
  isPlay = false;
  playAudio();

  button.classList.add("pause");
}

function getPlayPrev() {
  ul.children[playNum].classList.remove("item-active");
  playNum = playNum - 1;
  if (playNum < 0) {
    playNum = 3;
  }
  isPlay = false;
  playAudio();

  button.classList.add("pause");
}

playPrev.addEventListener("click", getPlayPrev);
playNext.addEventListener("click", getPlayNext);

button.addEventListener("click", toggleBtn);
play.addEventListener("click", playAudio);

// Список песен начало

const ul = document.querySelector(".play-list");

function addPlayTrack() {
  let nameSong = "";
  for (let i = 0; i < playList.length; i++) {
    const li = document.createElement("li");
    nameSong = playList[i].title;
    li.textContent = nameSong;
    li.classList.add("play-item");
    ul.append(li);
  }
}
addPlayTrack();

audio.addEventListener("ended", getPlayNext);

// Список песен конец

// Линия прогресса

const progressContainer = document.querySelector(".progress_container");
const progress = document.querySelector(".progress");
const now = document.querySelector(".now");
const allTime = document.querySelector(".all-time");

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  now.textContent = playList[playNum].duration;

  allTime.textContent = getTimeCodeFromNum(audio.currentTime);
}

audio.addEventListener("timeupdate", updateProgress);

// Time code

function getTimeCodeFromNum(num) {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  const hours = parseInt(minutes / 60);
  minutes -= hours * 60;

  if (hours === 0)
    return `${String(minutes).padStart(2, 0)}:${String(seconds % 60).padStart(
      2,
      0
    )}`;
  return `${String(hours).padStart(2, 0)}:${minutes}:${String(
    seconds % 60
  ).padStart(2, 0)}`;
}

// Перемотка по Линии прогресса

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

progressContainer.addEventListener("click", setProgress);

// Выключение звука

const mutedSOund = document.querySelector(".muted");

function mutedToggle(e) {
  audio.muted = !audio.muted;
  mutedSOund.classList.toggle("muted-off");
  mutedSOund.classList.toggle("muted");
}

mutedSOund.addEventListener("click", mutedToggle);

// Progress volume

const progressVolume = document.querySelector(".progress_volume");
const progressVolumeContainer = document.querySelector(
  ".progress_volume_container"
);

function setProgressVolume(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const volumePercent = (clickX / width) * 100;
  audio.volume = clickX / width;
  progressVolume.style.width = `${volumePercent}%`;
}
progressVolumeContainer.addEventListener("click", setProgressVolume);
