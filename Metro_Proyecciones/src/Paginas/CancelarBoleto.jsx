import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/css/CancelarCompra.css';

const CancelarBoleto = () => {
    const [compras, setCompras] = useState([]);
    const [mensaje, setMensaje] = useState('');

    // Obtener las compras realizadas al cargar el componente
    useEffect(() => {
        const obtenerCompras = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/compra/todas');
                setCompras(response.data);
            } catch (error) {
                console.error('Error al obtener las compras:', error);
                setMensaje('No se pudieron cargar las compras.');
            }
        };
    
        obtenerCompras();
    }, []);
    

    // Función para cancelar una compra
    const cancelarCompra = async (idCompra) => {
        try {
            await axios.delete(`http://localhost:8080/api/compra/cancelar/${idCompra}`);
            setMensaje('Compra cancelada exitosamente.');
            // Actualizar la lista eliminando la compra cancelada
            setCompras((prevCompras) => prevCompras.filter((compra) => compra.id !== idCompra));
        } catch (error) {
            console.error('Error al cancelar la compra:', error);
            setMensaje('Error al cancelar la compra.');
        }
    };

    return (
        <div className="cancelar-boleto-container">
            <h1>Compras Realizadas</h1>
            {mensaje && <p className="mensaje">{mensaje}</p>}

            <table className="tabla-compras">
                <thead>
                    <tr className="tabla-cabecera">
                        <th>ID Compra</th>
                        <th>Película</th>
                        <th>Monto</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {compras.map((compra) => (
                        <tr key={compra.id}>
                            <td>{compra.id}</td>
                            <td>{compra.funcion.pelicula.titulo}</td>
                            <td>${compra.monto.toFixed(2)}</td>
                            <td>
                                <button 
                                    className="btn-cancelar" 
                                    onClick={() => cancelarCompra(compra.id)}
                                >
                                    Cancelar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CancelarBoleto;
