import React from 'react';
import '../styles/Loading.css'; // Asegúrate de crear este archivo para los estilos

const Loading: React.FC = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
    </div>
  );
};

export default Loading;
