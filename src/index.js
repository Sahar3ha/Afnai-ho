import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// index.js or App.js
import './index.css';


// Include Khalti Checkout script dynamically
const script = document.createElement('script');
script.src = 'https://khalti.com/static/khalti-checkout.js';
script.async = true;
document.body.appendChild(script);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
