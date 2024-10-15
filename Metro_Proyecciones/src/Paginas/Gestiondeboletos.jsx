import '../assets/css/Gestiondeboletos.css';
import { useState } from 'react';
import Header from '../Conponentes/header';
import MiniMenu from '../Conponentes/MiniMenu';
import ShowList from '../Conponentes/ShowList';
import SeatMap from '../Conponentes/SeatMap';
import ActionButtons from '../Conponentes/ActionButtons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ConfirmationScreen from '../Conponentes/ConfirmationScreen';

const Gestiondeboletos = () => {
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [selectedSeats, setSelectedSeats] = useState([]); // Asientos seleccionados solo para cambiar el color, no para contar

    const shows = [
        { title: 'The Roblox', date: '11-10-2024', time: '16:00 PM', availableSeats: 20 },
        { title: 'The Furros', date: '12-10-2024', time: '19:00 PM', availableSeats: 48 },
        { title: 'The Zotopia', date: '14-10-2024', time: '10:00 AM', availableSeats: 50 },
    ];

    const toggleSearchBar = () => {
        setShowSearchBar(!showSearchBar);
    };

    const toggleCalendar = () => {
        setShowCalendar(!showCalendar);
    };

    const handleNextClick = () => {
        setShowConfirmation(true);
    };

    const handleBack = () => {
        setShowConfirmation(false);
    };

    return (
        <>
            <div className="header-container">
                <MiniMenu />
                <Header nombreTitulo={'Venta de Boletos'} />
            </div>
            <section className='gestion-boletos'>
                <div className='gestion-boletos-contenido'>
                    {/* Cartelera visual sin funcionalidad */}
                    <div className="gestion-boletos-showlist">
                        <div className="showlist-filters">
                            <button className="filter-button" onClick={toggleSearchBar}>Buscar Título</button>
                            <button className="filter-button" onClick={toggleCalendar}>Buscar Fecha</button>
                        </div>
                        {showSearchBar && (
                            <input 
                                type="text" 
                                className="search-bar" 
                                placeholder="Ingrese el título..." 
                            />
                        )}
                        {showCalendar && (
                            <div className="datepicker-container">
                                <DatePicker 
                                    selected={null}
                                    onChange={(date) => console.log('Fecha seleccionada:', date)} 
                                    inline
                                />
                            </div>
                        )}
                        <ShowList 
                            shows={shows} 
                            selectedShow={null} 
                            setSelectedShow={() => {}} // No se hace selección de funciones
                        />
                    </div>

                    {/* Selección de asientos */}
                    <div className="gestion-boletos-seat-selection-container">
                        <div className="seat-selection-info">
                            {/* Número de asientos y precio en la misma fila */}
                            <div className="seat-selection-header">
                                <h2>Número de Asientos:</h2>
                                <h2 style={{ marginLeft: 'auto' }}>Precio del Boleto:</h2> {/* Alineado a la derecha */}
                            </div>
                            {/* Botones de control de asientos */}
                            <div className='seat-controls'>
                                <button disabled>-</button> {/* Botones sin funcionalidad */}
                                <button disabled>+</button>
                            </div>
                            {/* Mapa de asientos, mantiene el cambio de color */}
                            <SeatMap 
                                selectedSeats={selectedSeats} 
                                setSelectedSeats={setSelectedSeats} 
                            />
                        </div>
                    </div>
                </div>
                <ActionButtons onNext={handleNextClick} />
            </section>

            {/* Ventana de confirmación sin datos */}
            {showConfirmation && (
                <ConfirmationScreen
                    title={"Función no seleccionada"} 
                    seats={[]} 
                    time={"Hora no disponible"} 
                    total={"$0.00"} 
                    codes={["Sin código"]}
                    onBack={handleBack} 
                    onConfirm={() => alert('Compra confirmada')} 
                />
            )}
        </>
    );
};

export default Gestiondeboletos;
