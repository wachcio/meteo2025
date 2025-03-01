// src/App.js
import React, { useState, useEffect } from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Archive from './pages/Archive/Archive';
import About from './pages/About/About';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import { fetchAllSensorsData } from './services/apiService';

function App() {
  const [sensorData, setSensorData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  useEffect(() => {
    loadSensorData();

    // Odświeżanie danych co minutę (60000 ms)
    const interval = setInterval(loadSensorData, 60000);

    return () => clearInterval(interval);
  }, []);

  const loadSensorData = async () => {
    try {
      setIsLoading(true);
      const data = await fetchAllSensorsData();
      setSensorData(data);
      setLastUpdate(new Date());
      setError(null);
    } catch (err) {
      setError('Nie udało się pobrać danych. Spróbuj ponownie później.');
      console.error('Error fetching sensor data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Stacja meteo Rypin</h1>
      </header>

      <nav className="navigation">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? 'nav-button active' : 'nav-button'
          }
        >
          Odśwież dane
        </NavLink>

        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? 'nav-button active' : 'nav-button'
          }
          end
        >
          Odczyty aktualne
        </NavLink>

        <NavLink
          to="/archive"
          className={({ isActive }) =>
            isActive ? 'nav-button active' : 'nav-button'
          }
        >
          Odczyty archiwalne
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? 'nav-button active' : 'nav-button'
          }
        >
          O projekcie
        </NavLink>
      </nav>

      <main className="content">
        {isLoading && <LoadingSpinner />}

        {error && <ErrorMessage message={error} />}

        {!isLoading && !error && sensorData && (
          <Routes>
            <Route
              path="/"
              element={<Home sensorData={sensorData} lastUpdate={lastUpdate} />}
            />
            <Route path="/archive" element={<Archive />} />
            <Route path="/about" element={<About />} />
          </Routes>
        )}
      </main>

      <footer className="footer">
        <p>
          © {new Date().getFullYear()} Meteo System | Dane aktualizowane
          automatycznie co minutę
        </p>
        {lastUpdate && (
          <p>Ostatnia aktualizacja: {lastUpdate.toLocaleTimeString()}</p>
        )}
      </footer>
    </div>
  );
}

export default App;
