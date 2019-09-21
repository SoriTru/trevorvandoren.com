function getData(url) {
  return fetch(url).then(res => {
    return res.json();
  });
}

function historyLog(location) {
  if (sessionStorage.getItem("History") === null) {
    sessionStorage.setItem("History", location);
  } else {
    sessionStorage.setItem(
      "History",
      location + "," + sessionStorage.getItem("History")
    );
  }

  document.getElementById("search-history").innerHTML = "";

  let searchHistory = sessionStorage.getItem("History").split(",");
  console.log(searchHistory);

  for (let search in searchHistory) {
    document.getElementById("search-history").innerHTML +=
      "<option>" + searchHistory[search] + "</option>";
  }
}

function getWeather(location, log_data) {
  let apiKey = "WUAq8drkrG0l537D2VfW9yFGeb4lq8O2";
  let locationUrl =
    "http://dataservice.accuweather.com/locations/v1/search?apikey=" +
    apiKey +
    "&q=" +
    location;

  // this returns the value of `.then()` anonymous inner function
  getData(locationUrl).then(locationJson => {
    if (typeof locationJson[0] === "undefined") {
      // reset info element text, alert user of failed search
      document.getElementById("info").innerHTML = "";
      document.getElementById("info-alert").innerHTML =
        "Nothing found! Try a different search query.";
    } else {
      // log search if not getting information from history
      if (log_data) {
        historyLog(location);
      }
      // update alert
      document.getElementById("info-alert").innerHTML =
        "Not the result you were looking for? Try being more specific.";

      // location data
      let locationData = locationJson[0];

      document.getElementById("info").innerHTML =
        locationData.Type +
        ": " +
        locationData.LocalizedName +
        "<br>Country: " +
        locationData.Country.LocalizedName +
        "<br>Region: " +
        locationData.Region.LocalizedName +
        "<br>Timezone: " +
        locationData.TimeZone.Code;

      // current weather data
      let currentWeatherUrl =
        "http://dataservice.accuweather.com/currentconditions/v1/search?apikey=" +
        apiKey +
        "&locationkey=" +
        locationData.Key;

      getData(currentWeatherUrl).then(currentWeatherData => {
        document.getElementById("info").innerHTML +=
          "<br>Forecast: " +
          currentWeatherData[0].WeatherText +
          "<br>Current Temp: " +
          currentWeatherData[0].Temperature.Imperial.Value +
          " F";

        // daily weather data
        let weatherUrl =
          "http://dataservice.accuweather.com/forecasts/v1/daily/1day/search?apikey=" +
          apiKey +
          "&locationkey=" +
          locationData.Key;

        getData(weatherUrl).then(weatherData => {
          document.getElementById("info").innerHTML +=
            "<br>High Temp: " +
            weatherData.DailyForecasts[0].Temperature.Maximum.Value +
            " F" +
            "<br>Low Temp: " +
            weatherData.DailyForecasts[0].Temperature.Minimum.Value +
            " F" +
            "<br>Today: " +
            weatherData.DailyForecasts[0].Day.IconPhrase +
            "<br>Tonight: " +
            weatherData.DailyForecasts[0].Night.IconPhrase;
        });
      });
    }
  });
}
