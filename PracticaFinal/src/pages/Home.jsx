import React from "react";
import HomeContent from "../components/HomeContent";
import Navbar from "../components/Navbar";
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    function cerrarSesion() {
       localStorage.removeItem("Autenticado");
       navigate('/');
     };


    return (
        <div>

         {/* Pasamos la función cerrarSesion como prop al componente Navbar */}
         <Navbar cerrarSesion={cerrarSesion}/> <br /><br />  <br />
         <HomeContent /> 


        </div>
    )
}

export default Home