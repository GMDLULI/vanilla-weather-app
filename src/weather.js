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

function forcastDays(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days[day];
}
function DisplayForcast(response) {
  let forcastWeather = document.querySelector("#forcast");
  let forcastDisplay = response.data.daily;
  console.log(forcastDisplay);

  let forcast = `<div class="row">`;

  forcastDisplay.forEach(function (forcastDay, index) {
    if (index < 6) {
      forcast =
        forcast +
        `<div class="col-2">
              <div class="day">${forcastDays(forcastDay.time)}</div>
              <img
                src="${forcastDay.condition.icon_url}"
                alt="sunny"
                width="46"
              />
              <div class="weather-forcast-temps">
                <span class="weather-forcastTemp-max"><strong>${Math.round(
                  forcastDay.temperature.maximum
                )}℃</strong></span> |
                <span class="weather-forcastTemp-min">${Math.round(
                  forcastDay.temperature.minimum
                )}℃</span>
              </div>
            </div>`;
    }
  });
  forcast = forcast + `</div>`;
  forcastWeather.innerHTML = forcast;
}

function getForcast(coordinates) {
  console.log(coordinates);
  let apiKey = "68ed940b3b921df8ccf6e6331of75tba";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey};`;
  axios.get(apiUrl).then(DisplayForcast);
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

  convertCelcius = response.data.daily[date.getDay()].temperature.day;

  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML =
    response.data.daily[date.getDay()].condition.description;
  humidityElement.innerHTML =
    response.data.daily[date.getDay()].temperature.humidity;
  windElement.innerHTML = Math.round(
    response.data.daily[date.getDay()].wind.speed
  );
  TempElement.innerHTML = Math.round(convertCelcius);
  dateElement.innerHTML = displayDate(
    response.data.daily[date.getDay()].time * 1000
  );
  iconElement.setAttribute(
    "src",
    response.data.daily[date.getDay()].condition.icon_url
  );

  getForcast(response.data.coordinates);
}

function handleSearch(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#form-input");
  search(cityElement.value);
}

function search(city) {
  let apiKey = "68ed940b3b921df8ccf6e6331of75tba";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(DisplayWeather);
}

function displayFarenheitTemp(event) {
  event.preventDefault();
  celcius.classList.remove("active");
  farenheit.classList.add("active");
  let farenheitValue = (convertCelcius * 9) / 5 + 32;
  Temperature.innerHTML = Math.round(farenheitValue);
}

function displayCelciusTemp(event) {
  event.preventDefault();
  farenheit.classList.remove("active");
  celcius.classList.add("active");
  Temperature.innerHTML = Math.round(convertCelcius);
}

search("Johannesburg");

let Temperature = document.querySelector(".temp");
let convertCelcius = null;
let searchForm = document.querySelector("#form-search");
searchForm.addEventListener("submit", handleSearch);

let farenheit = document.querySelector("#farenheit-link");
farenheit.addEventListener("click", displayFarenheitTemp);

let celcius = document.querySelector("#celcius-link");
celcius.addEventListener("click", displayCelciusTemp);
