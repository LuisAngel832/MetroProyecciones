import React from 'react';
import '../assets/css/SeatMap.css';
import movieNoSelectedSilla from '../assets/img/movieNoSelectecSilla.png';
import movieSelectedSilla from '../assets/img/movieSelectedSilla.png'; 
import pantalla from '../assets/img/pantalla.png';

const SeatMap = ({ selectedSeats, setSelectedSeats }) => {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const columns = Array.from({ length: 11 }, (_, i) => i + 1);

    const toggleSeatSelection = (seat) => {
        if (selectedSeats.includes(seat)) {
            setSelectedSeats(selectedSeats.filter((s) => s !== seat));
        } else {
            setSelectedSeats([...selectedSeats, seat]);
        }
    };

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
                                src={isSelected ? movieSelectedSilla : movieNoSelectedSilla} // Imagen según el estado
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
