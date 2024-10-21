import { useState } from "react";
import { Link } from "react-router-dom";

const MiniMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className="mini-menu-container">
                <button className="menu-icon-large" onClick={toggleMenu}>
                    &#9776; {/* Ícono del menú estándar */}
                </button>
                {isOpen && (
                    <div className="menu-options">
                        {/* Enlace a la gestión de boletos */}
                        <Link to="/gestion-de-boletos">
                            <button className="menu-option">Venta de Boleto</button>
                        </Link>
                        {/* Enlace para cancelar boleto */}
                        <Link to="/cancelar-boleto">
                            <button className="menu-option">Cancelar Boleto</button>
                        </Link>
                        {/* Enlace al menú principal */}
                        <Link to="/" className="menu-option">
                            MENU
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
};

export default MiniMenu;
