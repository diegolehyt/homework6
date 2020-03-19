

let searchBtn = document.getElementById('searchBtn');



// Initial array of movie titles
let cities = [
    'Santiago',
    'New York'
]

//time variables
let currentDate = new Date();
let cDate = currentDate.getDate();
let cMonth = currentDate.getMonth();
let cYear = currentDate.getFullYear();

let currentDay = cDate + '/' + cMonth + '/' + cYear;
document.getElementById('date').innerHTML = currentDay;
for (let i=0; i < 5 ;i++){
  cDate = cDate + 1;
  document.getElementsByClassName('h6')[i].innerHTML = currentDay;
}

//functions-----------------------------------

let addButtons = function (){
    //input city
    let cityInput = document.getElementById('cityInput').value;
    cities.push(cityInput)
    renderButtons()
}
// Call the renderButtons function to display the initial list of cities
renderButtons()

function displayCityInfo () {
    let cityInput = this.getAttribute('data-cityName')
    let url = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityInput + '&appid=a20945d7ff2c1d7b2d2fb96e4f52ee9f';
    let url2 = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityInput + '&appid=a20945d7ff2c1d7b2d2fb96e4f52ee9f'
    fetch(url)
      .then(function (result) {
        return result.json()
      })
      .then(function (cityData) {
        //current Day
        document.getElementById('mainH').textContent = JSON.stringify(cityData.main.humidity);
        document.getElementById('mainT').textContent = JSON.stringify(cityData.main.temp);
        document.getElementById('cityName').textContent = JSON.stringify(cityData.name);
        document.getElementById('mainW').textContent = JSON.stringify(cityData.wind.speed);
        document.getElementById('UV').textContent = JSON.stringify(cityData.cod); //change UV
        document.getElementById('mainI').src = `http://openweathermap.org/img/wn/${cityData.weather[0].icon}.png`;
        
      })
    fetch(url2)
      .then(function (result) {
        return result.json()
      })
      .then(function (cityData) {
        document.getElementById('day1H').textContent = JSON.stringify(cityData.list[0].main.humidity);
        document.getElementById('day1T').textContent = JSON.stringify(cityData.list[0].main.temp);
      })
}

// Function for displaying city buttons
function renderButtons () {
    
    let cityList = document.getElementById('list');

    cityList.textContent = ''
  
    // Loop through the array of Cities
    cities.forEach(function (cityName) {
              // then dynamicaly generate a button for each movie in the array.
        let newCity = document.createElement('li');
        newCity.classList.add("list-group-item");
        newCity.setAttribute('data-cityName', cityName)
        newCity.textContent = cityName
              // then insert the button into the DOM
        cityList.appendChild(newCity)
              // add a click event listener to call the `displayMovieInfo` function
        newCity.addEventListener('click', displayCityInfo)
    })
}

//Search Button
searchBtn.addEventListener("click", addButtons)




