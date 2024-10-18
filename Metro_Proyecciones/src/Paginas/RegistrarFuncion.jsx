import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Conponentes/header';
import './../assets/css/RegistrarFuncion.css';
import ConfirmacionDeFuncion from '../Conponentes/CreacionDeFunciones/ConfirmacionDeFuncion';
import MiniMenuRegistrarFunciones from '../Conponentes/MiniMenuRegistrarFunciones';
import { Link } from 'react-router-dom';

const RegistrarFuncion = () => {
    const [confirmacionMostrarFunciones, setConfirmacionMostrarFunciones] = useState(false);
    const [nombreFuncion, setNombreFuncion] = useState('');
    const [horario, setHorario] = useState('');
    const [fecha, setFecha] = useState()
    const [boleto, setBoleto] = useState('');
    const [duracion, setDuracion] = useState();
    const [mostrarFunciones, setMostrarFunciones] = useState(false);
    const [funciones, setFunciones] = useState([]);
    const [peliculaId, setPeliculaId] = useState(1); 
    const [id,setId] = useState() 





    useEffect(() => {
        // Hacer la petición GET a la API para obtener las funciones
        axios.get('http://127.0.0.1:8080/api/peliculas/todas-peliculas')
            .then(response => {
                // Guardar las funciones obtenidas en el estado
                setFunciones(response.data);
                setId(funciones.id)
                console.log(response.data)
            })
            .catch(err => {
                console.error("Error al obtener las funciones: ", err);
            });
    }, []);

    const confirmarFunciones= (e) =>{
        e.preventDefault()
        setConfirmacionMostrarFunciones(!confirmacionMostrarFunciones)
    }
    const handleChangeFecha = (e) => {
        setFecha(e.target.value);
        console.log(fecha)
    };
    
    const handleClickHorario = (e) => {
        setHorario(e.target.innerText);
        console.log(e.target.innerText);
    };

    const handleClickFuncion = (funcion) => {
        setNombreFuncion(funcion.titulo); // Asignar el nombre de la función al campo de nombre
        setDuracion(funcion.duracion); // Asignar la duración de la función al campo de duración
        setId(funcion.id)
    };

    

    const handleClickCancelar = (e) => {
        e.preventDefault();
        setConfirmacionMostrarFunciones(!confirmacionMostrarFunciones);
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
                        <button
                            key={index}
                            value={funcion.nombre}
                            className='input-funciones'
                            onClick={() => handleClickFuncion(funcion)} // Corregido
                        >
                            {funcion.titulo}
                        </button>
                    ))
                ) : (
                    <p>No hay funciones registradas</p>
                )}
            </div>
        );
    };

    const handleClickConfirmacion = (e) => {
        e.preventDefault();

        
        if (!nombreFuncion || !horario || !boleto || !duracion || !fecha) {
            alert("Por favor, complete todos los campos");
            return;
        }

        // Datos que se enviarán en la solicitud POST
        const nuevaFuncion = {
            hora: horario,
            precioBoleto: boleto,
            fecha: fecha,
            duracion: duracion,
            estado: 'Programada', // Puedes cambiar el estado según tu lógica
        };

        // Realizar la solicitud POST al backend para registrar la función con el ID de la película
        axios.post(`http://127.0.0.1:8080/api/funciones/registrar_funcion_pelicula?idPelicula=${peliculaId}', nuevaFuncion)
            .then(response => {
                console.log("Función registrada exitosamente:", response.data);
                
                setConfirmacion(true); // Mostrar confirmación de éxito
                // Limpiar los campos del formulario después de la confirmación
                setNombreFuncion('');
                setHorario('');
                setBoleto('');
                setDuracion('');
                setFecha('');
            })
            .catch(error => {
                console.error("Error al registrar la función:", error);
                alert("Hubo un error al registrar la función.");
            });
    };
    

    return (
        <>
            <MiniMenuRegistrarFunciones />
            <Header nombreTitulo={'Registrar Función'} />
            <section className='registro-funcion'>
                <form className='registro-funcion-form'>
                    <fieldset className='registro-funcion-form-nombre'>
                        <label htmlFor="nombreFuncion">Nombre de la funcion</label>
                        <input
                            onChange={(e) => setNombreFuncion(e.target.value)}
                            value={nombreFuncion} // Problema aquí
                            className='input-text input-text-nombre'
                            id="nombreFuncion"
                            type="text"
                            placeholder="Nombre de la pelicula"
                        />
                    </fieldset>

                    <fieldset className='registro-funcion-form-fecha'>
                        <label htmlFor="fecha">Fecha</label>
                        <div className='container-mostrar-funciones'>
                            <input onChange={handleChangeFecha} type="date" className='input-fecha' />
                            <div className='funciones-registradas'>
                                <input value="Mostrar Peliculas" onClick={handleMostrarFunciones} type='button' className='input-funciones-registradas' />
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
                        <label htmlFor="duracion">Duracion</label>
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
                        <input type="submit" value="Siguiente" onClick={confirmarFunciones} />
                    </fieldset>
                </form>
            </section>

            {confirmacionMostrarFunciones && (
                <ConfirmacionDeFuncion
                    nombreFuncion={nombreFuncion}
                    costoBoleto={boleto}
                    Horario={horario}
                    DuracionF={duracion}
                    FechaF={fecha}
                    codigoFuncion={'123123'}
                    id = {id}
                    handleClickConfirmacion={handleClickConfirmacion}
                    handleClickCancelar={handleClickCancelar}
                />
            )}
        </>
    );
};

export default RegistrarFuncion;