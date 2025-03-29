import React from "react";
import ReactDOM from "react-dom/client";
import { StrictMode } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import './index.css';
import App from './App.tsx';

const root = document.getElementById('root');

ReactDOM.createRoot(root!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
