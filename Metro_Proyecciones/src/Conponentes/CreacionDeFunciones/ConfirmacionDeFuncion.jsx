import { Link } from 'react-router-dom'
import '../../assets/css/confirmacionDeFuncion.css'
const ConfirmacionDeFuncion = ({
    nombreFuncion,
    costoBoleto,
    Horario,
    DuracionF,
    FechaF,
    id,
    handleClickConfirmacion,
    handleClickCancelar
}) => {
    return (
        <>
            <section className='confirmacion-de-funcion'>
                <div className='confirmacion-contenido'>
                    <div className="confirmacion-nombre">
                        <p className='p-descripcion'>Titulo de la Función</p>
                        <p className='p-datos'>{nombreFuncion}</p>
                    </div>
                    <div className="confirmacion-boleto">
                        <p className='p-descripcion'>Costo de boleto</p>
                        <p className='p-datos'>{costoBoleto}</p>
                    </div>
                    <div className="confirmacion-horario">
                        <p className='p-descripcion'>Horario</p>
                        <p className='p-datos'>{Horario} HRS</p>
                    </div>
                    <div className="confirmacion-Duracion">
                        <p className='p-descripcion'>Duracion</p>
                        <p className='p-datos'>{DuracionF}</p>
                    </div>
                    <div className="confirmacion-fecha">
                        <p className='p-descripcion'>Fecha</p>
                        <p className='p-datos'>{FechaF}</p>
                    </div >

                    <div className="confirmacion-confirmar">
                        <button className='button-cancelar' onClick={handleClickCancelar}>Cancelar</button>
                       <button className='button-confirmar' onClick={handleClickConfirmacion}>Confirmar</button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ConfirmacionDeFuncion