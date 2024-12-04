document.getElementById('searchInput').addEventListener('keyup', function() {
  getWeather(searchInput.value);
});

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

async function getWeather(country) {
  let api = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7dbf77c7e1804cbd96081537240412&q=${country}&days=3`);
  let response = await api.json();
  displayCurrent(response.current, response.location);
  displayNext(response.forecast.forecastday);
}
getWeather('cairo');

function displayCurrent(current, location) {
  let date = new Date(current.last_updated);
  let col = `
    <div class="col-md-4">
      <div class="forecast current">
        <div class="forecast-head">
          <span class="day">${days[date.getDay()]}</span>
          <span class="date">${date.getDate()} ${months[date.getMonth()]}</span>
        </div>
        <div class="forecast-body">
          <div class="location-country">${location.name}</div>
          <h2 class="degree">${current.temp_c}<sup>o</sup>C</h2>
          <span class="icon">
            <img src="${current.condition.icon}" alt="forecast-icon" />
          </span>
          <h4>${current.condition.text}</h4>
          <div class="d-flex justify-content-around align-items-center">
            <span>
              <img src="https://routeweather.netlify.app/images/icon-umberella.png" alt="" />
              20%
            </span>
            <span>
              <img src="https://routeweather.netlify.app/images/icon-wind.png" alt="" />
              18km/h
            </span>
            <span>
              <img src="https://routeweather.netlify.app/images/icon-compass.png" alt="" />
              East
            </span>
          </div>
        </div>
      </div>
    </div>
  `;
  document.getElementById('rowData').innerHTML = col;
}

function displayNext(data) {
  let col = '';
  for (let i = 1; i < data.length; i++) {
    col += `
      <div class="col-md-4">
        <div class="forecast">
          <div class="day">${days[new Date(data[i].date).getDay()]}</div>
          <div class="forecast-body">
            <span class="icon">
              <img src="${data[i].day.condition.icon}" alt="forecast-icon" />
            </span>
            <h4>${data[i].day.condition.text}</h4>
          </div>
        </div>
      </div>
    `;
  }
  document.getElementById('rowData').innerHTML += col;
}
