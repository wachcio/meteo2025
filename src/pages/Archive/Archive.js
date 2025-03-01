// src/pages/Archive/Archive.js
import React, { useState, useEffect } from 'react';
import './Archive.css';
import {
  fetchAllSensorsData,
  fetchArchiveData,
} from '../../services/apiService';
import ArchiveChart from '../../components/ArchiveChart/ArchiveChart';
import ArchiveStatistics from '../../components/ArchiveStatistics/ArchiveStatistics';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

function Archive() {
  const [selectedSensor, setSelectedSensor] = useState('');
  const [selectedTimeframe, setSelectedTimeframe] = useState('day');
  const [selectedDate, setSelectedDate] = useState(getFormattedDate());
  const [archiveData, setArchiveData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sensorOptions, setSensorOptions] = useState([]);

  // Pobierz dostępne sensory przy pierwszym renderowaniu
  useEffect(() => {
    const loadSensors = async () => {
      try {
        const data = await fetchAllSensorsData();

        if (data && data.sensors) {
          // Przekształć sensory do formatu potrzebnego dla selektora
          const options = data.sensors.map((sensor) => ({
            id: sensor.sensorName,
            name: sensor.sensorName,
          }));

          // Posortuj sensory alfabetycznie
          options.sort((a, b) => a.name.localeCompare(b.name));

          setSensorOptions(options);
        }
      } catch (err) {
        console.error('Error loading sensors for archive:', err);
      }
    };

    loadSensors();
  }, []);

  function getFormattedDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    if (selectedSensor && selectedTimeframe && selectedDate) {
      loadArchiveData();
    }
  }, [selectedSensor, selectedTimeframe, selectedDate]);

  const loadArchiveData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await fetchArchiveData(
        selectedSensor,
        selectedTimeframe,
        selectedDate
      );

      setArchiveData(data);
    } catch (err) {
      setError(
        'Nie udało się pobrać danych archiwalnych. Spróbuj ponownie później.'
      );
      console.error('Error fetching archive data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSensorChange = (e) => {
    setSelectedSensor(e.target.value);
  };

  const handleTimeframeChange = (e) => {
    setSelectedTimeframe(e.target.value);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
    <div className="archive">
      <h2 className="category-header">Odczyty archiwalne</h2>

      <div className="archive-controls">
        <div className="control-group">
          <label>Czujnik:</label>
          <select value={selectedSensor} onChange={handleSensorChange}>
            <option value="">Wybierz czujnik</option>
            {sensorOptions.map((sensor) => (
              <option key={sensor.id} value={sensor.id}>
                {sensor.name}
              </option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label>Przedział czasowy:</label>
          <select value={selectedTimeframe} onChange={handleTimeframeChange}>
            <option value="hour">Godzina</option>
            <option value="day">Dzień</option>
            <option value="month">Miesiąc</option>
            <option value="year">Rok</option>
          </select>
        </div>

        <div className="control-group">
          <label>Data:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            max={getFormattedDate()}
          />
        </div>
      </div>

      {isLoading && <LoadingSpinner />}

      {error && <ErrorMessage message={error} />}

      {!isLoading && !error && archiveData && (
        <div className="archive-results">
          <ArchiveChart
            data={archiveData.readings}
            timeframe={selectedTimeframe}
            sensorName={selectedSensor}
          />

          <ArchiveStatistics
            statistics={archiveData.statistics}
            unit={archiveData.unit}
          />
        </div>
      )}

      {!isLoading && !error && !selectedSensor && (
        <div className="archive-info">
          <p>Wybierz czujnik, aby wyświetlić dane archiwalne.</p>
        </div>
      )}
    </div>
  );
}

export default Archive;
