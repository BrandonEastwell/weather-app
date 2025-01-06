import "../styles/normalize.css";
import "../styles/styles.css";

const API_KEY = "LBECU2EPA4ANQ9PMZJUSQTQ9S";
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

searchInput.addEventListener('keydown', (event) => {
  event.preventDefault();
  if (event.key === 'Enter') {
    handleSearch();
  }
});

searchButton.addEventListener('click', handleSearch);

async function getWeatherData(location) {
  const URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${API_KEY}`;
  try {
    const response = await fetch(URL, {mode: "cors"});
    const json = await response.json();
    console.log(json);

  } catch (error) {
    console.error(error);
  }
}

function handleSearch() {
  const value = searchInput.value.trim().toLowerCase();
  if (value !== '') {
    getWeatherData(value);
  }
}