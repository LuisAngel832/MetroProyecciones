import '../assets/css/Gestiondeboletos.css';
import { useState, useEffect } from 'react';
import Header from '../Conponentes/header';
import MiniMenu from '../Conponentes/MiniMenu';
import ShowList from '../Conponentes/ShowList';
import SeatMap from '../Conponentes/SeatMap';
import ActionButtons from '../Conponentes/ActionButtons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ConfirmationScreen from '../Conponentes/ConfirmationScreen';

const Gestiondeboletos = () => {
    const [mostrarBarraBusqueda, setMostrarBarraBusqueda] = useState(false);
    const [mostrarCalendario, setMostrarCalendario] = useState(false);
    const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
    const [asientosSeleccionados, setAsientosSeleccionados] = useState([]); 
    const [funciones, setFunciones] = useState([]); // Datos dinámicos
    const [funcionSeleccionada, setFuncionSeleccionada] = useState(null); // Función seleccionada
    const [asientosOcupados, setAsientosOcupados] = useState([]); // Asientos ocupados
    const [asientosAComprar, setAsientosAComprar] = useState([]); 
    const [textoBusqueda, setTextoBusqueda] = useState(''); // Estado para el texto de búsqueda

    const AsientosAComprar = (asiento) => {
        if (asientosOcupados.includes(asiento)) return;

        if (!asientosSeleccionados.includes(asiento)) {
            setAsientosSeleccionados([...asientosSeleccionados, asiento]);
        }
    };

    const obtenerAsientosOcupados = async (funcionId) => {
        try {
            const respuesta = await fetch(`http://localhost:8080/api/compra/asientos-ocupados/${funcionId}`);
            if (!respuesta.ok) {
                throw new Error('Error al obtener los asientos ocupados');
            }
            const asientosOcupados = await respuesta.json();
            setAsientosOcupados(asientosOcupados);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleSetFuncionSeleccionada = (funcion) => {
        setFuncionSeleccionada(funcion);
        setAsientosSeleccionados([]); 
        obtenerAsientosOcupados(funcion.id);
        console.log(funcion);
    };

    const onConfirm = () => {
        setMostrarConfirmacion(false);
    };
    
    const toggleSearchBar = () => {
        setMostrarBarraBusqueda(prev => !prev);
        // Cerrar el calendario si está abierto
        if (mostrarCalendario) {
            setMostrarCalendario(false);
        }
    };

 

    const handleNextClick = () => {
        if (asientosSeleccionados.length > 0 && funcionSeleccionada) {
            console.log("Función seleccionada:", funcionSeleccionada);
            setMostrarConfirmacion(true);
        } else {
            alert("Por favor selecciona al menos un asiento y una función");
        }
    };
    
    const handleBack = () => {
        setMostrarConfirmacion(false);
    };

    useEffect(() => {
        const obtenerFunciones = async () => {
            try {
                const respuesta = await fetch('http://localhost:8080/api/funciones/todas');
                if (!respuesta.ok) {
                    throw new Error('Error al obtener las funciones');
                }
                const data = await respuesta.json();
                setFunciones(data);
                console.log(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        obtenerFunciones();
    }, []);

    // Filtrar funciones según el texto de búsqueda
    const funcionesFiltradas = funciones.filter(funcion => 
        funcion.pelicula.titulo.toLowerCase().includes(textoBusqueda.toLowerCase())
    );

    return (
        <>
            <div className="header-container">
                <MiniMenu />
                <Header nombreTitulo={'Venta de Boletos'} />
            </div>
            <section className='gestion-boletos'>
                <div className='gestion-boletos-contenido'>
                    <div className="gestion-boletos-showlist">
                        <div className="showlist-filters">
                            <button className="filter-button" onClick={toggleSearchBar}>Buscar Título</button>
                            
                        </div>

                        {mostrarBarraBusqueda && (
                            <input 
                                type="text" 
                                className="search-bar" 
                                placeholder="Ingrese el título..." 
                                value={textoBusqueda} // Controla el valor del input
                                onChange={(e) => setTextoBusqueda(e.target.value)} // Actualiza el estado
                            />
                        )}

                        {mostrarCalendario && (
                            <div className="datepicker-container">
                                <DatePicker 
                                    selected={null}
                                    onChange={(date) => console.log('Fecha seleccionada:', date)} 
                                    inline
                                />
                            </div>
                        )}

                        <ShowList 
                            funciones={funcionesFiltradas} // Usa las funciones filtradas
                            selectedShow={funcionSeleccionada} 
                            handleSetFuncionSeleccionada={handleSetFuncionSeleccionada}
                        />
                    </div>

                    <div className="gestion-boletos-seat-selection-container">
                        <div className="seat-selection-info">
                            <h1>{funcionSeleccionada ? funcionSeleccionada.pelicula.titulo : ""}</h1>
                            <div className="seat-selection-header">
                                <h2>Cantidad de Asientos: {asientosSeleccionados.length}</h2>
                                <h2 style={{ marginLeft: 'auto' }}>Precio del Boleto: ${asientosSeleccionados.length * (funcionSeleccionada ? funcionSeleccionada.precioBoleto : 0)}</h2>
                            </div>
                            
                            <SeatMap 
                                asientosSeleccionados={asientosSeleccionados} 
                                setAsientosSeleccionados={setAsientosSeleccionados} 
                                asientosOcupados={asientosOcupados} 
                                AsientosAComprar={AsientosAComprar}
                            />
                        </div>
                    </div>
                </div>
                <ActionButtons onNext={handleNextClick} />
            </section>

            {mostrarConfirmacion && funcionSeleccionada && (
                <ConfirmationScreen
                    funcion={funcionSeleccionada}
                    onConfirm={onConfirm}
                    asientosSeleccionados={asientosSeleccionados}
                    onBack={handleBack}
                />
            )}
        </>
    );
};

export default Gestiondeboletos;