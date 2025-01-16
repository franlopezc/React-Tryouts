// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client'; // React 18 usa ReactDOM.createRoot
import { Provider } from 'react-redux'; // Conecta Redux con React
import { store } from './app/store'; // Importa el store configurado
import App from './App'; // Componente principal
import './index.css'; // Opcional, estilos

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
