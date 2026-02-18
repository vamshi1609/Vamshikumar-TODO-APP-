import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Simple global reset
const style = document.createElement('style');
style.textContent = `
  *, *::before, *::after { box-sizing: border-box; }
  body { margin: 0; padding: 0; }
  input:focus { outline: 2px solid #4f46e5; outline-offset: 1px; }
`;
document.head.appendChild(style);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
