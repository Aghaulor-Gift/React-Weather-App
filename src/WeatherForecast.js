import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import DayWeather from './DayWeather';
import './Weather.css';

const WeatherForecast = ({ city }) => {
  const [forecast, setForecast] = useState([]);
  const apiKey = "97bed167ec49bff56e6c1b63daef9c86";

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
        );

        const data = response.data;
        const daysOfTheWeek = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
        const dailyWeather = {};

        // Group forecast data by day of the week
        data.list.forEach((entry) => {
          const date = new Date(entry.dt * 1000);
          const dayIndex = date.getDay();

          if (!dailyWeather[dayIndex]) {
            dailyWeather[dayIndex] = {
              day: daysOfTheWeek[dayIndex],
              minTemp: Math.round(entry.main.temp_min),
              maxTemp: Math.round(entry.main.temp_max),
              icon: `https://openweathermap.org/img/wn/${entry.weather[0].icon}@2x.png`,
            };
          }
        });

        setForecast(Object.values(dailyWeather));
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeather();
  }, [city]);

  return (
    <div className="weather-forecast-container">
      {forecast.map((day, index) => (
        <DayWeather
          key={index}
          day={day.day}
          minTemp={day.minTemp}
          maxTemp={day.maxTemp}
          icon={day.icon}
        />
      ))}
    </div>
  );
};

export default WeatherForecast;