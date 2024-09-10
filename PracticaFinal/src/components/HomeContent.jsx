import React, { useEffect, useState } from 'react';
import "../styles/HomeContent.css";
import PostTareas from "../services/PostTareas";
import GetTareas from '../services/GetTareas';
import UpdateTareas from "../services/UpdateTareas";
import DeleteTareas from "../services/DeleteTareas";

function ListaTareas() {
  const [Tareas, setTareas] = useState([]);
  const [NuevaTarea, setNuevaTarea] = useState("");
  const [EditaTarea, setEditarTarea] = useState(""); 
  const [TareaEditada, setTareaEditada] = useState("");
  const [FechaTarea, setFechaTarea] = useState("");
  const [FechaEditada, setFechaEditada] = useState("");


  
  const CambiarValorInput = (event) => {
    setNuevaTarea(event.target.value);
  };

  const CambiarTextoEditado = (event) => {
    setTareaEditada(event.target.value); // Cambia 'El texto editado' cuando el input de edición se usa
  };

  const CambiarFecha = (event) => {
    setFechaTarea(event.target.value);
  };

  const CambiarFechaEditada = (event) => {
    setFechaEditada(event.target.value); // Cambia 'FechaEditada' cuando el input de edición se usa
  };

//AÑADIR TAREA
  const AñadirTarea = async () => { //Función flecha para añadir
    if (NuevaTarea.trim() !== "" && FechaTarea.trim() !== "") { // Agregar verificación de espacio vacío
      const nuevaTarea = {text: NuevaTarea, fecha: FechaTarea}; 
      const TareaCreada = await PostTareas(nuevaTarea); // Guardar la tarea 
      setTareas([...Tareas, TareaCreada]); //spread para agregar nueva tarea al final de la lista
      setNuevaTarea(""); // Limpiar el campo de texto
      setFechaTarea(""); // Limpiar el campo de fecha

    }
  };


  //EDITAR Y ELIMINA TAREAS
  const EditarTarea = (tarea) => {
    setEditarTarea(tarea.id);
    setTareaEditada(tarea.text);
    setFechaEditada(tarea.fecha);
  };
  
  // GUARDAR LO EDITADO
  const GuardarEdicion = async (id) => {
    const Editada = { id, text: TareaEditada, fecha: FechaEditada };  // Guardar la tarea con el texto y la fecha editada
    await UpdateTareas(Editada);
    setTareas(Tareas.map(tarea => tarea.id === id ? Editada : tarea));
    setEditarTarea(""); // Salir del modo de edición
    setTareaEditada("");
    setFechaEditada("");
  };

  const EliminarTarea = (id) => {
    //En cada iteración, la función verifica si el id de la tarea actual 
    //(tarea.id) es diferente del id que busco eliminar.
    const nuevasTareas = Tareas.filter((tarea) => tarea.id !== id);
    DeleteTareas(id)
    setTareas(nuevasTareas); // Actualizamos el estado con las tareas filtradas
  }


   // useEffect para cargar las tareas 
   useEffect(() => {
    const fetchTareas = async () => {
      const tareas = await GetTareas(); 
      setTareas(tareas);
      
    };
    fetchTareas(); 
  }, []);  

return (
<div className='content-container'>
  <h1 className='Gestion'>Gestión de Tareas</h1><br /><br />
  <div className='InputsDatos'>
    <input className='InputTarea' type="text" value={NuevaTarea} onChange={CambiarValorInput} placeholder='Ingrese una tarea' /><br />
    <label className='FechaEntrega' htmlFor="fecha">Fecha de entrega:</label><br /><br />
    <input className='InputFecha' type="date" value={FechaTarea} onChange={CambiarFecha} /> <br /><br />
    <button className='btnAñadirTarea' onClick={AñadirTarea}>Añadir tarea</button>
  </div>
  <br /><br /><br />

{/* LISTA DE TAREAS */}
<div className='ContenedorTareas'>
<div>
  <ul>
    {Tareas.map((tarea) => (
      <li key={tarea.id}> {/*li para añadir cada tarea*/}
        {EditaTarea === tarea.id ? ( //Abre operador ternario, en lugar de else if (entra al estado de edición)
          <>
            <input className='InputTarea2' type="text" value={TareaEditada} onChange={CambiarTextoEditado} /> 
            <input className='InputFecha2' type="date" value={FechaEditada} onChange={CambiarFechaEditada} /><br />
            <button className='btnTareas' onClick={() => GuardarEdicion(tarea.id)}>Guardar</button>
          </>
        ) : ( //Cierre de operador ternario (sale del estado de edición)
          <>
          <div className='divListaTareas'>
            {tarea.text} - <span>{tarea.fecha}</span>
            <button className='btnTareas' onClick={() => EditarTarea(tarea)}>Editar</button>
            <button className='btnTareas' onClick={() => EliminarTarea(tarea.id)}>Eliminar</button>
          </div>
          </>
        )}
      </li>
    ))}
  </ul>
</div>
</div>{/*Termina el div de ContenedorTareas*/}
</div> /*Termina el div de content-container*/

  );
}

export default ListaTareas;
