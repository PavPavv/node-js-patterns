import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './app.js';


const root = createRoot(document.getElementsByTagName('body')[0]);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);