

let searchBtn = document.getElementById('searchBtn');



// Initial array of city names
let cities = []

if (localStorage.getItem('LScities') !== null){
  cities = localStorage.getItem('LScities');
  cities = JSON.parse(cities);
}

//time variables
let currentDate = new Date();
let cDate = currentDate.getDate();
let cMonth = currentDate.getMonth();
let cYear = currentDate.getFullYear();

let currentDay = cDate + '/' + cMonth + '/' + cYear;
document.getElementById('date').innerHTML = currentDay;
for (let i=0; i < 5 ;i++){
  cDate = cDate + 1;
  currentDay = cDate + '/' + cMonth + '/' + cYear;
  document.getElementsByClassName('h6')[i].innerHTML = currentDay;
}

//functions-----------------------------------

let addButtons = function (){
    //input city
    let cityInput = document.getElementById('cityInput').value;
    cities.push(cityInput)
    //Set in LS
    LScities = cities;
    LScities = JSON.stringify(LScities);
    localStorage.setItem('LScities', LScities);
    renderButtons()

}
// Call the renderButtons function to display the initial list of cities
renderButtons()

function displayCityInfo () {
    let cityInput = this.getAttribute('data-cityName')
    let url = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityInput + '&appid=a20945d7ff2c1d7b2d2fb96e4f52ee9f';
    let url2 = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityInput + '&appid=a20945d7ff2c1d7b2d2fb96e4f52ee9f';
    
    //call Api 1
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
    //call Api 2
    fetch(url2)
      .then(function (result) {
        return result.json()
      })
      .then(function (cityData) {
        //day 1
        document.getElementById('day1H').textContent = JSON.stringify(cityData.list[4].main.humidity);
        document.getElementById('day1T').textContent = JSON.stringify(cityData.list[4].main.temp);
        document.getElementById('day1I').src = `http://openweathermap.org/img/wn/${cityData.list[4].weather[0].icon}.png`;
        //day 2
        document.getElementById('day2H').textContent = JSON.stringify(cityData.list[12].main.humidity);
        document.getElementById('day2T').textContent = JSON.stringify(cityData.list[12].main.temp);
        document.getElementById('day2I').src = `http://openweathermap.org/img/wn/${cityData.list[12].weather[0].icon}.png`;
        //day 3
        document.getElementById('day3H').textContent = JSON.stringify(cityData.list[20].main.humidity);
        document.getElementById('day3T').textContent = JSON.stringify(cityData.list[20].main.temp);
        document.getElementById('day3I').src = `http://openweathermap.org/img/wn/${cityData.list[20].weather[0].icon}.png`;
        //day 4
        document.getElementById('day4H').textContent = JSON.stringify(cityData.list[28].main.humidity);
        document.getElementById('day4T').textContent = JSON.stringify(cityData.list[28].main.temp);
        document.getElementById('day4I').src = `http://openweathermap.org/img/wn/${cityData.list[28].weather[0].icon}.png`;
        //day 5
        document.getElementById('day5H').textContent = JSON.stringify(cityData.list[36].main.humidity);
        document.getElementById('day5T').textContent = JSON.stringify(cityData.list[36].main.temp);
        document.getElementById('day5I').src = `http://openweathermap.org/img/wn/${cityData.list[36].weather[0].icon}.png`;
      })
}

// Function for displaying city buttons
function renderButtons () {
    
    let cityList = document.getElementById('list');

    cityList.textContent = ''
  
    // Loop through the array of Cities
    cities.forEach(function (cityName) {
        // then dynamicaly generate a button for each city in the array.
        let newCity = document.createElement('li');
        newCity.classList.add("list-group-item");
        newCity.setAttribute('data-cityName', cityName)
        newCity.textContent = cityName
        // then insert the button into the DOM
        cityList.appendChild(newCity)
        //click event listener to call the display function
        newCity.addEventListener('click', displayCityInfo)
    })
}

//Search Button
searchBtn.addEventListener("click", addButtons)




