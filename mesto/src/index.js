import React from 'react';
import ReactDOM from 'react-dom/client';
//import './index.css';
import App from './components/App';


const root = ReactDOM.createRoot(document.getElementById('root')); // контейнер куда все впизнем
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
