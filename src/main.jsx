import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Production protections to prevent DevTools inspection & reverse engineering
if (import.meta.env.PROD) {
  // Disable right-click context menu
  document.addEventListener('contextmenu', (e) => e.preventDefault());

  // Disable inspect keys, view source, and save shortcuts
  document.addEventListener('keydown', (e) => {
    if (
      e.keyCode === 123 || // F12
      (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) || // Ctrl+Shift+I/J/C
      (e.ctrlKey && e.keyCode === 85) || // Ctrl+U
      (e.ctrlKey && e.keyCode === 83) || // Ctrl+S
      (e.metaKey && e.altKey && (e.keyCode === 73 || e.keyCode === 74)) // Cmd+Opt+I/J (Mac)
    ) {
      e.preventDefault();
    }
  });

  // Infinite debugger loop to freeze the browser if DevTools is opened
  setInterval(() => {
    (function() {
      const handler = function() {
        debugger;
      };
      handler();
    })();
  }, 100);
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
