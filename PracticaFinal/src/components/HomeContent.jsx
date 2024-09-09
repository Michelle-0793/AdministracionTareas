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
  
  const CambiarValorInput = (event) => {
    setNuevaTarea(event.target.value);
  };

  const CambiarTextoEditado = (event) => {
    setTareaEditada(event.target.value);
  };

//AÑADIR TAREA
  const AñadirTarea = () => { //Función flecha para añadir
    if (NuevaTarea.trim() !== "") { // Agregar verificación de espacio vacío
      const nuevaTarea = { id: Date.now(), text: NuevaTarea }; //Date.now identificador unico, en tiempo
      PostTareas(nuevaTarea); // Guardar la tarea 
      setTareas([...Tareas, nuevaTarea]); //spread para agregar nueva tarea al final de la lista
      setNuevaTarea(""); // Limpiar campo de entrada
    }
  };

  //EDITAR Y ELIMINA TAREAS
  const EditarTarea = (tarea) => {
    setEditarTarea(tarea.id);
    setTareaEditada(tarea.text);
  };

  const EliminarTarea = (id) => {
    //En cada iteración, la función verifica si el id de la tarea actual 
    //(tarea.id) es diferente del id que busco eliminar.
    const nuevasTareas = Tareas.filter((tarea) => tarea.id !== id);
    DeleteTareas(id)
    setTareas(nuevasTareas); // Actualizamos el estado con las tareas filtradas
  };
  
//GUARDAR LO EDITADO
  const GuardarEdicion = async (id) => {
    const Editada = { id, text: TareaEditada };
    await UpdateTareas(Editada);
    setTareas(Tareas.map(tarea => tarea.id === id ? Editada : tarea));
    setEditarTarea(""); // Salir del modo de edición
    setTareaEditada(""); // Limpiar el texto editado
  };

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
  <h1>Lista de Tareas</h1>
  <input type="text" value={NuevaTarea} onChange={CambiarValorInput} />
  <button onClick={AñadirTarea}>Agregar Tarea</button>

{/*LISTA DE TAREAS*/}
    <ul>
      {Tareas.map((tarea) => (
        <li key={tarea.id}> {/*se mapea y se crea el li para cada tarea*/}
          {EditaTarea === tarea.id ? (
      <>
      <input type="text" /*Input pata editar la tarea*/ 
        value={TareaEditada}
        onChange={CambiarTextoEditado}/>
        
        <button onClick={() => GuardarEdicion(tarea.id)}>Guardar</button>
      </>
    ) : (
      <>
        {/* Si la tarea no está en modo edición, se va a mostrar el texto de la tarea */}
        {tarea.text}
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
