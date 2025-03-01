// src/pages/About/About.js
import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about">
      <h2 className="category-header">O projekcie</h2>

      <div className="about-content">
        <section className="about-section">
          <h3 className="section-title">
            System zbierania danych z czujników pogodowych
          </h3>
          <p>
            Projekt rozpoczął się w maju 2016 roku jako system zbierania danych
            z kilkudziesięciu czujników. Od grudnia 2018 roku strona typu SPA
            jest rozwijana przy pomocy frameworka Vue, a teraz React.
          </p>
        </section>

        <section className="about-section">
          <h3 className="section-title">Stacja pogodowa</h3>
          <p>
            Sercem stacji meteo jest mikrokontroler Atmega 32A, który został
            zaprogramowany w języku C. Stacja zbiera informacje z czujników:
          </p>
          <ul className="about-list">
            <li>Temperatury (DS18B20, BME280)</li>
            <li>Wilgotności (BME280)</li>
            <li>Ciśnienia (BME280)</li>
            <li>Wiatru</li>
            <li>Opadów</li>
            <li>Nasłonecznienia (BH1750)</li>
          </ul>
          <p>
            9 lutego 2020 zamieniłem czujnki SHT21 i BMP 180 na jeden BME280,
            który mierzy temperaturę, ciśnienie i wilgotność.
          </p>
        </section>

        <section className="about-section">
          <h3 className="section-title">Pozostałe elementy systemu</h3>
          <p>
            System składa się również z zegarów w salonie i sypialni, które
            wysyłają dane do Raspberry Pi, urządzenia ESP8266 z czujnikiem
            temperatury DS18B20 w akwarium, oraz odpytywania bazy danych Airly o
            dane z czujników jakości powietrza.
          </p>
          <p>
            Dane ze wszystkich części systemu trafiają co minutę do bazy danych
            MySQL na zewnętrznym serwerze. Dane jakości powietrza z Airly
            odczytywane są co kwadrans ze względu na ograniczenia API.
          </p>
        </section>

        <section className="about-section">
          <h3 className="section-title">Funkcjonalność strony</h3>
          <p>
            Ta strona pobiera dane z zewnętrznej bazy poprzez API. Jeśli dane są
            starsze niż 5 minut (16 minut dla czujników jakości powietrza), jest
            to sygnalizowane czerwoną obwódką wokół ikony czujnika.
          </p>
          <p>
            Po kliknięciu na czujnik pokazują się bardziej szczegółowe
            informacje. Natomiast kliknięcie na tytuł kategorii powoduje jej
            ukrycie lub pokazanie.
          </p>
          <p>
            W zakładce "Odczyty archiwalne" można uzyskać podstawowe dane
            statystyczne (odczyt maksymalny, minimalny, średni i w niektórych
            wypadkach sumę) z czujników w danym przedziale czasowym: rok,
            miesiąc, dzień i godzina.
          </p>
        </section>

        <section className="about-section">
          <h3 className="section-title">Technologie</h3>
          <div className="tech-grid">
            <div className="tech-category">
              <h4>Frontend:</h4>
              <ul>
                <li>React.js</li>
                <li>React Router</li>
                <li>Recharts</li>
              </ul>
            </div>

            <div className="tech-category">
              <h4>Backend:</h4>
              <ul>
                <li>REST API</li>
                <li>MySQL</li>
                <li>PHP</li>
              </ul>
            </div>

            <div className="tech-category">
              <h4>Sprzęt:</h4>
              <ul>
                <li>Atmega 32A</li>
                <li>Raspberry Pi</li>
                <li>ESP8266</li>
                <li>Czujniki DS18B20, BME280, BH1750</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;
