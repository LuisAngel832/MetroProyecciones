import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importar Link para manejar la navegación
import '../assets/css/MiniMenu.css';

const MiniMenuRegistrarFunciones = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="mini-menu-container">
            <button className="menu-icon-large" onClick={toggleMenu}>
                &#9776; {/* Icono del menú estándar */}
            </button>
            {isOpen && (
                <div className="menu-options">
                    <Link to="/registrar-funcion" className="Link"><button className='menu-option'>Registrar Funciones</button></Link>
                    <Link to="/cancelar-funcion" className="Link"><button className='menu-option'>Cancelar Funciones</button></Link>
                    <Link to="/funciones-registradas" className="Link"><button className='menu-option'>Funciones Registradas</button></Link>
                    <Link to="/" className='Link'><button className='menu-option'>Menu</button></Link>
                </div>
            )}
        </div>
    );
};

export default MiniMenuRegistrarFunciones;
