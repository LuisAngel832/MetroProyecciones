import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MiniMenu from '../Conponentes/MiniMenu';
import Header from '../Conponentes/header';
import '../assets/css/CancelarCompra.css';

const CancelarBoleto = () => {
    const [compras, setCompras] = useState([]);
    const [mensaje, setMensaje] = useState('');
    const [searchTerm, setSearchTerm] = useState(''); 

    
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

    
    const cancelarCompra = async (idCompra) => {
        console.log('ID de compra a cancelar:', idCompra); 
        try {
            const response = await axios.delete(`http://localhost:8080/api/compra/cancelar/${idCompra}`);
            
            if (response.status === 204) {
                alert('Compra cancelada exitosamente.');
                
                setCompras((prevCompras) => prevCompras.filter((compra) => compra.idCompra !== idCompra));
            }
        } catch (error) {
            console.error('Error al cancelar la compra:', error);
            if (error.response) {
                
                if (error.response.status === 404) {
                    alert('La compra no existe.');
                } else {
                    alert('Error al cancelar la compra.');
                }
            } else {
                alert('Error al conectar con el servidor.');
            }
        }
    };

    // Filtrar compras según el término de búsqueda
    const filteredCompras = compras.filter(compra =>
        compra.idCompra.toString().includes(searchTerm) 
    );

    return (
        <div className="cancelar-boleto-container">
            <MiniMenu />
            <Header nombreTitulo={'Cancelar Compra'} />
            
            <div className="busqueda">
                    <input 
                        type="text" 
                        placeholder="Buscar por ID de compra..." 
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)} 
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
