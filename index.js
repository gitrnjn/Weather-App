const cityName = document.querySelector('#cityName');
const button = document.querySelector('#searchCity');
const city = document.querySelector('#city');
const temperature = document.querySelector('#temperature');
const description = document.querySelector('#description');
const feelslike = document.querySelector('#feelslike');
const humidity = document.querySelector('#val-data-humid');
const wind = document.querySelector('#val-data-wind');
const pressure = document.querySelector('#val-data-pressure');
const country = document.querySelector('#country');
const icon = document.querySelector('#icon');
const error = document.querySelector('.error');
const disclaimer = document.querySelector('.disclaimer');

const APIKey = "6221f72da9985cae5a381c1c7530fc77";
const URL = "https://api.openweathermap.org/data/2.5/weather?q=";
const iconURL = "http://openweathermap.org/img/wn/";
async function findWeather(){
    const response = await fetch(URL+`${cityName.value}&units=metric&appid=${APIKey}`);
    if(response.status==404){
        error.style.display = "block";
        document.querySelector('.details').style.display ="none";
    }
    else{
        error.style.display = "none";
        const data = await response.json();
        console.log(data);
        city.innerHTML = data.name;
        temperature.innerHTML = Math.floor(data.main.temp)+`°<sup>c</sup>`;
        description.innerHTML = data.weather[0].main;
        const fl_data = Math.round(data.main.feels_like);
        feelslike.innerHTML = `<b>${fl_data}°C</b>`;
        humidity.innerHTML = data.main.humidity+`%`;
        wind.innerHTML = data.wind.speed+` m/s`;
        pressure.innerHTML = data.main.pressure+` hPa`;
        if(data.sys.country==undefined){
            country.innerHTML = "";
        }
        else{
            country.innerHTML = ` ${data.sys.country}`;
        }
        document.querySelector('.details').style.display ="block";
        icon.setAttribute('src',iconURL+`${data.weather[0].icon}.png`);
    }
}
const date = new Date();
disclaimer.innerHTML = `${date.getFullYear()}@Ranjan All Rights Reserved.`;
button.addEventListener('click',()=>{
    findWeather();
});