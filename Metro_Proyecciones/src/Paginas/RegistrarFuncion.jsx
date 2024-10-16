import Header from '../Conponentes/header';
import './../assets/css/RegistrarFuncion.css';
import ConfirmacionDeFuncion from '../Conponentes/CreacionDeFunciones/ConfirmacionDeFuncion';
import { useState } from 'react';
import MiniMenuRegistrarFunciones from '../Conponentes//MiniMenuRegistrarFunciones';
import { Link } from 'react-router-dom';

const RegistrarFuncion = () => {
    const [confirmacion, setConfirmacion] = useState(false);
    const [nombreFuncion, setNombreFuncion] = useState('');
    const [fechaDia, setFechaDia] = useState('');
    const [fechaMes, setFechaMes] = useState('');
    const [fechaAno, setFechaAno] = useState('');
    const [horario, setHorario] = useState('');
    const [boleto, setBoleto] = useState('');
    const [duracion, setDuracion] = useState('');
    const [mostrarFunciones, setMostrarFunciones] = useState(false);

    const funcionesDisponibles = [
        "Avatar",
        "Titanic",
        "Inception",
        "The Matrix",
        "Toy Story",
        "The Avengers"
    ];

    const handleClickConfirmacion = (e) => {
        e.preventDefault();
        setConfirmacion(!confirmacion);

        setNombreFuncion('');
        setFechaDia('');
        setFechaMes('');
        setFechaAno('');
        setHorario('');
        setBoleto('');
        setDuracion('');
    };

    const handleClickCancelar = (e) => {
        e.preventDefault();
        setConfirmacion(!confirmacion);
        console.log("Función Cancelada");
    };

    const handleChangeNombre = (e) => {
        setNombreFuncion(e.target.value);
    };

    const handleClickHorario = (e) => {
        setHorario(e.target.innerText);
        console.log(e.target.innerText);
    };

    const handleChangeBoleto = (e) => {
        setBoleto(e.target.value);
    };

    const handleChangeDuracion = (e) => {
        setDuracion(e.target.value);
    };

    const handleClick = (e) => {
        e.preventDefault();
        setConfirmacion(!confirmacion);
    };

    const handleMostrarFunciones = (e) => {
        e.preventDefault();
        setMostrarFunciones(!mostrarFunciones);
    };

    const FuncionesRegistradas = () => {
        return (
            <div className='lista-funciones'>
                <button  value="la mancha" className='input-funciones' >la mancha</button>
                <button  value="la mancha" className='input-funciones' >la mancha</button>
                <button  value="la mancha" className='input-funciones' >la mancha</button>
                <button  value="la mancha" className='input-funciones' >la mancha</button>
                <button  value="la mancha" className='input-funciones' >la mancha</button>
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
                        <label htmlFor="nombreFuncion">Nombre Pelicula</label>

                        <input
                            onChange={handleChangeNombre}
                            value={nombreFuncion}
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
                                {mostrarFunciones ? <FuncionesRegistradas /> : <></>}
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
                            onChange={handleChangeBoleto}
                            value={boleto}
                            id="costoBoleto"
                            type="text"
                            className='input-text'
                        />
                    </fieldset>

                    <fieldset className='registro-funcion-form-duracion'>
                        <label htmlFor="duracion">Duración</label>
                        <input
                            onChange={handleChangeDuracion}
                            value={duracion}
                            id="duracion"
                            type="text"
                            className='input-text'
                        />
                        <span>Min</span>
                    </fieldset>

                    <fieldset className='registro-funcion-form-submit'>
                        <Link to="/"><button>Cancelar</button></Link>
                        <input type="submit" value="Siguiente" onClick={handleClick} />
                    </fieldset>
                </form>
            </section>

            {confirmacion ? (
                <ConfirmacionDeFuncion
                    nombreFuncion={nombreFuncion}
                    costoBoleto={boleto}
                    Horario={horario}
                    DuracionF={duracion}
                    FechaF={fechaDia + " /" + fechaMes + " /" + fechaAno}
                    codigoFuncion={'123123'}
                    handleClickConfirmacion={handleClickConfirmacion}
                    handleClickCancelar={handleClickCancelar}
                />
            ) : (
                <></>
            )}
        </>
    );
};

export default RegistrarFuncion;
