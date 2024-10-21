import React, { useState, useEffect } from 'react';
import '../assets/css/SeatMap.css';
import movieNoSelectedSilla from '../assets/img/movieNoSelectecSilla.png';
import movieSelectedSilla from '../assets/img/movieSelectedSilla.png'; 
import pantalla from '../assets/img/pantalla.png';
import axios from 'axios';

const SeatMap = ({ selectedSeats, setSelectedSeats, seatCount}) => {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const columns = Array.from({ length: 11 }, (_, i) => i + 1);
    const [comlumna, setColumna] = useState()
    const [fila, setFila] = useState()

    const toggleSeatSelection = (seat) => {
        if (selectedSeats.includes(seat)) {
            setSelectedSeats(selectedSeats.filter((s) => s !== seat));
        } else if (selectedSeats.length < seatCount) {
            setSelectedSeats([...selectedSeats, seat]);
        } else {
            alert('Has alcanzado el número máximo de asientos seleccionados');
        }
    };

    useEffect(() => {
        const fetchShows = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/funciones/todas');
                setColumna(response.data.boletosVendidos.coluna)
                setFila(response.data.boletosVendidos.fila)
                console.log(response.data.boletosVendidos.fila,response.data.boletosVendidos.fila)
            } catch (error) {
                console.error('Error al obtener las funciones:', error);
            }
        };
        fetchShows();
    }, []);

    return (
        <div className="seat-map-container">
            <img src={pantalla} alt="Pantalla de la silla" className='pantalla'/>
            {rows.map((rowLabel) => (
                <div key={rowLabel} className="seat-row">
                    <div className="seat-row-label">{rowLabel}</div>
                    {columns.map((colNumber) => {
                        const seatId = `${rowLabel}${colNumber}`;
                        const isSelected = selectedSeats.includes(seatId);

                        return (
                            <img
                                key={seatId}
                                src={isSelected ? movieSelectedSilla : movieNoSelectedSilla}
                                alt={`Seat ${seatId}`}
                                className={`seat ${isSelected ? 'selected' : ''}`}
                                onClick={() => toggleSeatSelection(seatId)}
                            />
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

export default SeatMap;
