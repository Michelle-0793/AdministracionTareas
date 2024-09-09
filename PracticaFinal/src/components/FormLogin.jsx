//Componente para el formulario de registrarse
import React from "react";
import { useEffect, useState } from 'react';
import GetUsers from "../services/GetUsers";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import "../styles/FormLogin.css";


//HOOK
function FormLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);

  function  cargaUsuario(event) {

    setUsername(event.target.value);
  };

  const cargaContra = (event) => {
    setPassword(event.target.value);
  };


  //ESTA FUNCION PUEDE CARGAR, HACER POST O BIEN REALIZAR VALIDACIONES
  const IniciarSesion = () => {
    event.preventDefault(); //Prevenir el comportamiento por defecto del formulario
    // Validar que todos los campos estén llenos
    if (!username || !password) {
      Swal.fire({
        title: "Debe llenar todos los campos",
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

  //VALIDACIONES
  //Verificar si el usuario ya está registrado
  const UsuarioExistente = users.find(user => user.username === username);
  if (!UsuarioExistente) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "¡Usuario no registrado!"
    });
  } else {
    localStorage.setItem("Autenticado", "true");
    Swal.fire({
      position: "top-center",
      icon: "success",
      title: "Inicio de sesión exitoso",
      showConfirmButton: false,
      timer: 1000
  });
        navigate("/home");  //Redirigir al home 
  }
};

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await GetUsers();       
      setUsers(data);
    };
    fetchUsers();
  }, []);

  console.log(users)

    return(
<div className="wrapper">
        <form className="form">

        <div className="datosForm">
        <input className="inputDatos" type="text" id="username"  name="username" placeholder="Usuario"
        
          value={username}
          onChange={cargaUsuario}
          required
        />
        <i className="fa-solid fa-user"></i>
        </div>

        <br /><br />

        <div className="datosForm">
          <input className="inputDatos" type="password" id="contraseña" name="contraseña" placeholder="Contraseña"
          value={password}
          onChange={cargaContra}
          required
        />
        <i className="fa-solid fa-user"></i>
        </div>
        <br /><br />

        <button type="submit" className="btnIniciarSesion" onClick={(IniciarSesion)}>Iniciar Sesión</button>
        <p className="Registrarse"> ¿No tienes una cuenta?{""}
        <Link to="/register" className="registrarse-link"> Regístrese</Link>
        </p>

      </form>
      <div></div>
      <div className="Banner">
        <h1 className="TituloBanner">TaskMaster<br /> </h1>
        <p className="TextoBanner">La herramienta perfecta  <br />  para crear, 
        organizar y gestionar  <br /> sus tareas de manera eficiente</p>
      </div>

</div>
    )
}

export default FormLogin;



























/*function FormLogin() {
    return(

      <form className="form">
      <div className="datosForm">
        <label className="textDatos" >Usuario:</label>
        <input className="inputDatos" type="usuario" />
      </div>

      <div className="datosForm">
        <label className="textDatos" >Contraseña:</label>
        <input className="inputDatos" type="password" />
      </div>

      <button type="submit" className="button">Iniciar Sesión</button>

    </form>

    )
}

export default FormLogin;*/