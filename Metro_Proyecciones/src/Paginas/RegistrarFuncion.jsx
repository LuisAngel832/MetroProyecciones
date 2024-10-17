import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Conponentes/header';
import './../assets/css/RegistrarFuncion.css';
import ConfirmacionDeFuncion from '../Conponentes/CreacionDeFunciones/ConfirmacionDeFuncion';
import MiniMenuRegistrarFunciones from '../Conponentes/MiniMenuRegistrarFunciones';
import { Link } from 'react-router-dom';

const RegistrarFuncion = () => {
    const [confirmacion, setConfirmacion] = useState(false);
    const [nombreFuncion, setNombreFuncion] = useState('');
    const [horario, setHorario] = useState('');
    const [boleto, setBoleto] = useState('');
    const [duracion, setDuracion] = useState('');
    const [mostrarFunciones, setMostrarFunciones] = useState(false);
    const [funciones, setFunciones] = useState([]);

    useEffect(() => {
        // Hacer la petición GET a la API para obtener las funciones
        axios.get('http://127.0.0.1:8080/api/peliculas/todas-peliculas')
            .then(response => {
                // Guardar las funciones obtenidas en el estado
                setFunciones(response.data);
                console.log(response.data); 
            })
            .catch(err => {
                console.error("Error al obtener las funciones: ", err);
            });
    }, []);

    const handleClickHorario = (e) => {
        setHorario(e.target.innerText);
        console.log(e.target.innerText);
    };

    const handleClickFuncion = (funcion) => {
        setNombreFuncion(funcion.titulo); // Asignar el nombre de la función al campo de nombre
        setDuracion(funcion.duracion); // Asignar la duración de la función al campo de duración
    };

    const handleClickConfirmacion = (e) => {
        e.preventDefault();
        setConfirmacion(!confirmacion);
        setNombreFuncion('');
        setHorario('');
        setBoleto('');
        setDuracion('');
    };

    const handleClickCancelar = (e) => {
        e.preventDefault();
        setConfirmacion(!confirmacion);
        console.log("Función Cancelada");
    };

    const handleMostrarFunciones = (e) => {
        e.preventDefault();
        setMostrarFunciones(!mostrarFunciones);
    };

    const FuncionesRegistradas = () => {
        return (
            <div className='lista-funciones'>
                {funciones.length > 0 ? (
                    funciones.map((funcion, index) => (
                        <button key={index} value={funcion.nombre} className='input-funciones' onClick={handleClickFuncion}>
                            {funcion.titulo}
                        </button>
                    ))
                ) : (
                    <p>No hay funciones registradas</p>
                )}
            </div>
        );
    };

    return (
        <>
            <MiniMenuRegistrarFunciones />
            <Header nombreTitulo={'Registrar Función'} />
            <section className='registro-funcion'>
                <form className='registro-funcion-form'>
                    <fieldset className='registro-funcion-form-nombre'>
                        <label htmlFor="nombreFuncion">{nombreFuncion}</label>
                        <input
                            onChange={(e) => setNombreFuncion(e.target.value)}
                            value={funciones.titulo}
                            className='input-text input-text-nombre'
                            id="nombreFuncion"
                            type="text"
                            placeholder="Nombre de la pelicula"
                        />
                    </fieldset>

                    <fieldset className='registro-funcion-form-fecha'>
                        <label htmlFor="fecha">Fecha</label>
                        <div className='container-mostrar-funciones'>
                            <input type="date" className='input-fecha' />
                            <div className='funciones-registradas'>
                                <input value="Mostrar Funciones" onClick={handleMostrarFunciones} type='button' className='input-funciones-registradas' />
                                {mostrarFunciones && <FuncionesRegistradas />}
                            </div>
                        </div>
                    </fieldset>

                    <fieldset className='registro-funcion-form-horario'>
                        <label>Horario</label>
                        <button onClick={handleClickHorario} type="button">10:00</button>
                        <button onClick={handleClickHorario} type="button">12:00</button>
                        <button onClick={handleClickHorario} type="button">14:00</button>
                        <button onClick={handleClickHorario} type="button">16:00</button>
                    </fieldset>

                    <fieldset className='registro-funcion-form-boleto'>
                        <label htmlFor="costoBoleto">Costo De Boleto</label>
                        <input
                            onChange={(e) => setBoleto(e.target.value)}
                            value={boleto}
                            id="costoBoleto"
                            type="text"
                            className='input-text'
                        />
                    </fieldset>

                    <fieldset className='registro-funcion-form-duracion'>
                        <label htmlFor="duracion">{DuracionF}</label>
                        <input
                            onChange={(e) => setDuracion(e.target.value)}
                            value={duracion}
                            id="duracion"
                            type="text"
                            className='input-text'
                        />
                        <span>Min</span>
                    </fieldset>

                    <fieldset className='registro-funcion-form-submit'>
                        <Link to="/"><button>Cancelar</button></Link>
                        <input type="submit" value="Siguiente" onClick={handleClickConfirmacion} />
                    </fieldset>
                </form>
            </section>

            {confirmacion && (
                <ConfirmacionDeFuncion
                    nombreFuncion={nombreFuncion}
                    costoBoleto={boleto}
                    Horario={horario}
                    DuracionF={duracion}
                    FechaF={'Fecha seleccionada'}
                    codigoFuncion={'123123'}
                    handleClickConfirmacion={handleClickConfirmacion}
                    handleClickCancelar={handleClickCancelar}
                />
            )}
        </>
    );
};

export default RegistrarFuncion;