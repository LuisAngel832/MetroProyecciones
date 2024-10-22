import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MiniMenu from '../Conponentes/MiniMenu';
import Header from '../Conponentes/header';
import '../assets/css/CancelarCompra.css';

const CancelarBoleto = () => {
    const [compras, setCompras] = useState([]);
    const [mensaje, setMensaje] = useState('');
    const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda

    // Obtener las compras realizadas al cargar el componente
    useEffect(() => {
        const obtenerCompras = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/compra/todas');
                setCompras(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error al obtener las compras:', error);
                setMensaje('No se pudieron cargar las compras.');
            }
        };
    
        obtenerCompras();
    }, []);

    // Función para cancelar una compra
    const cancelarCompra = async (idCompra) => {
        console.log('ID de compra a cancelar:', idCompra); // Para depuración
        try {
            const response = await axios.delete(`http://localhost:8080/api/compra/cancelar/${idCompra}`);
            
            if (response.status === 204) {
                setMensaje('Compra cancelada exitosamente.');
                // Actualizar la lista eliminando la compra cancelada
                setCompras((prevCompras) => prevCompras.filter((compra) => compra.idCompra !== idCompra));
            }
        } catch (error) {
            console.error('Error al cancelar la compra:', error);
            if (error.response) {
                // Manejo de errores basado en el estado de respuesta
                if (error.response.status === 404) {
                    setMensaje('La compra no existe.');
                } else {
                    setMensaje('Error al cancelar la compra.');
                }
            } else {
                setMensaje('Error al conectar con el servidor.');
            }
        }
    };

    // Filtrar compras según el término de búsqueda
    const filteredCompras = compras.filter(compra =>
        compra.idCompra.toString().includes(searchTerm) // Compara el ID de la compra con el término de búsqueda
    );

    return (
        <div className="cancelar-boleto-container">
            <MiniMenu />
            <Header nombreTitulo={'Cancelar Compra'} />
            {mensaje && <p className="mensaje">{mensaje}</p>}
            <div className="busqueda">
                    <input 
                        type="text" 
                        placeholder="Buscar por ID de compra..." 
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el término de búsqueda
                    />
            </div>
            <div className="main-content">
                
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
                        {filteredCompras.map((compra) => (
                            <tr key={compra.idCompra}>
                                <td>{compra.idCompra}</td>
                                <td>{compra.funcion.pelicula.titulo}</td>
                                <td>${compra.monto.toFixed(2)}</td>
                                <td>
                                    <button onClick={() => cancelarCompra(compra.idCompra)}>Cancelar Compra</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CancelarBoleto;
