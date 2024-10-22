import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../assets/css/DatosHistoricos.css';
import Header from '../Conponentes/header';
import MiniMenuEstadisticas from '../Conponentes/MiniMenuEstadisticas';

const DatosHistoricos = () => {
    const [historicos, setHistoricos] = useState(null); // Cambiar a null para representar que no hay datos aún
    const [loading, setLoading] = useState(true); // Agregar un estado de carga

    useEffect(() => {
        const fetchDatosHistoricos = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/datos-historicos');
                setHistoricos(response.data); // Asigna los datos obtenidos al estado
            } catch (error) {
                console.error('Error al obtener los datos históricos:', error);
            } finally {
                setLoading(false); // Una vez completada la carga, desactivar el estado de carga
            }
        };
        fetchDatosHistoricos();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Mostrar mensaje de carga si aún no se ha completado la solicitud
    }

    if (!historicos) {
        return <div>No se encontraron datos históricos</div>; // Mostrar mensaje de error si no hay datos
    }

    return (
        <>
            <div className="header-container">
                <MiniMenuEstadisticas />
                <Header nombreTitulo={'Datos Historicos'} />
                <Link to="/">
                    <button className="datos-historicos-menu-button">Menu</button>
                </Link>
            </div>
            <section className="datos-historicos-contenedor">
                <div className="datos-historicos-fechas">
                    <div className="fecha-item">
                        <p>INICIO DE DATOS</p>
                        <p>{historicos.fechaInicio || 'N/A'}</p>
                    </div>
                    <div className="fecha-item">
                        <p>FECHA ACTUAL</p>
                        <p>{new Date().toLocaleDateString()}</p>
                    </div>
                </div>

                <div className="datos-historicos-datos">
                    <div className="datos-item">
                        <p>DINERO RECAUDADO</p>
                        <h2>$ {historicos.totalDeVentas ? historicos.totalDeVentas.toFixed(2) : 'N/A'}</h2>
                    </div>
                    <div className="datos-item">
                        <p>ASIENTOS OFERTADOS</p>
                        <h2>{historicos.totalBoletosOfertados || 'N/A'}</h2>
                    </div>
                    <div className="datos-item">
                        <p>ASIENTOS OCUPADOS</p>
                        <h2>{historicos.totalAsientosOcupados || 'N/A'}</h2>
                    </div>
                    <div className="datos-item">
                        <p>NUMERO DE FUNCIONES IMPARTIDAS</p>
                        <h2>{historicos.numeroDeFuncionesImpartidas || 'N/A'}</h2>
                    </div>
                </div>
            </section>
        </>
    );
};

export default DatosHistoricos;
