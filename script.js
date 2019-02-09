document.getElementById("weatherSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("weatherInput").value;
  if (value === "")
    return;
  console.log(value);

  const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=4faba494e52b922255d2219ca0b5ae15";
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log(json);
      let results = "";
      results += '<h1>Weather in ' + json.name + "</h2>";
      for (let i=0; i < json.weather.length; i++)
      {
        results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
      }
      results += "<p>"
      for (let i=0; i < json.weather.length; i++)
      {
        results += json.weather[i].description
        if (i !== json.weather.length - 1)
          results += ", "
      }
      results += "</p>";
      results += '<h2>' + "Current: " + Math.round(json.main.temp) + " &deg;F</h2>"
      results += '<h2>' + "Max: " + Math.round(json.main.temp_max) + " &deg;F</h2>"
      results += '<h2>' + "Low: " + Math.round(json.main.temp_min) + " &deg;F</h2>"
      results += '<h2>' + "Humidity: " + json.main.humidity + "%</h2>"
      document.getElementById("weatherResults").innerHTML = results;
    });
const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=4faba494e52b922255d2219ca0b5ae15";
fetch(url2)
  .then(function(response) {
    return response.json();
  }).then(function(json) {
    console.log(json);
    let forecast = "";
    for (let i=0; i < json.list.length; i++) {
      forecast += "<h2>" + moment(json.list[i].dt_txt).format('MMMM Do YYYY, h:mm a') + "</h2>";
      forecast += "<p>Temperature: " + Math.round(json.list[i].main.temp) + "&deg;F</p>";
      forecast += '<img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>'
    }
    document.getElementById("forecastResults").innerHTML = forecast;

  });

});
