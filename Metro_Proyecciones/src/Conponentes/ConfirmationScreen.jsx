import React from 'react';
import '../assets/css/ConfirmationScreen.css';

const ConfirmationScreen = ({ funcion, asientosSeleccionados, onConfirm, onBack }) => {
    // Generar códigos para los boletos utilizando el ID del asiento
    const codes = asientosSeleccionados; // Aquí estamos usando directamente los asientos seleccionados como códigos

    // Función que se ejecuta al confirmar la compra
    const handleConfirmPurchase = async () => {
        const compra = {
            funcion: { id: funcion.id },  // ID de la función seleccionada
            boletos: asientosSeleccionados.map((asiento) => ({ codigo: asiento })), // Cambia 'asiento' a 'codigo'
            monto: asientosSeleccionados.length * 10,  // Ajusta el monto total
        };
        
        console.log(compra);

        try {
            const response = await fetch('http://localhost:8080/api/compra/registrar-compra', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(compra),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                console.log(`Error al confirmar la compra: ${errorMessage}`);
                return;
            }

            const data = await response.json();
            console.log('Compra confirmada con éxito');
            console.log('Compra registrada:', compra);

            // Llamar la función de confirmación (si es necesario)
            onConfirm();
        } catch (error) {
            console.error('Error al confirmar la compra:', error);
            console.log('Ocurrió un error al confirmar la compra.');
        }
        window.location.reload();
    };

    return (
        <div className="confirmation-screen">
            <h2 className="confirmation-title">FUNCIÓN</h2>
            <p className="confirmation-detail">{funcion.pelicula.titulo}</p>

            <h2 className="confirmation-title">NÚMEROS DE ASIENTOS</h2>
            <p className="confirmation-detail">{asientosSeleccionados.length}</p>

            <h2 className="confirmation-title">HORARIO</h2>
            <p className="confirmation-detail">{funcion.hora}</p>

            <h2 className="confirmation-title">TOTAL DE LA COMPRA</h2>
            <p className="confirmation-detail">${asientosSeleccionados.length * funcion.precioBoleto}</p>

            <h2 className="confirmation-title">CODIGO DE ASIENTOS</h2>
            {asientosSeleccionados.join(', ')}

            <div className="confirmation-buttons">
                <button className="back-button" onClick={onBack}>Regresar</button>
                <button className="confirm-button" onClick={handleConfirmPurchase}>Confirmar</button>
            </div>
        </div>
    );
};

export default ConfirmationScreen;
