// main.jsx
import './style.css';
import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from "react-dom/client" instead of "react-dom"
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
