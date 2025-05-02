import './styles/index.css';

import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowerRouter } from 'react-router-dom';

import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowerRouter>
      <App />
    </BrowerRouter>
  </StrictMode>
);
