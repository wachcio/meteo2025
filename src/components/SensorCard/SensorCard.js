// src/components/SensorCard/SensorCard.js
import React from 'react';
import './SensorCard.css';

function SensorCard({ sensor, onClick }) {
  const formatValue = (value, unit) => {
    if (value === null || value === undefined) return 'N/A';

    // Konwersja wartości na liczbę jeśli jest stringiem
    const numValue = typeof value === 'string' ? parseFloat(value) : value;

    // Formatowanie liczby do jednego miejsca po przecinku
    return `${parseFloat(numValue).toFixed(1)}${unit}`;
  };

  return (
    <div className="sensor-card" onClick={onClick}>
      <div className="sensor-name">{sensor.sensorName}</div>

      <div className="sensor-image-container">
        <img
          src={`https://meteo.wachcio.pl/assets/${sensor.picture}`}
          alt={sensor.sensorName}
          className="sensor-image"
        />
      </div>

      <div className="sensor-value">
        <div className="current-value">
          {formatValue(sensor.valueCurrent.value, sensor.unit)}
        </div>

        <div className="max-value">
          <span className="arrow-up">&#9650;</span>
          <span className="value-text">
            {formatValue(sensor.valueMax.value, sensor.unit)}
          </span>
        </div>

        <div className="min-value">
          <span className="arrow-down">&#9660;</span>
          <span className="value-text">
            {formatValue(sensor.valueMin.value, sensor.unit)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default SensorCard;
