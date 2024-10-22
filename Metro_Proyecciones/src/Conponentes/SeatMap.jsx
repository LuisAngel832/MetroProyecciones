import React from 'react';
import '../assets/css/SeatMap.css';
import sillaNoSeleccionada from '../assets/img/movieNoSelectecSilla.png';
import sillaSeleccionada from '../assets/img/movieSelectedSilla.png';
import sillaOcupada from '../assets/img/movieStatic.png';
import pantalla from '../assets/img/pantalla.png';

const MapaAsientos = ({ asientosSeleccionados = [], setAsientosSeleccionados, AsientosAComprar, asientosOcupados }) => {
    const filas = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const columnas = Array.from({ length: 11 }, (_, i) => i + 1);

    const handleAsientoClick = (asiento) => {
        // Evita deseleccionar los asientos ocupados
        if (asientosOcupados.includes(asiento)) return;

        if (asientosSeleccionados.includes(asiento)) {
            // Si el asiento ya está seleccionado, lo deselecciona
            setAsientosSeleccionados(asientosSeleccionados.filter(a => a !== asiento));
        } else {
            // Si no está seleccionado, lo agrega a los seleccionados
            setAsientosSeleccionados([...asientosSeleccionados, asiento]);
        }
    };

    return (
        <div className="contenedor-mapa-asientos">
            <img src={pantalla} alt="Pantalla del cine" className="pantalla" />
            {filas.map((etiquetaFila) => (
                <div key={etiquetaFila} className="fila-asientos">
                    <div className="etiqueta-fila">{etiquetaFila}</div>
                    {columnas.map((numeroColumna) => {
                        const idAsiento = `${etiquetaFila}${numeroColumna}`;
                        const estaSeleccionado = asientosSeleccionados?.includes(idAsiento);
                        const estaOcupado = asientosOcupados?.includes(idAsiento);

                        return (
                            <img
                                key={idAsiento}
                                src={
                                    estaOcupado
                                        ? sillaOcupada
                                        : estaSeleccionado
                                        ? sillaSeleccionada
                                        : sillaNoSeleccionada
                                }
                                alt={`Asiento ${idAsiento}`}
                                className={`asiento ${
                                    estaSeleccionado ? 'seleccionado' : ''
                                } ${estaOcupado ? 'ocupado' : ''}`}
                                onClick={() => handleAsientoClick(idAsiento)} // Cambié aquí
                            />
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

export default MapaAsientos;