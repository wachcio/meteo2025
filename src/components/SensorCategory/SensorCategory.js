// src/components/SensorCategory/SensorCategory.js
import React from 'react';
import './SensorCategory.css';
import SensorCard from '../SensorCard/SensorCard';

function SensorCategory({ title, sensors, onSensorClick }) {
  return (
    <div className="sensor-category">
      <h2 className="category-title">{title}</h2>

      <div className="sensors-grid">
        {sensors.map((sensor) => (
          <SensorCard
            key={sensor.sensorName}
            sensor={sensor}
            onClick={() => onSensorClick(sensor)}
          />
        ))}
      </div>
    </div>
  );
}

export default SensorCategory;
