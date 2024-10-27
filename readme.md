# Base de Datos de Comentarios y Subcomentarios

Este proyecto implementa una base de datos para manejar usuarios, comentarios y comentarios anidados (o "nested comments"). A continuación se describen las tablas, sus campos y las relaciones entre ellas.

# Proyecto de API REST con Express y SQL

Este proyecto implementa una API REST utilizando **Express** y una base de datos **SQL** para gestionar datos de usuarios, comentarios y comentarios anidados. La estructura de la API se basa en el uso de controladores y rutas organizadas, lo que facilita el mantenimiento y la expansión del proyecto.

## Tecnologías Utilizadas

- **Node.js** con **Express**: Framework para construir el servidor y manejar las rutas de la API.
- **SQL**: Base de datos relacional para almacenar los datos de usuarios y comentarios con relaciones bien definidas.
- **Sequelize**: ORM para interactuar con la base de datos SQL, simplificando las consultas y la gestión de las asociaciones entre tablas.

## Estructura del Proyecto

El proyecto está organizado en tres capas principales:

1. **Modelos**: Definen la estructura de las tablas en la base de datos y las relaciones entre ellas. Sequelize facilita esta definición.

2. **Controladores**: Contienen la lógica de negocio de la API. Cada controlador maneja una funcionalidad específica (como crear un usuario, añadir un comentario, o listar comentarios) y actúa como intermediario entre las rutas y la base de datos.

3. **Rutas**: Utilizamos Express para definir rutas específicas de cada recurso (usuarios, comentarios, comentarios anidados). Cada ruta está conectada a un controlador que se encarga de procesar la solicitud y devolver la respuesta adecuada.

## Ejemplo de Estructura de Código

### 1. Modelo de Comentarios (`models/comment.js`)

Define la estructura y las asociaciones de la tabla `comments` en la base de datos:

```javascript
const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Comment = sequelize.define('Comment', {
    content: { type: DataTypes.TEXT, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false }
});

module.exports = Comment;

``` 

# API de Comentarios

Esta API permite gestionar comentarios de usuarios, implementada con **Express** y conectada a una base de datos. Incluye funcionalidades para listar, crear, actualizar y eliminar comentarios, con validación de contenido y asociación de comentarios a usuarios.

## Rutas de la API

### Obtener comentarios
- **GET /comments**: Devuelve todos los comentarios junto con los datos del usuario (nombre de usuario y correo electrónico).

### Crear un comentario
- **POST /comments**: Crea un nuevo comentario.
  - Requiere `content` y `email`.
  - Si el usuario no existe, lo crea automáticamente.

### Actualizar un comentario
- **PUT /comments/:id**: Actualiza el contenido de un comentario existente.
  - Requiere `content`.
  - Devuelve un error 404 si el comentario no existe.

### Eliminar un comentario
- **DELETE /comments/:id**: Elimina un comentario por su ID.
  - Devuelve un error 404 si el comentario no existe.

## Validación de Datos
Cada ruta incluye validaciones básicas para asegurar que los datos requeridos estén presentes y maneja errores para garantizar respuestas adecuadas al cliente.

## Estructura de la Base de Datos

La base de datos está compuesta por tres tablas: `users`, `comments` y `nested_comments`. Estas tablas están relacionadas para permitir la creación de comentarios por parte de los usuarios, así como la gestión de comentarios anidados.

### Tabla `users`

La tabla `users` almacena información básica de los usuarios. Cada usuario tiene un identificador único (`id`) y un correo electrónico (`email`).

```sql
CREATE TABLE IF NOT EXISTS users(
    id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(45) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS comments(
    id INT NOT NULL AUTO_INCREMENT,
    content TEXT NOT NULL,
    id_user INT,
    PRIMARY KEY(id),
    FOREIGN KEY(id_user) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS nested_comments (
    id INT NOT NULL AUTO_INCREMENT,
    comment_id INT,
    parent_comment_id INT,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (comment_id) REFERENCES comments(id),
    FOREIGN KEY (parent_comment_id) REFERENCES nested_comments(id)
);
```


