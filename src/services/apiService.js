// src/services/apiService.js
const API_BASE_URL = 'https://meteo.wachcio.pl/API';

export const fetchAllSensorsData = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/GetJSON.php?data=current`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return { sensors: data }; // Opakowanie w obiekt, aby zachować spójność z resztą kodu
  } catch (error) {
    console.error('Error fetching sensors data:', error);
    throw error;
  }
};

export const fetchArchiveData = async (sensorName, timeframe, date) => {
  try {
    // Zmodyfikuj parametry zgodnie z wymaganiami Twojego API
    const params = new URLSearchParams({
      data: 'archive',
      sensor: sensorName,
      timeframe: timeframe,
      date: date,
    });

    const response = await fetch(`${API_BASE_URL}/GetJSON.php?${params}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching archive data:', error);
    throw error;
  }
};
