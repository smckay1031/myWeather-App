// DOM Elements 

const search = document.getElementById('bx-search');
const searchTxt = document.getElementById('location')
const mainContainer = document.getElementById('main');

//Event Listeners
search.addEventListener('click', getData);

// Allows Enter to be used to trigger the search button
searchTxt.addEventListener("keypress", (event) => {
    if(event.key == "Enter") {
        event.preventDefault();
        search.click();
    }
});

// Display Whole App After City Input 
const expandWeather = () => {
    mainContainer.style.height = "550px";
    mainContainer.style.width = "400px";
}

//Fetch API function

async function getData() {
    const API = "ab581a3919bb86cabfafac9390177749";
    const city = document.getElementById('location').value;
    const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}&units=imperial`;
    try{
        const response = await fetch(currentWeatherURL);
        if(response.ok) {
            const data = await response.json();
            console.log(data);
            expandWeather();
            displayWeather(data);
        }
    } catch(error) {
        console.log(error);
    }
}

// Displaying Weather From Data 

function displayWeather(data) {

// Data Values To Be Input
    const name = data.name; 
    //from main
    const temp = Math.round(data.main.temp);
    const theFeels = Math.round(data.main.feels_like)
    const high = Math.round(data.main.temp_max);
    const low = Math.round(data.main.temp_min);
    const humidity = data.main.humidity;
    //from wind
    const windSpeed = data.wind.speed;
    // from weather
    const describeWeather = data.weather[0].description;
    const icon = data.weather[0].icon; 
    //test correct data
    //console.log([ name, temp, theFeels, high, low, humidity, windSpeed, windGust, describeWeather, weatherIcon]);
    
    //Elements For data input 
    const location = document.getElementById('name');
    const tempInput = document.getElementById('temp');
    const feelInput = document.getElementById('FL');
    const hi = document.getElementById('hi');
    const lo = document.getElementById("lo");
    const humid = document.getElementById('humid');
    const windSp = document.getElementById('windSp');
    const weatherIcon = document.getElementById("weatherIcon");
    const iconURL = `https://openweathermap.org/img/wn/${icon}@4x.png`;

    //Input Data
    location.innerHTML = `${name}`
    tempInput.innerHTML = `${temp}`;
    feelInput.innerHTML = `${theFeels}`;
    hi.innerHTML = `${high}`;
    lo.innerHTML = `${low}`;
    humid.innerHTML = `${humidity}`;
    windSp.innerHTML = `${windSpeed}`;
    weatherIcon.src = iconURL;
}
