$(document).ready(function() {
 
  var weatherData, lat, lon;

  //   Get Geolocation
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      lat = position.coords.latitude;
      lon = position.coords.longitude;

      weatherData = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=020078e92c1f85276822a658ef17b9ac";

      var date = new Date();
      var hour = date.getHours();

      //  Images
      var cloudImg = "<img src='Images/cloudy.png'>";
      var partcloudImg = "<img src='Images/partly-cloudy.png'>"
      var sunImg = "<img src='Images/sunny.png'>";
      var snowImg = "<img src='Images/snow.png'>";
      var rainImg = "<img src='Images/rain.png'>";
      var fogImg = "<img src='Images/fog.png'>";
      var windImg = "<img src='Images/wind.png'>";
      var clearNightImg = "<img src='Images/clear-night.png'>";

      $.getJSON(weatherData, function(data) {
        var temp = data.main.temp;
        var skyView = data.weather[0].main;

      $('#degrees').html(parseInt(temp));
        
      $("button").click(function() {
        if (unitConvert === false) {
          $("#units").html("&#x2103");
          $('#degrees').html(parseInt(celsius));  
            unitConvert = true;
        } else {
          $("#units").html("&#8457");
          $('#degrees').html(parseInt(temp));
            unitConvert = false;
        }
      });

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