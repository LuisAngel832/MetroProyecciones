import { useState, useEffect } from 'react'; 
import '../assets/css/Estadisticas.css';
import Header from '../Conponentes/header';
import MiniMenuEstadisticas from '../Conponentes/MiniMenuEstadisticas';
import axios from 'axios';

const Estadisticas = () => {
    const [estadisticasGenerales, setEstadisticasGenerales] = useState({});
    const [funcionMasPopular, setFuncionMasPopular] = useState('');
    const [porcentajeAsistencia, setPorcentajeAsistencia] = useState(0);

    // Función para obtener las estadísticas generales del backend
    const fetchEstadisticasGenerales = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/estadisticas/generales');
            setEstadisticasGenerales(response.data);
        } catch (error) {
            console.error('Error al obtener estadísticas generales:', error);
        }
    };

    // Función para obtener la función más popular
    const fetchFuncionMasPopular = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/estadisticas/popular');
            setFuncionMasPopular(response.data);
        } catch (error) {
            console.error('Error al obtener la función más popular:', error);
        }
    };

    // Función para obtener el porcentaje de asistencia
    const fetchPorcentajeAsistencia = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/estadisticas/asistencia');
            setPorcentajeAsistencia(response.data);
        } catch (error) {
            console.error('Error al obtener el porcentaje de asistencia:', error);
        }
    };

    // Obtener los datos al montar el componente
    useEffect(() => {
        fetchEstadisticasGenerales();
        fetchFuncionMasPopular();
        fetchPorcentajeAsistencia();
    }, []);

    return (
        <>
            <div className="header-container">
                <MiniMenuEstadisticas />
                <Header nombreTitulo={'Ultimas Dos Semanas'} />
            </div>
            <section className="estadisticas-contenedor">
                <div className="estadisticas-fechas">
                    <div className="fecha-item">
                        <p>INICIO DE DATOS</p>
                        <p>14/10/2024</p>
                    </div>
                    <div className="fecha-item">
                        <p>FIN DE DATOS</p>
                        <p>28/10/2024</p>
                    </div>
                    <div className="fecha-item">
                        <p>FECHA ACTUAL</p>
                        <p>{new Date().toLocaleDateString()}</p>
                    </div>
                </div>

                <div className="estadisticas-datos">
                    <div className="estadisticas-column-izquierda">
                        <div className="estadistica-item">
                            <p>DINERO RECAUDADO</p>
                            <h2>$ {estadisticasGenerales.totalDeVentas?.toFixed(2) || '0.00'}</h2>
                        </div>
                        <div className="estadistica-item">
                            <p>ASIENTOS OFERTADOS</p>
                            <h2>{estadisticasGenerales.totalBoletosOfertados || 0}</h2>
                        </div>
                        <div className="estadistica-item">
                            <p>ASIENTOS OCUPADOS</p>
                            <h2>{estadisticasGenerales.totalAsientosOcupados || 0}</h2>
                        </div>
                        <div className="estadistica-item">
                            <p>NUMERO DE FUNCIONES IMPARTIDAS</p>
                            <h2>{estadisticasGenerales.numeroDeFuncionesImpartidas || 0}</h2>
                        </div>
                    </div>

                    <div className="estadisticas-column-derecha">
                        <div className="estadistica-item">
                            <p>PORCENTAJE DE ASISTENCIA</p>
                            <h2>{porcentajeAsistencia.toFixed(2)}%</h2>
                        </div>
                        <div className="estadistica-item">
                            <p>FUNCION MAS POPULAR</p>
                            <h2>{funcionMasPopular || 'N/A'}</h2>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Estadisticas;
