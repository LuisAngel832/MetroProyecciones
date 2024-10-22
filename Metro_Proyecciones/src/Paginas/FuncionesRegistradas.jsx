import React, { useState, useEffect } from 'react';
import './../assets/css/FuncionesRegistradas.css'; 
import Header from '../Conponentes/header';
import Icon from '../Conponentes/icon';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import MiniMenuRegistrarFunciones from '../Conponentes/MiniMenuRegistrarFunciones';
import RegistrarFuncionDetalles from '../Conponentes/CreacionDeFunciones/FuncionesRegistradasDetalles';

const FuncionesRegistradas = () => {
  const [funciones, setFunciones] = useState([]);
  const [mostrarDetalles, setMostrarDetalles] = useState(false);
  const [funcionSeleccionada, setFuncionSeleccionada] = useState(null);
  
  // Estados para búsqueda
  const [tituloBuscado, setTituloBuscado] = useState('');
  const [fechaBuscada, setFechaBuscada] = useState('');

  useEffect(() => {
    const obtenerFunciones = async () => {
      try {
        const respuesta = await fetch('http://localhost:8080/api/funciones/todas');
        if (!respuesta.ok) {
          throw new Error('Error al obtener las funciones');
        }
        const data = await respuesta.json();

        // Ordenar las funciones por fecha
        const funcionesOrdenadas = data.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
        setFunciones(funcionesOrdenadas);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    obtenerFunciones();
  }, []);

  // Filtrar funciones según título y fecha
  const funcionesFiltradas = funciones.filter((funcion) => {
    const tituloCoincide = funcion.pelicula.titulo.toLowerCase().includes(tituloBuscado.toLowerCase());
    const fechaCoincide = fechaBuscada ? funcion.fecha === fechaBuscada : true;
    return tituloCoincide && fechaCoincide;
  });

  const mostrarDetallesFuncion = (funcion) => {
    setFuncionSeleccionada(funcion);
    setMostrarDetalles(true);
  };
 
  const cancelarMostrarDetalles = () => {
    setMostrarDetalles(false);
    setFuncionSeleccionada(null);
  };

  const calcularPorcentajeOcupacion = (funcion) => {
    const totalAsientos = 100; // Cambia este valor según tu lógica
    const boletosVendidos = funcion.boletosVendidos.length;
    return ((boletosVendidos / totalAsientos) * 91).toFixed(2) + '%';
  };

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
          <input 
            className="titulo" 
            type="text" 
            placeholder='TITULO' 
            value={tituloBuscado}
            onChange={(e) => setTituloBuscado(e.target.value)}
          />
        </div>
        <input 
          type="date" 
          value={fechaBuscada} 
          onChange={(e) => setFechaBuscada(e.target.value)}
        />
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
            {funcionesFiltradas.map((funcion) => (
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
