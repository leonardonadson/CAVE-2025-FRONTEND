import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BidProvider } from './context/bidContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BidProvider>
      <App />
    </BidProvider>
  </React.StrictMode>,
)
