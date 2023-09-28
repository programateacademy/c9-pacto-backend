![image](https://github.com/programateacademy/c9-pacto-backend/blob/main/Imag_redme_backend.png)

# Aplicación de Vinculación Laboral - Backend

Este repositorio contiene el código del backend de una aplicación que permite la vinculación laboral de personas con discapacidad con entidades, empresas y organizaciones interesadas en la inclusión laboral.

## Estructura del Proyecto

El proyecto está organizado de la siguiente manera:

- controllers: Esta carpeta contiene controladores para gestionar las publicaciones, comentarios y usuarios.
  - publicationscontrollers: Controladores relacionados con las publicaciones.
    - publications.js: Controlador para la gestión de publicaciones.
    - comments.js: Controlador para la gestión de comentarios.
  - users: Controladores relacionados con los usuarios.
    - auth.js: Controlador de autenticación de usuarios.
    - user.js: Controlador de usuarios.

- libs: Contiene el archivo initialSetup.js, que configura aspectos iniciales de la aplicación.

- middlewares: Aquí se encuentran los archivos para los middlewares utilizados en la aplicación.
  - authJwt.js: Middleware para la autenticación con JSON Web Tokens.
  - verifySignup.js: Middleware para verificar el registro de usuarios.

- models: Define los modelos de datos para la base de datos.
  - publicationsModels: Modelos relacionados con las publicaciones.
    - publications.js: Modelo para las publicaciones.
    - comments.js: Modelo para los comentarios.
  - users: Modelos de usuarios.
    - admin.js: Modelo para los administradores.
    - user.js: Modelo para los usuarios.

- node_modules: Contiene las dependencias de Node.js instaladas para el proyecto.

- routers: Define las rutas y controladores para las distintas partes de la aplicación.
  - PublicationsRoute: Rutas relacionadas con las publicaciones.
    - publications.js: Rutas para la gestión de publicaciones.
    - comments.js: Rutas para la gestión de comentarios.
  - users: Rutas de usuarios.
    - auth.js: Rutas de autenticación.
    - users.js: Rutas de usuarios.

- Otros archivos:
  - .gitignore: Archivos y carpetas excluidos del control de versiones.
  - app.js: Archivo principal de la aplicación.
  - config.js: Configuración de la aplicación.
  - database.js: Configuración de la base de datos.
  - index.js: Punto de entrada de la aplicación.
  - package-lock.json y package.json: Información de las dependencias y scripts del proyecto.

## Requisitos

- Node.js
- MongoDB

## Instalación

1. Clona este repositorio en tu máquina local.
2. Ejecuta npm install para instalar las dependencias.
3. Configura las variables de entorno necesarias en el archivo .env (si es necesario).
4. Ejecuta npm start para iniciar la aplicación.

## Instalacion
1 Clona el repositorio en tu maquina local

- git clone git@github.com:c9-pacto-backend
2 Navega en el directorio del proyecto

  cd backend_foro
3 Puedes cambiar el origen del proyecto con los siguientes comando

- git remote -v
- git remote remove origin
- git remote add origin <nueva_url_del_repositorio>
4 Instalar las dependecias necesarias

Recuerda tener el package.json y el package-lock.json en el root de la carpeta y ejecutas
- npm i
Uso
1 Inicia la app con

- npm run dev
2 Puedes acceder a ella desde el puerto configurado:

http://localhost:3000

3 Prueba las diferentes rutas disponibles para realizar operaciones anteriormente mecionada

## Contribución

Si deseas contribuir a este proyecto, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama para tus cambios: git checkout -b feature/nombre-del-cambio.
3. Realiza tus cambios y asegúrate de que las pruebas pasen.
4. Haz commit de tus cambios: git commit -m "Descripción de tus cambios".
5. Envía tus cambios a tu repositorio en GitHub: git push origin feature/nombre-del-cambio.
6. Crea un Pull Request desde tu rama a la rama principal del proyecto.


## Contacto

Si tienes preguntas o sugerencias, no dudes en ponerte en contacto con el equipo de desarrollo enviando un correo electrónico a alguno de los siguientes miembros:

jmcardenas1807@gmail.com 
Maribelaristizabal079@gmail.com
Sebastiantincon834@gmail.com
Jaljordan77@gmail.com
Palacioalexander5@gmail.com
Ruizvalencia78@gmail.com
Brayantandap@gmail.com


## Autores

@nicolas paez
@JMCardenass
@john palacios
@juan andres Ruiz
@brayan Triana
@maribel aristizabal
@Sebastian Beltran
@julian gaitan

¡Gracias por contribuir a la inclusión laboral de personas con discapacidad!
