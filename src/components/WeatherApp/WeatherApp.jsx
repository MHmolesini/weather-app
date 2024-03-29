import React, { useState } from 'react';
import './WeatherApp.css';

import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import humidity_icon from '../assets/humidity.png';
import rain_icon from '../assets/rain.png';
import search_icon from '../assets/search.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';
import pressure_icon from '../assets/pressure.svg'
import visibility_icon from '../assets/visibility.svg'
import cloudiness_icon from '../assets/cloud.svg'

const WeatherApp = () => {
  const [weatherData, setWeatherData] =useState({
    humidity: '',
    windSpeed: '',
    temperature: '',
    pressure: '',
    location: '',
    visibility: '',
    cloudiness: '',
    sunrise: '',
    sunset: '',
    timezone: '',
  })

  let api_key = 'cc1748ec314819603bf02bdc90f68459'

  const [wicon, setWicon] = useState(cloud_icon)

  const search = async () => {
    const element = document.getElementsByClassName('cityInput')
    if(element[0].value==='') {
      return 0
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`

    let response = await fetch(url)
    let data = await response.json()

    console.log(data)

    // const humidity = document.getElementsByClassName('humidity-percent')
    // const wind = document.getElementsByClassName('wind-rate"')
    // const temperature = document.getElementsByClassName('weather-temp')
    // const location = document.getElementsByClassName('weather-location')

    // humidity[0].innerHTML = data.main.humidity+' %';
    // wind[0].innerHTML = data.wind.speed+' km/h';
    // temperature[0].innerHTML = data.main.temp+'°c';
    // location[0].innerHTML = data.name;

    // if (humidity.length > 0) {
    //   humidity[0].innerHTML = data.main.humidity + ' %';
    // }
    // if (wind.length > 0) {
    //   wind[0].innerHTML = data.wind.speed + ' km/h';
    // }
    // if (temperature.length > 0) {
    //   temperature[0].innerHTML = data.main.temp + '°c';
    // }
    // if (location.length > 0) {
    //   location[0].innerHTML = data.name;
    // }

    const timezoneHours = data.timezone / 3600;
    const currentTime = new Date();
    const currentHour = currentTime.getUTCHours() + timezoneHours;
    const currentMinute = currentTime.getUTCMinutes();


    // Valores de las marcas de tiempo UNIX
    const sunriseTimestamp = data.sys.sunrise;
    const sunsetTimestamp = data.sys.sunset;

    // Convertir las marcas de tiempo a objetos de fecha
    const sunriseDate = new Date(sunriseTimestamp * 1000); // Multiplicar por 1000 para convertir de segundos a milisegundos
    const sunsetDate = new Date(sunsetTimestamp * 1000);

    // Formatear las fechas en formato legible
    const options = { hour: 'numeric', minute: 'numeric', timeZone: 'UTC' };
    const formattedSunrise = sunriseDate.toLocaleDateString('es-ES', options);
    const formattedSunset = sunsetDate.toLocaleDateString('es-ES', options);

    setWeatherData({
      humidity: data.main.humidity + ' %',
      windSpeed: data.wind.speed + ' km/h',
      temperature: data.main.temp + '°c',
      pressure: data.main.pressure + ' hPa',
      location: data.name,
      visibility: data.visibility +' km',
      cloudiness: data.clouds.all + ' %',
      sunrise: formattedSunrise,
      sunset: formattedSunset,
      timezone: `${currentHour}:${currentMinute}`,
    });

    if(data.weather[0].icon==='01d' || data.weather[0].icon==='01n') {
      setWicon(clear_icon)
    } else if(data.weather[0].icon==='02d' || data.weather[0].icon==='02n') {
      setWicon(cloud_icon)
    } else if(data.weather[0].icon==='03d' || data.weather[0].icon==='03n') {
      setWicon(drizzle_icon)
    } else if(data.weather[0].icon==='04d' || data.weather[0].icon==='04n') {
      setWicon(drizzle_icon)
    } else if(data.weather[0].icon==='09d' || data.weather[0].icon==='09n') {
      setWicon(rain_icon)
    } else if(data.weather[0].icon==='10d' || data.weather[0].icon==='10n') {
      setWicon(rain_icon)
    } else if(data.weather[0].icon==='13d' || data.weather[0].icon==='13n') {
      setWicon(snow_icon)
    } else {
      setWicon(clear_icon)
    }

  }

  return (
    <div className='container'>
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder='Search'/>
        <div className="search-icon" onClick={() =>{search()}}>
          <img src={search_icon} alt="" />
        </div>
      </div>

      {/* <h1>{weatherData.timezone}</h1> */}

      <div className="weather-image">
        <img src={wicon} alt="" />
      </div>
      <div className="weather-temp">{weatherData.temperature}</div>
      <div className="weather-location">{weatherData.location}</div>
      <div className="weather-location">{weatherData.sunrise}</div>
      <div className="weather-location">{weatherData.sunset}</div>
      <div className="data-container">

        <div className="element">
          <img src={humidity_icon} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percent">{weatherData.humidity}</div>
            <div className="text">Humidity</div>
          </div>
        </div>

        <div className="element">
          <img src={wind_icon} alt="" className="icon" />
          <div className="data">
            <div className="wind-rate">{weatherData.windSpeed}</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>

        <div className="element">
          <img src={pressure_icon} alt="" className="icon" />
          <div className="data">
            <div className="pressure-rate">{weatherData.pressure}</div>
            <div className="text">Pressure</div>
          </div>
        </div>

        <div className="element">
          <img src={visibility_icon} alt="" className="icon" />
          <div className="data">
            <div className="visibility-rate">{weatherData.visibility}</div>
            <div className="text">Visibility</div>
          </div>
        </div>

        <div className="element">
          <img src={cloudiness_icon} alt="" className="icon" />
          <div className="data">
            <div className="cloudiness-rate">{weatherData.cloudiness}</div>
            <div className="text">Cloudiness</div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default WeatherApp;