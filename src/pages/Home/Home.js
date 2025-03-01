// src/pages/Home/Home.js
import React, { useState } from 'react';
import './Home.css';
import SensorCategory from '../../components/SensorCategory/SensorCategory';
import SensorDetail from '../../components/SensorDetail/SensorDetail';

function Home({ sensorData, lastUpdate }) {
  const [activeSensor, setActiveSensor] = useState(null);

  const handleSensorClick = (sensor) => {
    setActiveSensor(sensor);
  };

  const handleCloseDetail = () => {
    setActiveSensor(null);
  };

  const groupSensorsByCategory = () => {
    if (!sensorData || !sensorData.sensors) return {};

    // Grupowanie sensorów według sensorCategoryTitle
    const grouped = sensorData.sensors.reduce((groups, sensor) => {
      const categoryTitle = sensor.sensorCategoryTitle;
      if (!groups[categoryTitle]) {
        groups[categoryTitle] = [];
      }
      groups[categoryTitle].push(sensor);
      return groups;
    }, {});

    // Sortowanie kategorii według sensorCategoryNr pierwszego sensora w każdej kategorii
    // i sortowanie sensorów w każdej kategorii
    const sortedGroups = {};

    // Pobierz wszystkie kategorie i posortuj je według sensorCategoryNr
    const sortedCategories = Object.keys(grouped).sort((a, b) => {
      const aNr = grouped[a][0].sensorCategoryNr || 0;
      const bNr = grouped[b][0].sensorCategoryNr || 0;
      return aNr - bNr;
    });

    // Dodaj posortowane sensory do posortowanych kategorii
    sortedCategories.forEach((category) => {
      sortedGroups[category] = grouped[category].sort((a, b) => {
        // Możesz dodać tutaj dodatkowe kryteria sortowania jeśli potrzeba
        return a.sensorName.localeCompare(b.sensorName);
      });
    });

    return sortedGroups;
  };

  const sensorGroups = groupSensorsByCategory();

  return (
    <div className="home">
      {Object.keys(sensorGroups).map((categoryTitle, index) => (
        <div key={categoryTitle}>
          <SensorCategory
            title={categoryTitle}
            sensors={sensorGroups[categoryTitle]}
            onSensorClick={handleSensorClick}
          />

          {/* Dodaj separator między kategoriami, ale nie po ostatniej kategorii */}
          {index < Object.keys(sensorGroups).length - 1 && (
            <div className="category-divider"></div>
          )}
        </div>
      ))}

      {activeSensor && (
        <SensorDetail sensor={activeSensor} onClose={handleCloseDetail} />
      )}
    </div>
  );
}

export default Home;
