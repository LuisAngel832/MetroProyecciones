import React from 'react';
import '../assets/css/MostrarAlerta.css'; 

const MostrarAlerta = ({ mensaje, onClose }) => {
  return (
    <div className="alerta-overlay">
      <div className={`alerta-contenido `}>
        <p>{mensaje}</p>
        <button className="alerta-cerrar" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default MostrarAlerta;
