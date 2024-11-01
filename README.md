# TaskMaster
TaskMaster es una aplicación de administración de tareas desarrollada con React. Este proyecto permite a los usuarios registrarse, iniciar sesión, y gestionar sus tareas de manera eficiente. Incluye funciones de registro, inicio de sesión, y un sistema CRUD (Crear, Leer, Actualizar, Eliminar) para las tareas. La aplicación hace uso de SweetAlert para notificaciones y de `localStorage` para gestionar la autenticación del usuario.

## Estructura del Proyecto

- **FormRegister**: Componente para el registro de usuarios.
- **FormLogin**: Componente para el inicio de sesión de usuarios.
- **HomeContent**: Componente principal donde se gestionan las tareas.
- **Services**: Directorio que contiene las funciones para realizar solicitudes HTTP (`GetUsers`, `PostUsers`, `GetTareas`, `PostTareas`, `UpdateTareas`, `DeleteTareas`).

## Componentes
1. **FormRegister**
Este componente permite a los usuarios registrarse en la plataforma.

- Validaciones: Comprueba que todos los campos estén llenos y que el email no esté registrado previamente.
- Notificaciones: Usa SweetAlert para informar al usuario sobre el estado de su registro.
- Navegación: Redirige al inicio de sesión una vez que el registro es exitoso.

2. **FormLogin**
Este componente permite a los usuarios iniciar sesión.

- Validaciones: Comprueba que el usuario esté registrado y que las credenciales coincidan.
- Notificaciones: Informa al usuario si el inicio de sesión es exitoso o si las credenciales son incorrectas.
- Navegación: Redirige a Home después de un inicio de sesión exitoso.

3. **HomeContent (ListaTareas)**
El componente principal para la gestión de tareas.

- Crear tarea: Permite añadir una nueva tarea especificando un texto y una fecha de entrega.
- Editar tarea: Permite modificar el texto y la fecha de una tarea existente.
- Eliminar tarea: Permite eliminar tareas de la lista.
- Notificaciones: Usa SweetAlert para informar al usuario sobre el estado de las acciones CRUD.
- Carga de tareas: Usa useEffect para cargar tareas existentes al inicializar el componente.

4. **Servicios**
- GetUsers: Obtiene los datos de los usuarios registrados.
- PostUsers: Crea un nuevo usuario en la base de datos.
- GetTareas: Obtiene la lista de tareas para mostrar en HomeContent.
- PostTareas: Agrega una nueva tarea a la base de datos.
- UpdateTareas: Actualiza una tarea existente.
- DeleteTareas: Elimina una tarea existente de la base de datos.

## Dependencias Principales
- React: Librería principal para construir la interfaz de usuario.
- SweetAlert2: Biblioteca para alertas y notificaciones personalizadas.
- React Router: Para la navegación entre componentes y la gestión de rutas.

## Estilos
Los estilos se encuentran en la carpeta styles y cada componente tiene su archivo CSS correspondiente (FormRegister.css, FormLogin.css, HomeContent.css).
