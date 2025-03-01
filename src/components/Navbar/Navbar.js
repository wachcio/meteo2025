import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>Meteo System</h1>
      </div>

      <button className="navbar-toggle" onClick={toggleMenu}>
        <span className="menu-icon">☰</span>
      </button>

      <ul className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Aktualne odczyty
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/archive"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Odczyty archiwalne
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            O projekcie
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
