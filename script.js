
var cities = [];
init();

function renderButtons() {
  $("#buttons-view").empty()
  // Deletes the citys prior to adding new citys
  // (this is necessary otherwise you will have repeat buttons)

  // Loops through the array of cities
  for (var i = 0; i < cities.length; i++) {
    // Then dynamicaly generates buttons for each city in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adds a class of city to our button
    a.addClass("cities");
    // Added a data-attribute
    a.attr("data-name", cities[i]);
    // Provided the initial button text
    a.text(cities[i]);
    // Added the button to the buttons-view div

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

});// displaycityInfo function re-renders the HTML to display the appropriate content
function displayCityInfo() {

  var APIKey = "166a433c57516f51dfab1f7edaed8413"; 
  var cityName = $(this).attr("data-name");
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + 
  "&appid=" + APIKey;

  // Creates AJAX call for the specific city button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"

  }).then(function(response) {
    var cityDivEl = $("<div>");
  
    var tempF = (response.main.temp - 273.15) * 1.80 + 32;
  $("#cities-view").text(JSON.stringify(response))
// Methods run on jQuery selectors return the selector they we run on
// This is why we can create and save a reference to a td in the same statement we update its text
    var city = $("<div>").html("<h1>" + response.name + " Weather Details</h1>");
    var temperature = $("<div>").text("Temperature: " + tempF.toFixed(2) +" F");
    var humidity = $("<div>").text( "Humidity: " + response.main.humidity);
    var description = $("<div>").text( "Description:" + response.weather[0].description);
    var wind = $("<div>").text("Wind Speed: " + response.wind.speed);
    var imgURL = response.weather[0].icon;
 // Creating an element to hold the image
   var image = $("<img>").attr("src", "http://openweathermap.org/img/wn/"+ imgURL +"@2x.png");
   



// Append the newly created table data to the table row
    cityDivEl.prepend(city, temperature, humidity, wind, description, image);
// Append the table row to the table body
    $("#cities-view").append(cityDivEl);
    })}

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

// Calling the renderButtons function to display the initial buttons
renderButtons();
