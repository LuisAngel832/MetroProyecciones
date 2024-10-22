import React from 'react';
import '../assets/css/ShowList.css';

// eslint-disable-next-line react/prop-types
const ListaFunciones = ({ funciones = [], funcionSeleccionada, handleSetFuncionSeleccionada }) => {
    return (
        <div className="show-list-container">
            <table className="show-table">
                <thead>
                    <tr>
                        <th>TÍTULO</th>
                        <th>FECHA Y HORA</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {funciones.length > 0 ? (
                        funciones.map((funcion, index) => (
                            <tr
                                key={index}
                                className={funcionSeleccionada === funcion ? 'selected-row' : ''}
                                onClick={() => handleSetFuncionSeleccionada(funcion)}
                            >
                                <td>{funcion.pelicula.titulo}</td>
                                <td>{`${funcion.fecha} ${funcion.hora}`}</td>
                                <td>{funcion.estado}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">No hay funciones disponibles</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ListaFunciones;
