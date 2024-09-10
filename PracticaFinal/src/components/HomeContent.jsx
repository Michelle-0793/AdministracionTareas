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
    setTareaEditada(event.target.value);
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
<div>

  <h1 className='Gestion'>Gestión de Tareas</h1><br /><br />
  <input className='InputTarea' type="text" value={NuevaTarea} onChange={CambiarValorInput} placeholder='Ingrese una tarea' />
  <input className='InputFecha' type="date" value={FechaTarea} onChange={CambiarFecha} />
  <button onClick={AñadirTarea}>Agregar Tarea</button>

{/*LISTA DE TAREAS*/}
    <ul>
      {Tareas.map((tarea) => (
        <li key={tarea.id}> {/*se mapea y se crea el li para cada tarea*/}
          {EditaTarea === tarea.id ? ( //Ternario para ver si la tarea está o no en edición
     <>
     {/* Inputs para editar la tarea y la fecha */}
     <input type="text" value={TareaEditada} onChange={CambiarTextoEditado} 
     />
     <input type="date" value={FechaEditada} onChange={CambiarFechaEditada} 
     />
        <button onClick={() => GuardarEdicion(tarea.id)}>Guardar</button>
      </>
    ) : ( //Para cerrrar el operador ternario

      <>
        {/* Si la tarea no está en modo edición, se va a mostrar el texto de la tarea */}
        {/* Muestra el texto de la tarea y la fecha */}
        {tarea.text} - <span>{tarea.fecha}</span>
         {/* Botón para editar la tarea */}
        <button onClick={() => EditarTarea(tarea)}>Editar</button>
          {/* Botón para eliminar la tarea */}
        <button onClick={() => EliminarTarea(tarea.id)}>Eliminar</button>
      </>

          )}
        </li>

      ))}
    </ul>

    </div>
  );
}

export default ListaTareas;
