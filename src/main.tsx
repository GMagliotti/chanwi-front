import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from 'react-router';
import './index.css';
import App from './App.tsx';

const root = document.getElementById('root');

ReactDOM.createRoot(root!).render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <App/>
    </BrowserRouter>
  </React.StrictMode>
);
