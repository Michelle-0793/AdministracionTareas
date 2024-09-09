async function GetTareas() {
    try {
      const response = await fetch('http://localhost:3001/tareas');
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error al obtener las tareas:', error);
      throw error;
    }
  }
  
  export default GetTareas;