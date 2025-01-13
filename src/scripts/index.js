import "../styles/normalize.css";
import "../styles/styles.css";

const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

const API_KEY = "LBECU2EPA4ANQ9PMZJUSQTQ9S";
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const loader = document.getElementById('loader');
const container = document.getElementById('info-container')

searchInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    handleSearch();
  }
});

searchButton.addEventListener('click', handleSearch);

async function getWeatherData(location) {
  const URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${API_KEY}`;
  try {
    const response = await fetch(URL, {mode: "cors"});
    const json = await response.json();
    displayWeatherData(json);
  } catch (error) {
    console.error(error);
  }
}

function handleSearch() {
  const value = searchInput.value.trim().toLowerCase();
  if (value !== '') {
    container.replaceChildren();
    loader.style.visibility = "visible";
    getWeatherData(value).then(() => loader.style.visibility = "hidden");
  }
}

function displayWeatherData(weatherData) {
  const place = document.getElementById('place');
  console.log(weatherData);
  place.textContent = weatherData.address.toUpperCase();
  handleDays(weatherData.days);
  loader.style.visibility = "hidden";
}

function handleDays(daysForecasts) {
  const container = document.getElementById('info-container');
  for (let i = 0; i < 7; i++) {
    const day = daysForecasts[i];
    try {
      const datetime = new Date(day.datetime);
      const dayOfWeek = dayNames[datetime.getDay()];
      let temperature = ((day.temp - 32) * 5/9);
      temperature = Math.round(temperature);
      const minTemp = day.mintemp;
      const card = createDayCardElement(dayOfWeek, temperature, minTemp);
      container.append(card);
    } catch (e) {
      console.error(e);
    }
  }
}

function createDayCardElement(dayOfWeek, temperature, minTemp) {
  const container = document.createElement("div");
  const dayEle = document.createElement("span");
  const tempEle = document.createElement("span");

  container.className = "info-card";
  dayEle.textContent = dayOfWeek.substring(0, 3);
  tempEle.textContent = temperature + "c";

  container.append(dayEle);
  container.append(tempEle);
  return container;
}