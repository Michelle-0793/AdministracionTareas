//Componente para el formulario de registrarse
import React from "react";
import { useEffect, useState } from 'react';
import GetUsers from "../services/GetUsers";
import PostUsers from "../services/PostUsers";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "../styles/FormRegister.css"

//HOOK
function FormRegister() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);
  //const [saludo, setSaludo] = useState(''); por si quiero que el mensaje aparezca como texto en pantalla

  function  cargaUsuario(event) {

    setUsername(event.target.value);
  }
  const cargaEmail = (event) => {
    setEmail(event.target.value);
  };

  const cargaContra = (event) => {
    setPassword(event.target.value);
  };


  //ESTA FUNCION PUEDE CARGAR, HACER POST O BIEN REALIZAR VALIDACIONES
  const cargar = () => {
    event.preventDefault(); //Prevenir el comportamiento por defecto del formulario
    // Validar que todos los campos estén llenos
    if (!username || !email || !password) {
      Swal.fire({
        title: "Debe llenar todos los campos",
        icon: 'error',
        confirmButtonText: 'OK',
        customClass: {
          popup: 'my-popup',
          title: 'my-title',
          confirmButton: 'my-confirm-button'
      }
      });
      return;
    }
    //setSaludo("Debes llenar todos los campos")-para que imprima el texto en el DOM

  //VALIDACIONES
  //Verificar si el usuario ya está registrado
  const UsuarioExistente = users.find(user => user.email === email);
  if (UsuarioExistente) {
    Swal.fire({
      title: "¡Este usuario ya está registrado!",
      text: "Por favor, intente con otro correo.",
      icon: 'error',
      confirmButtonText: 'OK'  //Cerrar manualmente
    });
  } else {
    PostUsers(username, email, password).then(() => { //el then se usa para manejar el resultado exitoso de una promesa.
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Usuario registrado con éxito",
        showConfirmButton: false,
        timer: 1200
    });

        navigate("/login");  //Redirigir al login tras el cierre de la alerta

    });
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
        <form className="form">

        <div className="datosForm">
        <label className="textDatos" htmlFor="username">Usuario</label><br />
        <input className="inputDatos" type="text" id="username" name="username" placeholder="Ingrese un nombre de Usuario"
          value={username}
          onChange={cargaUsuario}
          required
        />
        </div>
        <br /><br />
        <div className="datosForm">
          <label className="textDatos" htmlFor="email">Email</label><br />
          <input className="inputDatos" type="text" id="email" name="email" placeholder="Ingrese su email"
          value={email}
          onChange={cargaEmail}
          required 
        />
        </div>
        <br /><br />
        <div className="datosForm">
        <label className="textDatos" htmlFor="email">Contraseña</label><br />
          <input className="inputDatos" type="text" id="contraseña" name="contraseña" placeholder="Ingrese una contraseña"
          value={password}
          onChange={cargaContra}
         required
        />
        </div>
        <br /><br />
        <button type="submit" className="button" onClick={(cargar)}>Registrarse</button>

        {/*<button type="submit" className="button" onClick={(cargar) => navigate("/Login")}>Registrarse</button>*/}
        {/*<p>{saludo}</p>-para que salga el texto en el pantalla*/}

      </form>
    )
}

export default FormRegister;