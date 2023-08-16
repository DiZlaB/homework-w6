import axios from "./axios.js";
let todayDate = document.querySelector("#today");
let now = new Date();
function current(date) {
  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let day = days[date.getDay()];
  let month = months[date.getMonth()];
  let numericalDay = date.getDate();
  let year = date.getFullYear();
  let hour = date.getHours();
  let minutes = date.getMinutes();

  todayDate.innerHTML = `${day} ${numericalDay} ${month} ${year}
${hour}:${minutes}`;

  return todayDate;
}

current(now);

let form = document.querySelector("#searchresults");

function search(event) {
  event.preventDefault();
  let searchedLocation = document.querySelector("#check-the-weather").value;
  let apikey = "02aae5571b12aae18e7f2a048340cbc7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchedLocation}&appid=${apikey}&units=metric`;
  axios.get(apiUrl).then(nowTemperature);
}

function nowTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#location");
  temperatureElement.innerHTML = `It is ${temperature}C° in ${response.data.name}`;
}

form.addEventListener("submit", search);

function locatingMe(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apikey = "02aae5571b12aae18e7f2a048340cbc7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`;
  axios.get(apiUrl).then(nowTemperature);
}
navigator.geolocation.getCurrentPosition(locatingMe);
