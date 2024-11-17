import React from 'react';

const DayWeather = ({ day, minTemp, maxTemp, icon }) => {
  return (
    <div className="day-weather">
      <h4>{day}</h4>
      <img src={icon} alt="Weather icon" />
      <div className="temperature">
        <p>{maxTemp}°</p>
        <p className="min-temp">{minTemp}°</p>
      </div>
    </div>
  );
};

export default DayWeather;