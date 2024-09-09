async function UpdateTareas(tarea) {
    try {
      const response = await fetch(`http://localhost:3001/tareas/${tarea.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(tarea)
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al actualizar la tarea:', error);
      throw error;
    }
  }
  
  export default UpdateTareas;