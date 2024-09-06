import React from "react";

import HomeContent from "../components/HomeContent";
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    function cerrarSesion() {
       localStorage.removeItem("Autenticado");
       navigate('/');
     };


    return (
        <div>
        <HomeContent />
        <button onClick={cerrarSesion}>Cerrar Sesión</button> 


        </div>
    )
}

export default Home