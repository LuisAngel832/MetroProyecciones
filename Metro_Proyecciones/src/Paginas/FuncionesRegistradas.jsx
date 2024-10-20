import React, { useState, useEffect } from 'react';
import './../assets/css/FuncionesRegistradas.css'; 
import Header from '../Conponentes/header';
import Icon from '../Conponentes/icon';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import MiniMenuRegistrarFunciones from '../Conponentes/MiniMenuRegistrarFunciones';
import RegistrarFuncionDetalles from '../Conponentes/CreacionDeFunciones/FuncionesRegistradasDetalles';

const FuncionesRegistradas = () => {
  // Estado para almacenar las funciones obtenidas
  const [funciones, setFunciones] = useState([]);
  // Estado para controlar la visualización de detalles
  const [mostrarDetalles, setMostrarDetalles] = useState(false);
  const [funcionSeleccionada, setFuncionSeleccionada] = useState(null);

  // Obtener las funciones al montar el componente
  useEffect(() => {
    const obtenerFunciones = async () => {
      try {
        const respuesta = await fetch('http://localhost:8080/api/funciones/todas'); // Asegúrate de que esta URL sea correcta
        if (!respuesta.ok) {
          throw new Error('Error al obtener las funciones');
        }
        const data = await respuesta.json();
        setFunciones(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    obtenerFunciones();
  }, []);

  // Función para mostrar los detalles de una función
  const mostrarDetallesFuncion = (funcion) => {
    setFuncionSeleccionada(funcion);
    setMostrarDetalles(true);
  };
 
  // Función para cerrar la vista de detalles
  const cancelarMostrarDetalles = () => {
    setMostrarDetalles(false);
    setFuncionSeleccionada(null);
  };

  // Función para calcular el porcentaje de ocupación
  const calcularPorcentajeOcupacion = (funcion) => {
    const totalAsientos = 100; // Cambia este valor según tu lógica
    const boletosVendidos = funcion.boletosVendidos.length;
    return ((boletosVendidos / totalAsientos) * 100).toFixed(2) + '%';
  };

  // Componente para cada fila de la tabla
  const RenglonFuncion = ({ funcion }) => {
    return (
      <tr>
        <td>
          <div className='tabla-detalles-id'>
            <button onClick={() => mostrarDetallesFuncion(funcion)} className="btn">VER DETALLES</button> {funcion.pelicula.titulo} <br />ID: {funcion.id}
          </div>
        </td>
        <td>{funcion.boletosVendidos.length}</td>
        <td>{funcion.dineroRecaudado}</td>
        <td>{calcularPorcentajeOcupacion(funcion)}</td>
        <td>{funcion.estado}</td>
      </tr>
    );
  };

  return (
    <>
      <MiniMenuRegistrarFunciones />
      <Header nombreTitulo={'Funciones Registradas'} />
      <section className="busqueda">
        <div>
          <span className='icon'><Icon icon={faMagnifyingGlass} /></span>
          <input className="titulo" type="text" placeholder='TITULO' />
        </div>
        <input type="date" placeholder='fecha' />
      </section>
      <div className="table-container">
        <h1>FUNCIONES REGISTRADAS</h1>
        <table>
          <thead>
            <tr className='tabla-cabecera'>
              <th>TÍTULO Y ID</th>
              <th>BOLETOS VENDIDOS</th>
              <th>DINERO RECAUDADO</th>
              <th>PORCENTAJE DE OCUPACIÓN</th>
              <th>ESTADO</th>
            </tr>
          </thead>
          <tbody>
            {funciones.map((funcion) => (
              <RenglonFuncion key={funcion.id} funcion={funcion} />
            ))}
          </tbody>
        </table>
      </div>
      <section>
        {mostrarDetalles && funcionSeleccionada ? (
          <RegistrarFuncionDetalles
            nombreFuncion={funcionSeleccionada.pelicula.titulo}
            costoBoleto={funcionSeleccionada.precioBoleto}
            Horario={funcionSeleccionada.hora}
            DuracionF={funcionSeleccionada.pelicula.duracion}
            FechaF={funcionSeleccionada.fecha}
            codigoFuncion={funcionSeleccionada.id}
            handleClickConfirmacion={() => {}}
            handleClickCancelar={cancelarMostrarDetalles}
          />
        ) : null}
      </section>
    </>
  );
};

export default FuncionesRegistradas;
