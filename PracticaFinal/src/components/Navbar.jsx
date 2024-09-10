//Barra de navegación
import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/Navbar.css";

function Navbar({ cerrarSesion }) {
  return (
    
    <nav className="nav">
      <Link to="/Home" className="nav-link">Gestión de tareas</Link>
      <Link to="/TareasFinalizadas" className="nav-link">Tareas finalizadas</Link>
      <Link to="/Contact" className="nav-link">Contacto</Link>
      {/* Botón de Cerrar Sesión en el Navbar */}
      <button className="nav-linkCerrarSesión" onClick={cerrarSesion}>Cerrar Sesión</button>
      
    </nav>
  );
}

export default Navbar;