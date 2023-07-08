let apiKey = "68ed940b3b921df8ccf6e6331of75tba";
let city = "Johannesburg";
let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
let date = new Date();

function displayDate(timestamp) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return `${days[day]} ${hours}:${minutes}`;
}

function DisplayWeather(response) {
  console.log(response.data);

  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind-speed");
  let TempElement = document.querySelector(".temp");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML =
    response.data.daily[date.getDay()].condition.description;
  humidityElement.innerHTML =
    response.data.daily[date.getDay()].temperature.humidity;
  windElement.innerHTML = Math.round(
    response.data.daily[date.getDay()].wind.speed
  );
  TempElement.innerHTML = Math.round(
    response.data.daily[date.getDay()].temperature.day
  );
  dateElement.innerHTML = displayDate(
    response.data.daily[date.getDay()].time * 1000
  );
  iconElement.setAttribute(
    "src",
    response.data.daily[date.getDay()].condition.icon_url
  );
}
axios.get(apiUrl).then(DisplayWeather);
