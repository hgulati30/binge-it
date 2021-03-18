import React from "react";
import ReactDOM from 'react-dom';

// import bootstrap csskit
import 'bootstrap/dist/css/bootstrap.css';
// import bootstrap icons css kit
import 'bootstrap-icons/font/bootstrap-icons.css'
import App from './App'

// entry render
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);