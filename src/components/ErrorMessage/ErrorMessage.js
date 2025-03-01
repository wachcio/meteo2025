import React from 'react';
import './ErrorMessage.css';

function ErrorMessage({ message }) {
  return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <h3>Wystąpił błąd</h3>
      <p>{message}</p>
      <button
        className="error-refresh"
        onClick={() => window.location.reload()}
      >
        Odśwież stronę
      </button>
    </div>
  );
}

export default ErrorMessage;
