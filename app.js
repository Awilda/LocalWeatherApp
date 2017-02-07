$(document).ready(function() {
  $.get("http://ipinfo.io", function(data) {
    $("#location").html(data.city + ", " + data.region);
  }, "jsonp");

  $("button").click(function() {
    $("#units").html("&#x2103");
  });
  
  var weatherData, lat, lon;

  //   Get Geolocation
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      lat = position.coords.latitude;
      lon = position.coords.longitude;

      weatherData = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=020078e92c1f85276822a658ef17b9ac";

      var weatherMetric = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=metric&appid=020078e92c1f85276822a658ef17b9ac"

      var date = new Date();
      var hour = date.getHours();

      //  Images
      var cloudImg = "<img src='https://weather.com/sites/all/modules/custom/angularmods/app/shared/wxicon/svgz/cloudy.svgz?1'>";
      var partcloudImg = "<img src='https://weather.com/sites/all/modules/custom/angularmods/app/shared/wxicon/svgz/partly-cloudy.svgz?1'>"
      var sunImg = "<img src='https://weather.com/sites/all/modules/custom/angularmods/app/shared/wxicon/svgz/sunny.svgz?1'>";
      var snowImg = "<img src='https://weather.com/sites/all/modules/custom/angularmods/app/shared/wxicon/svgz/snow.svgz?1'>";
      var rainImg = "<img src='https://weather.com/sites/all/modules/custom/angularmods/app/shared/wxicon/svgz/rain.svgz?1'>";
      var fogImg = "<img src='https://weather.com/sites/all/modules/custom/angularmods/app/shared/wxicon/svgz/fog.svgz?1'>";
      var windImg = "<img src='https://weather.com/sites/all/modules/custom/angularmods/app/shared/wxicon/svgz/wind.svgz?1'>";
      var clearNightImg = "<img src='https://weather.com/sites/all/modules/custom/angularmods/app/shared/wxicon/svgz/clear-night.svgz?1'>";

      $.getJSON(weatherData, function(data) {
        var temp = data.main.temp;
        var skyView = data.weather[0].main;

        $('#degrees').html(temp);

        if (skyView === "Clouds") {
          $('#weather-image').html(cloudImg);
        } else if (skyView === "Rain" || skyView === "Mist") {
          $('#weather-image').html(rainImg);
        } else if (skyView === "Clear" && hour < 17) {
          $('#weather-image').html(sunImg);
        } else if (skyView === "Clear" && hour > 17) {
          $('#weather-image').html(clearNightImg);
        } else if (skyView === "Snow") {
          $('#weather-image').html(snowImg);
        } else if (skyView === "Fog") {
          $('#weather-image').html(fogImg);
        } else if (skyView === "Wind") {
          $('#weather-image').html(windImg);
        } else {
          $('#weather-image').html("Broken &#9785");
        }
      });

    });
  }
});