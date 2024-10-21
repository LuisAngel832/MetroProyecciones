import '../assets/css/Gestiondeboletos.css';
import { useState, useEffect } from 'react';
import Header from '../Conponentes/header';
import MiniMenu from '../Conponentes/MiniMenu';
import ShowList from '../Conponentes/ShowList'; 
import SeatMap from '../Conponentes/SeatMap';
import ActionButtons from '../Conponentes/ActionButtons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

const Gestiondeboletos = () => {
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedShow, setSelectedShow] = useState(null); 
    const [seatCount, setSeatCount] = useState(1);
    const [selectedSeats, setSelectedSeats] = useState([]);

    const toggleSearchBar = () => setShowSearchBar(!showSearchBar);
    const toggleCalendar = () => setShowCalendar(!showCalendar);

    const handleSeatCountChange = (delta) => {
        const newCount = Math.max(1, seatCount + delta);
        setSeatCount(newCount);

        if (selectedSeats.length > newCount) {
            setSelectedSeats(selectedSeats.slice(0, newCount));
        }
    };

    // Función para manejar la compra y actualizar el servidor
    const handlePurchase = async () => {
        try {
            const updatedShow = {
                ...selectedShow,
                lugaresDisponibles: selectedShow.lugaresDisponibles - selectedSeats.length,
            };
            
            await axios.put(
                `http://localhost:8080/api/funciones/${selectedShow.id}`,
                updatedShow
            );
            alert('Compra realizada con éxito');
        } catch (error) {
            console.error('Error al actualizar los lugares disponibles:', error);
            alert('Hubo un problema al realizar la compra');
        }
    };

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
                        <ShowList setSelectedShow={setSelectedShow} /> 
                    </div>

                    <div className="gestion-boletos-seat-selection-container">
                        <div className="seat-selection-info">
                            <div className="seat-selection-header">
                                <h2>Número de Asientos: {seatCount}</h2>
                                <h2 style={{ marginLeft: 'auto' }}>Precio del Boleto: $0.00</h2>
                            </div>
                            <div className='seat-controls'>
                                <button onClick={() => handleSeatCountChange(-1)}>-</button>
                                <button onClick={() => handleSeatCountChange(1)}>+</button>
                            </div>
                            <SeatMap
                                selectedSeats={selectedSeats}
                                setSelectedSeats={setSelectedSeats}
                                seatCount={seatCount}
                            />
                        </div>
                    </div>
                </div>
                <ActionButtons onNext={handlePurchase} />
            </section>
        </>
    );
};

export default Gestiondeboletos;
