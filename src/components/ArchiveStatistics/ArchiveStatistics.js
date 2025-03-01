// src/components/ArchiveStatistics/ArchiveStatistics.js
import React from 'react';
import './ArchiveStatistics.css';

function ArchiveStatistics({ statistics, unit }) {
  if (!statistics) {
    return null;
  }

  const formatValue = (value) => {
    if (value === null || value === undefined) return 'N/A';
    return parseFloat(value).toFixed(2);
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="statistics-container">
      <h3 className="statistics-title">Statystyki</h3>

      <div className="statistics-grid">
        <div className="statistic-card">
          <div className="statistic-icon min-icon">▼</div>
          <div className="statistic-title">Minimum</div>
          <div className="statistic-value">
            {formatValue(statistics.min)} {unit}
          </div>
          <div className="statistic-time">
            {formatDate(statistics.min_time)}
          </div>
        </div>

        <div className="statistic-card">
          <div className="statistic-icon max-icon">▲</div>
          <div className="statistic-title">Maksimum</div>
          <div className="statistic-value">
            {formatValue(statistics.max)} {unit}
          </div>
          <div className="statistic-time">
            {formatDate(statistics.max_time)}
          </div>
        </div>

        <div className="statistic-card">
          <div className="statistic-icon avg-icon">⌀</div>
          <div className="statistic-title">Średnia</div>
          <div className="statistic-value">
            {formatValue(statistics.avg)} {unit}
          </div>
        </div>

        {statistics.sum !== undefined && (
          <div className="statistic-card">
            <div className="statistic-icon sum-icon">∑</div>
            <div className="statistic-title">Suma</div>
            <div className="statistic-value">
              {formatValue(statistics.sum)} {unit}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ArchiveStatistics;
