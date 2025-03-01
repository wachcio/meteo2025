// src/components/SensorDetail/SensorDetail.js
import React from 'react';
import './SensorDetail.css';

function SensorDetail({ sensor, onClose }) {
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';

    // Formatowanie daty
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const formatValue = (value, unit) => {
    if (value === null || value === undefined) return 'N/A';
    return `${parseFloat(value).toFixed(2)}${unit}`;
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <h3 className="modal-title">{sensor.sensorName}</h3>

        <div className="sensor-image-large-container">
          <img
            src={`https://meteo.wachcio.pl//assets/${sensor.picture}`}
            alt={sensor.sensorName}
            className="sensor-image-large"
          />
        </div>

        <div className="sensor-details">
          <div className="detail-item">
            <div className="detail-label">Aktualna wartość:</div>
            <div className="detail-value">
              {formatValue(sensor.valueCurrent.value, sensor.unit)}
            </div>
            <div className="detail-time">
              {formatDate(sensor.valueCurrent.date)}
            </div>
          </div>

          {sensor.valueMin && (
            <div className="detail-item">
              <div className="detail-label">Minimalna wartość (24h):</div>
              <div className="detail-value">
                {formatValue(sensor.valueMin.value, sensor.unit)}
              </div>
              <div className="detail-time">
                {formatDate(sensor.valueMin.date)}
              </div>
            </div>
          )}

          {sensor.valueMax && (
            <div className="detail-item">
              <div className="detail-label">Maksymalna wartość (24h):</div>
              <div className="detail-value">
                {formatValue(sensor.valueMax.value, sensor.unit)}
              </div>
              <div className="detail-time">
                {formatDate(sensor.valueMax.date)}
              </div>
            </div>
          )}

          {sensor.alarmMin !== false && sensor.alarmMin !== '' && (
            <div className="detail-item">
              <div className="detail-label">Alarm - min:</div>
              <div className="detail-value">
                {sensor.alarmMin}
                {sensor.unit}
              </div>
            </div>
          )}

          {sensor.alarmMax !== false && sensor.alarmMax !== '' && (
            <div className="detail-item">
              <div className="detail-label">Alarm - max:</div>
              <div className="detail-value">
                {sensor.alarmMax}
                {sensor.unit}
              </div>
            </div>
          )}

          <div className="detail-item">
            <div className="detail-label">Status:</div>
            <div className="detail-value">
              {sensor.upToDate ? 'Aktualny' : 'Nieaktualny'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SensorDetail;
