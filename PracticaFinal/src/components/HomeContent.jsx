//Componente del contenido de la página de inicio.
import React from "react";
import "../styles/HomeContent.css"


function HomeContent() {
    return(
        <section className="section">
        <h2>¡Nos alegra que estés aquí!</h2>
        <p className="textHome">
          Ahora que te has registrado y conectado, puedes empezar a explorar <br />
          todas las funcionabilidades y beneficios que te ofrecemos. <br />
          Si necesitas ayuda, no dudes en contactarnos. <br /> 
          ¡Disfruta tu experiencia con nosotros! </p>
      </section>
    )
}

export default HomeContent;