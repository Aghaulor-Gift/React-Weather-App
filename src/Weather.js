import React, { useState } from 'react';
import axios from 'axios'
import WeatherForecast from './WeatherForecast';
import shecodes_logo from './images/shecodes_logo.png';

import './Weather.css';

function Weather() {
  const [temperature, setTemperature] = useState(null);
  const [city, setCity] = useState("Lagos");
  const [humidity, setHumidity] = useState(null);
  const [wind, setWind] = useState(null);
  const [icon, setIcon] = useState(null);
  const [description, setDescription] = useState(null);
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  const apiKey = "97bed167ec49bff56e6c1b63daef9c86";

  function handleSearchInput(event) {
    setCity(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    search(city);
  }

  function handleResponse(response) {
    setTemperature(response.data.main.temp);
    setHumidity(response.data.main.humidity);
    setDescription(response.data.weather[0].description);
    setWind(response.data.wind.speed);
    setIcon(response.data.weather[0].icon);

    // Get current time and date
    const currentDate = new Date();
    const options = { weekday: "long", hour: "2-digit", minute: "2-digit" };
    setTime(currentDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    setDate(currentDate.toLocaleDateString("en-US", options));
  }

  function search(city) {
    const units = "metric";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(handleResponse);
  }

  return (
    <div className="weather-container">
      <img className="shecodes_logo" src={shecodes_logo} alt="SheCodes logo" />
      <form className="search" onSubmit={handleSubmit}>
        <input
          className="city-search"
          type="search"
          placeholder="Enter a city"
          value={city}
          onChange={handleSearchInput}
        />
        <input className="btn btn-primary" type="submit" value="Search" />
      </form>
  
      <div className="row">
        <div className="col-6">
          <ul className="city-weather">
            <li className="city">{city}</li>
            <li>
              {date}, {description}
            </li>
            <li>
            <span>Humidity:<strong>{humidity}%</strong> </span>, <span>Wind: <strong>{wind} km/h</strong></span>
            </li>
          </ul>
        </div>
        <div className="col-6">
          <ul className="weather-temperature">
            <li>
              <img className="weather-icon"
                src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                alt="Icon"
              />
            </li>
            <li className="temperature-description">
              <p className="temperature-value" >{Math.round(temperature)}</p>
              <p className="temperature-unit">°C</p>
            </li>  
          </ul>
        </div>
      </div>
  
      <div className="weather-forecast-container">
         <WeatherForecast city={city} />
      </div>
  
      <footer>
        <p>
          This project was coded by
          <a
            href="https://github.com/biant"
            rel="noreferrer"
            target="_blank"
          >
            {" "}
            Gift Aghaulor{" "}
          </a>
          and is
          <a
            href="https://github.com/Aghaulor-Gift/React-Weather-App"
            rel="noreferrer"
            target="_blank"
          >
            {" "}
            on GitHub{" "}
          </a>
          and
          <a
            href="https://weather-forecast-app34.netlify.app/"
            rel="noreferrer"
            target="_blank"
          >
            {" "}
            hosted on Netlify
          </a>
        </p>
      </footer>
    </div>
  );
}

export default Weather;
