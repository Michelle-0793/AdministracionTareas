//Barra de navegación
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="nav">
      <Link to="/home" className="nav-link">Home</Link>
      <Link to="/login" className="nav-link">Iniciar Sesión</Link>
      <Link to="/register" className="nav-link">Registrarse</Link>
      <Link to="/contact" className="nav-link">Contacto</Link>
      
    </nav>
  );
}

export default Navbar;