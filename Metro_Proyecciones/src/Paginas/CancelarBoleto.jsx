import React, { useState } from 'react';
import '../assets/css/RegistrarFuncion.css';
import Header from '../Conponentes/header';
import MiniMenuRegistrarFunciones from '../Conponentes/MiniMenuRegistrarFunciones';
import axios from 'axios';
import MiniMenu from '../Conponentes/MiniMenu';

const CancelarFuncion = () => {
    const [codigoFuncion, setCodigoFuncion] = useState('');
    const [mensaje, setMensaje] = useState('');

    const handleInputChange = (e) => {
        setCodigoFuncion(e.target.value);
    };

    const handleCancelar = () => {
        setCodigoFuncion('');
        setMensaje('');
    };

    const handleEliminar = async () => {
        try {
            const response = await axios.delete(`http://localhost:8080/api/funciones/borrar_funcion/${codigoFuncion}`);
            if (response.status === 204) {
                setMensaje('Función eliminada exitosamente.');
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setMensaje(error.response.data);
            } else if (error.response && error.response.status === 404) {
                setMensaje('La función no existe.');
            } else {
                setMensaje('Error al eliminar la función.');
            }
        }
    };

    return (
        <>
            <MiniMenu />
            <Header nombreTitulo={'Cancelar Boleto'} />
            <section className='cancelar-funcion-box box-contenido'>
                <form className='cancelar-funcion-contenido main-contenido' onSubmit={(e) => e.preventDefault()}>
                    <fieldset className='registro-funcion-form-nombre'>
                        <label htmlFor="codigoFuncion">Código del boleto</label>
                        <input
                            id="codigoFuncion"
                            type="text"
                            className='input-text cancelar-funcion-codigo'
                            placeholder='Ingresa el código de la función'
                            value={codigoFuncion}
                            onChange={handleInputChange}
                        />
                    </fieldset>
                </form>
                <div className='cancelar-funcion-botones'>
                    <button className='button-cancelar cancelar-funcion-cancelar' onClick={handleCancelar}>Cancelar</button>
                    <button className='button-confirmar' onClick={handleEliminar}>Eliminar</button>
                </div>
                {mensaje && <p>{mensaje}</p>}
            </section>
        </>
    );
};

export default CancelarFuncion;
