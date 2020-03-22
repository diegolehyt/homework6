//--------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------/  Homework 6, Weather Dashboard  /----------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------

// Search Button
let searchBtn = document.getElementById('searchBtn');

// Initial array of city names
let cities = []

//Get cities From LS
if (localStorage.getItem('LScities') !== null){
  cities = localStorage.getItem('LScities');
  cities = JSON.parse(cities);
  display();
}


//time variables
let currentDate = new Date();
let cDate = currentDate.getDate();
let cMonth = currentDate.getMonth() + 1;
let cYear = currentDate.getFullYear();

let currentDay = cDate + '/' + cMonth + '/' + cYear;
document.getElementById('date').innerHTML = currentDay;
for (let i=0; i < 5 ;i++){
  cDate = cDate + 1;
  currentDay = cDate + '/' + cMonth + '/' + cYear;
  document.getElementsByClassName('h6')[i].innerHTML = currentDay;
}

//----------------------------------------------------------/  Functions  /-------------------------------------------------------------------

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

// Display City Weather 
function displayCityInfo () {
    let cityInput = this.getAttribute('data-cityName')
    let url = 'HTTPS://api.openweathermap.org/data/2.5/weather?q=' + cityInput + '&appid=a20945d7ff2c1d7b2d2fb96e4f52ee9f';
    let url2 = 'HTTPS://api.openweathermap.org/data/2.5/forecast?q=' + cityInput + '&appid=a20945d7ff2c1d7b2d2fb96e4f52ee9f';
    
    //---------------------------------------------------/  call Api 1  /--------------------------------------------------------------------
    fetch(url)
      .then(function (result) {
        return result.json()
      })
      .then(function (cityData) {
        //current Day
        document.getElementById('mainH').textContent = JSON.stringify(cityData.main.humidity) + '%';
        document.getElementById('mainT').textContent = Math.round(JSON.stringify(cityData.main.temp) - 273) + ' °C';
        document.getElementById('cityName').textContent = JSON.stringify(cityData.name) + ' -  ';
        document.getElementById('mainW').textContent = JSON.stringify(cityData.wind.speed) + ' m/s';

        document.getElementById('mainI').src = `HTTPS://openweathermap.org/img/wn/${cityData.weather[0].icon}.png`;
        //fetch UV
        let lat = JSON.stringify(cityData.coord.lat);
        let lon = JSON.stringify(cityData.coord.lon);
        let url3 = 'HTTPS://api.openweathermap.org/data/2.5/uvi?appid=a20945d7ff2c1d7b2d2fb96e4f52ee9f&lat=' + lat + '&lon=' + lon;

        //---------------------------------------------------/  call Api 3  /--------------------------------------------------------------------
        fetch(url3)
        .then(function (result) {
          return result.json()
        })
        .then(function (cityData) {
          let UV = document.getElementById('UV');
          UV.textContent = JSON.stringify(cityData.value);
          if (parseFloat(UV.textContent) < 3.00 ){
            UV.style.backgroundColor = "";
            UV.style.backgroundColor = "green";
          }
          else if (parseFloat(UV.textContent) < 6.00){
            UV.style.backgroundColor = "";
            UV.style.backgroundColor = "yellow";
          }
          else if (parseFloat(UV.textContent) < 8.00){
            UV.style.backgroundColor = "";
            UV.style.backgroundColor = "orange";
          }
          else if (parseFloat(UV.textContent) >= 8.00){
            UV.style.backgroundColor = "";
            UV.style.backgroundColor = "red";
          }
        })

        
      })
    
    //---------------------------------------------------/  call Api 2  /--------------------------------------------------------------------
    fetch(url2)
      .then(function (result) {
        return result.json()
      })
      .then(function (cityData) {
        //day 1
        document.getElementById('day1H').textContent = JSON.stringify(cityData.list[7].main.humidity) + '%';
        document.getElementById('day1T').textContent = Math.ceil(JSON.stringify(cityData.list[7].main.temp) - 273) + ' °C';
        document.getElementById('day1I').src = `HTTPS://openweathermap.org/img/wn/${cityData.list[7].weather[0].icon}.png`;
        //day 2
        document.getElementById('day2H').textContent = JSON.stringify(cityData.list[15].main.humidity) + '%';
        document.getElementById('day2T').textContent = Math.ceil(JSON.stringify(cityData.list[15].main.temp) - 273) + ' °C';
        document.getElementById('day2I').src = `HTTPS://openweathermap.org/img/wn/${cityData.list[15].weather[0].icon}.png`;
        //day 3
        document.getElementById('day3H').textContent = JSON.stringify(cityData.list[23].main.humidity) + '%';
        document.getElementById('day3T').textContent = Math.ceil(JSON.stringify(cityData.list[23].main.temp) - 273) + ' °C';
        document.getElementById('day3I').src = `HTTPS://openweathermap.org/img/wn/${cityData.list[23].weather[0].icon}.png`;
        //day 4
        document.getElementById('day4H').textContent = JSON.stringify(cityData.list[31].main.humidity) + '%';
        document.getElementById('day4T').textContent = Math.ceil(JSON.stringify(cityData.list[31].main.temp) - 273) + ' °C';
        document.getElementById('day4I').src = `HTTPS://openweathermap.org/img/wn/${cityData.list[31].weather[0].icon}.png`;
        //day 5
        document.getElementById('day5H').textContent = JSON.stringify(cityData.list[39].main.humidity) + '%';
        document.getElementById('day5T').textContent = Math.ceil(JSON.stringify(cityData.list[39].main.temp) - 273) + ' °C';
        document.getElementById('day5I').src = `HTTPS://openweathermap.org/img/wn/${cityData.list[39].weather[0].icon}.png`;
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

//----------------------------------------------------------/  Search Button  /-------------------------------------------------------------
searchBtn.addEventListener("click", addButtons)
searchBtn.addEventListener("click", display )

function display (){
  
  let j = cities.length - 1;
  let cityInput = cities[j];
  let url = 'HTTPS://api.openweathermap.org/data/2.5/weather?q=' + cityInput + '&appid=a20945d7ff2c1d7b2d2fb96e4f52ee9f';
  let url2 = 'HTTPS://api.openweathermap.org/data/2.5/forecast?q=' + cityInput + '&appid=a20945d7ff2c1d7b2d2fb96e4f52ee9f';
  
  //call Api 1
  fetch(url)
    .then(function (result) {
      return result.json()
    })
    .then(function (cityData) {
      //current Day
      document.getElementById('mainH').textContent = JSON.stringify(cityData.main.humidity) + '%';
      document.getElementById('mainT').textContent = Math.round(JSON.stringify(cityData.main.temp) - 273) + ' °C';
      document.getElementById('cityName').textContent = JSON.stringify(cityData.name) + ' -  ';
      document.getElementById('mainW').textContent = JSON.stringify(cityData.wind.speed) + ' m/s';

      document.getElementById('mainI').src = `HTTPS://openweathermap.org/img/wn/${cityData.weather[0].icon}.png`;
      //fetch UV
      let lat = JSON.stringify(cityData.coord.lat);
      let lon = JSON.stringify(cityData.coord.lon);
      let url3 = 'HTTPS://api.openweathermap.org/data/2.5/uvi?appid=a20945d7ff2c1d7b2d2fb96e4f52ee9f&lat=' + lat + '&lon=' + lon;
      
      fetch(url3)
      .then(function (result) {
        return result.json()
      })
      .then(function (cityData) {
        let UV = document.getElementById('UV');
        UV.textContent = JSON.stringify(cityData.value);
        if (parseFloat(UV.textContent) < 3.00 ){
          UV.style.backgroundColor = "";
          UV.style.backgroundColor = "green";
        }
        else if (parseFloat(UV.textContent) < 6.00){
          UV.style.backgroundColor = "";
          UV.style.backgroundColor = "yellow";
        }
        else if (parseFloat(UV.textContent) < 8.00){
          UV.style.backgroundColor = "";
          UV.style.backgroundColor = "orange";
        }
        else if (parseFloat(UV.textContent) >= 8.00){
          UV.style.backgroundColor = "";
          UV.style.backgroundColor = "red";
        }
      })

      
    })
  //call Api 2
  fetch(url2)
    .then(function (result) {
      return result.json()
    })
    .then(function (cityData) {
      //day 1
      document.getElementById('day1H').textContent = JSON.stringify(cityData.list[7].main.humidity) + '%';
      document.getElementById('day1T').textContent = Math.ceil(JSON.stringify(cityData.list[7].main.temp) - 273) + ' °C';
      document.getElementById('day1I').src = `HTTPS://openweathermap.org/img/wn/${cityData.list[7].weather[0].icon}.png`;
      //day 2
      document.getElementById('day2H').textContent = JSON.stringify(cityData.list[15].main.humidity) + '%';
      document.getElementById('day2T').textContent = Math.ceil(JSON.stringify(cityData.list[15].main.temp) - 273) + ' °C';
      document.getElementById('day2I').src = `HTTPS://openweathermap.org/img/wn/${cityData.list[15].weather[0].icon}.png`;
      //day 3
      document.getElementById('day3H').textContent = JSON.stringify(cityData.list[23].main.humidity) + '%';
      document.getElementById('day3T').textContent = Math.ceil(JSON.stringify(cityData.list[23].main.temp) - 273) + ' °C';
      document.getElementById('day3I').src = `HTTPS://openweathermap.org/img/wn/${cityData.list[23].weather[0].icon}.png`;
      //day 4
      document.getElementById('day4H').textContent = JSON.stringify(cityData.list[31].main.humidity) + '%';
      document.getElementById('day4T').textContent = Math.ceil(JSON.stringify(cityData.list[31].main.temp) - 273) + ' °C';
      document.getElementById('day4I').src = `HTTPS://openweathermap.org/img/wn/${cityData.list[31].weather[0].icon}.png`;
      //day 5
      document.getElementById('day5H').textContent = JSON.stringify(cityData.list[39].main.humidity) + '%';
      document.getElementById('day5T').textContent = Math.ceil(JSON.stringify(cityData.list[39].main.temp) - 273) + ' °C';
      document.getElementById('day5I').src = `HTTPS://openweathermap.org/img/wn/${cityData.list[39].weather[0].icon}.png`;
    })
  }

//-------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------/    END    /-------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------






