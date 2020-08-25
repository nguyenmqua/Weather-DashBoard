
var cities = [];
init();

console.log(cities)

function renderButtons() {
  $("#buttons-view").empty()
  // Deletes the citys prior to adding new citys
  // (this is necessary otherwise you will have repeat buttons)

  // Loops through the array of cities
  for (var i = 0; i < cities.length; i++) {
    // Then dynamicaly generates buttons for each city in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<li>");
    // Adds a class of city to our button
    a.addClass("cities list-group-item");
    // Added a data-attribute
    a.attr("data-name", cities[i]);
    // Added the button to the buttons-view div
    a.text(cities[i]).css('textTransform', 'capitalize')
    $("#buttons-view").append(a);
  } 
}    

$("#add-cities").on("click", displayCityInfo, function(event) {
  event.preventDefault();
  // This line of code will grab the input from the textbox
  var city = $("#city-input").val().trim();
  // The city from the textbox is then added to our array
  cities.push(city);
  // Calling renderButtons which handles the processing of our city array
  storeCities();
  renderButtons();
  addCityDisplay(city);
  addCityFuture(city);
});// displaycityInfo function re-renders the HTML to display the appropriate content

function addCityDisplay(city){
  $("#cities-view").empty()
  var APIKey = "166a433c57516f51dfab1f7edaed8413"; 
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + 
  "&appid=" + APIKey;

  // Creates AJAX call for the specific city button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"

  }).then(function(response) {
    console.log(response)
    $("#cities-view").empty()
    var cityDivEl = $("<div>");
    cityDivEl.addClass("border border-white")
    var tempF = (response.main.temp - 273.15) * 1.80 + 32;
    var imgURL = response.weather[0].icon;
    var city = $("<div>").html("<h3>" + response.name + " " + " " + moment().format('MMMM Do YYYY') + " " + "<img src ='http://openweathermap.org/img/wn/"+ imgURL +"@2x.png'>"+"</h3>");
    var temperature = $("<div>").text("Temperature: " + tempF.toFixed(2) +" F");
    var humidity = $("<div>").text( "Humidity: " + response.main.humidity);
    var description = $("<div>").text( "Description:  " + response.weather[0].description);
    var wind = $("<div>").text("Wind Speed: " + response.wind.speed);
    
    var lat = response.coord.lat;
    var lon = response.coord.lon;
    var APIKey = "166a433c57516f51dfab1f7edaed8413"; 
    var queryURL = "http://api.openweathermap.org/data/2.5/uvi/forecast?appid=" + APIKey + "&lat=" + lat + "&lon=" + lon 
  
    // Creates AJAX call for the specific city button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
  
    }).then(function(response) {
      var UVI = response[0].value
      var UVIel = $("<div>").text( "UVI: " + UVI);
      if (UVI => 6){
      UVIel.addClass("red")
      }    
      else if (UVI < 3){
      UVIel.addClass("green")
      }
      else{
        UVIel.addClass("yellow")
      }

    cityDivEl.prepend(city, temperature, humidity, wind, description, UVIel);
// Append the table row to the table body
    $("#cities-view").append(cityDivEl);
  })})
}

function displayCityInfo() {
  $("#cities-view").empty()
  var APIKey = "166a433c57516f51dfab1f7edaed8413"; 
  var cityName = $(this).attr("data-name");
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + 
  "&appid=" + APIKey;

  // Creates AJAX call for the specific city button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"

  }).then(function(response) {
    console.log(response)
    $("#cities-view").empty()
    var cityDivEl = $("<div>");
    cityDivEl.addClass("border border-white")
    var tempF = (response.main.temp - 273.15) * 1.80 + 32;
    var imgURL = response.weather[0].icon;
    var city = $("<div>").html("<h3>" + response.name + " " + " " + moment().format('MMMM Do YYYY') + " " + "<img src ='http://openweathermap.org/img/wn/"+ imgURL +"@2x.png'>"+"</h3>");
    var temperature = $("<div>").text("Temperature: " + tempF.toFixed(2) +" F");
    var humidity = $("<div>").text( "Humidity: " + response.main.humidity);
    var description = $("<div>").text( "Description:" + response.weather[0].description);
    var wind = $("<div>").text("Wind Speed: " + response.wind.speed);
    var lat = response.coord.lat;
    var lon = response.coord.lon;
    var APIKey = "166a433c57516f51dfab1f7edaed8413"; 
    var queryURL = "http://api.openweathermap.org/data/2.5/uvi/forecast?appid=" + APIKey + "&lat=" + lat + "&lon=" + lon 
  
    // Creates AJAX call for the specific city button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
  
    }).then(function(response) {
      var UVI = response[0].value
      var UVIel = $("<div>").text( "UVI: " + UVI);
      if (UVI => 6){
      UVIel.addClass("red")
      }    
      else if (UVI < 3){
      UVIel.addClass("green")
      }
      else{
        UVIel.addClass("yellow")
      }

    cityDivEl.prepend(city, temperature, humidity, wind, description, UVIel);
// Append the table row to the table body
    $("#cities-view").append(cityDivEl);
  })})
}

function displayFuture() {
    $("#future-view").empty()
      var APIKey = "166a433c57516f51dfab1f7edaed8413"; 
      var cityName = $(this).attr("data-name");
      var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + 
      "&appid=" + APIKey;
    
      // Creates AJAX call for the specific city button being clicked
      $.ajax({
        url: queryURL,
        method: "GET"
    
      }).then(function(response) {        
        var future = [response.list[6],response.list[14],response.list[22],response.list[30],response.list[38]]
    
        for(let i = 0; i < future.length; i++){ 
        var futureDivEL = $("<div>");
        futureDivEL.addClass("card text-white bg-primary pb-4 mr-2 p-1 round float-left")
        futureDivEL.attr("style","max-width: 10rem")
        var tempF = (future[i].main.temp - 273.15) * 1.80 + 32;
        var city = $("<div>").html("<p>" + moment(future[i].dt_txt).format('MMMM Do YYYY') + "</p>");
        var temperature = $("<div>").text("Temperature: " + tempF.toFixed(2) +" F");
        var humidity = $("<div>").text( "Humidity: " + future[i].main.humidity + "%");
        var imgURL = future[i].weather[0].icon;
        var image = $("<img>").attr("src", "http://openweathermap.org/img/wn/"+ imgURL +"@2x.png",).attr("width","50px");
   
    futureDivEL.prepend( city, image, temperature, humidity, );
// Append the table row to the table body
    $("#future-view").append(futureDivEL)

  }})
}

function addCityFuture(city){
  $("#future-view").empty()
      var APIKey = "166a433c57516f51dfab1f7edaed8413"; 
      var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + 
      "&appid=" + APIKey;
    
      // Creates AJAX call for the specific city button being clicked
      $.ajax({
        url: queryURL,
        method: "GET"
    
      }).then(function(response) {        
        var future = [response.list[6],response.list[14],response.list[22],response.list[30],response.list[38]]
    
        for(let i = 0; i < future.length; i++){ 
        var futureDivEL = $("<div>");
        futureDivEL.addClass("card text-white bg-primary pb-4 mr-2 p-1 round float-left")
        futureDivEL.attr("style","max-width: 10rem")
        var tempF = (future[i].main.temp - 273.15) * 1.80 + 32;
        var city = $("<div>").html("<p>" + moment(future[i].dt_txt).format('MMMM Do YYYY') + "</p>");
        var temperature = $("<div>").text("Temperature: " + tempF.toFixed(2) +" F");
        var humidity = $("<div>").text( "Humidity: " + future[i].main.humidity + "%");
        var imgURL = future[i].weather[0].icon;
        var image = $("<img>").attr("src", "http://openweathermap.org/img/wn/"+ imgURL +"@2x.png",).attr("width","50px");
   
    futureDivEL.prepend( city, image, temperature, humidity, );
// Append the table row to the table body
    $("#future-view").append(futureDivEL);
}})

}

function init() {
      // Get stored city from localStorage
      // Parsing the JSON string to an object
      var storedCities = JSON.parse(localStorage.getItem("city"));
    
      // If city were retrieved from localStorage, update the city array to it
      if (storedCities !== null) {
        cities = storedCities;
      }
    
     
      renderButtons();
}

function storeCities() {
  
  localStorage.setItem("city", JSON.stringify(cities));
}
// This function handles events where the add city button is clicked

$(document).on("click", ".cities", displayCityInfo);
$(document).on("click", ".cities", displayFuture);

// Calling the renderButtons function to display the initial buttons
renderButtons();
