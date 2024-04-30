// WeatherApp.js

import React, { useState } from 'react';
import './WeatherApp.css';

import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";
import strom_icon from "../Assets/strom.png";
import humidity_icon from "../Assets/humidity.png"; 
import fog_icon from "../Assets/fog.png";

export const WeatherApp = () => {
  let api_key = "e9da5dc8528207942be18573f740a8d2"

  const [wicon, setWicon] = useState(cloud_icon);

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      return 0;
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
    let response = await fetch(url);
    let data = await response.json();
    
    const humidity = document.getElementsByClassName("humidity-percent");
    const wind = document.getElementsByClassName("wind-rate");
    const temprature = document.getElementsByClassName("weather-temp");
    const location = document.getElementsByClassName("weather-location");
    
    humidity[0].innerHTML = data.main.humidity+ " %";
    wind[0].innerHTML = data.wind.speed+ " km/hr";
    temprature[0].innerHTML = Math.floor(data.main.temp)+"°C";
    location[0].innerHTML = data.name;

    // Set weather icon based on weather condition
    switch (data.weather[0].icon) {
      case "01d":
      case "01n":
        setWicon(clear_icon);
        break;
      case "02d":
      case "02n":
        setWicon(cloud_icon);
        break;
      case "03d":
      case "03n":
        setWicon(drizzle_icon);
        break;
      case "04d":
      case "04n":
        setWicon(cloud_icon);
        break;
      case "09d":
      case "09n":
        setWicon(rain_icon);
        break;
      case "10d":
      case "10n":
        setWicon(rain_icon);
        break;
      case "11d":
      case "11n":
        setWicon(strom_icon);
        break;
      case "13d":
      case "13n":
        setWicon(snow_icon);
        break;
      case "50d":
      case "50n":
        setWicon(fog_icon);
        break;
      default:
        setWicon(clear_icon);
        break;
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  return (
    <div className='container'>
      <div className="top-bar">
        <input
          type="text"
          className="cityInput"
          placeholder="Enter City Name"
          onKeyPress={handleKeyPress}
        />
        <div className="search-icon" onClick={search}>
          <img src={search_icon} alt="" />
        </div>
      </div>
      <div className="weather-image">
        <img src={wicon} alt="" />
      </div>
      <div className="weather-temp"></div>
      <div className="weather-location"></div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percent"></div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="" className="icon" />
          <div className="data">
            <div className="wind-rate"></div>
            <div className="text">Wind speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
