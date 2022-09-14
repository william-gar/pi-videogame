<!--![HenryLogo](https://d31uz8lwfmyn8g.cloudfront.net/Assets/logo-henry-white-lg.png)-->

# Project - Videogames App

<div align="center">
Puedes ver el proyecto finalizado aquí:<br><br>
👉 <a href="https://pi-videogame-two.vercel.app/"><img width="60px" src="./link-project-deploy.png" /></a> 👈
</div>
<hr>

### Contactame:

<a href="https://www.linkedin.com/in/williamgar/">
  <img src="./client/src/assets/images/icons/linkedin.png" width="40px" />
</a>
<a href="mailto:williamgarm1@gmail.com" Subject=Repo%20VideoGames%20App">
  <img src="./client/src/assets/images/icons/mail.png" width="40px" />
</a>

<div align="center">
  <img height="200" src="./mando.png" />
</div>

---

## Detalles del Proyecto

Se construyó una App utlizando ReactJS, Redux, Node, Sequelize y PostgreSQL.

SPA en la cual se puedan ver distintos videojuegos disponibles junto con información relevante de los mismos, utilizando la api externa [rawg](https://rawg.io/apidocs) y a partir de ella poder, entre otras cosas:

- Buscar videjuegos
- Filtrarlos / Ordenarlos
- Ver el detalle con información de cada videojuego
- Agregar nuevos videojuegos

---

<!--
### Endpoints/Flags utilizados de la Api

- GET <https://api.rawg.io/api/games>
- GET <https://api.rawg.io/api/games?search={game}>
- GET <https://api.rawg.io/api/genres>
- GET <https://api.rawg.io/api/games/{id}>
-->

### Tecnologías utilizadas

[![Javascript Badge](https://img.shields.io/badge/-Javascript-F0DB4F?style=for-the-badge&labelColor=222222&logo=javascript&logoColor=F0DB4F)](#)
[![React Badge](https://img.shields.io/badge/-React%20JS-61DBFB?style=for-the-badge&labelColor=222222&logo=react&logoColor=61DBFB)](#)
[![Redux  Badge](https://img.shields.io/badge/-Redux-764ABC?style=for-the-badge&labelColor=222222&logo=redux&logoColor=ffffff)](#)

[![Expressjs Badge](https://img.shields.io/badge/-Express%20js-A52A2A?style=for-the-badge&labelColor=222222&logo=node.js&logoColor=3c873a)](#)
[![Sequelize Badge](https://img.shields.io/badge/-Sequelize-444444?style=for-the-badge&labelColor=222222&logo=sequelize&logoColor=ffffff)](#)
[![PostgreSQL Badge](https://img.shields.io/badge/-Postgresql-32658E?style=for-the-badge&labelColor=222222&logo=postgresql&logoColor=ffffff)](#)

## Base de datos

El modelo de la base de datos tiene las siguientes entidades:

- [ ] Videojuego con las siguientes propiedades:
  - ID: UUIDV4
  - Nombre
  - Descripción
  - Fecha de lanzamiento
  - Rating
  - Plataformas
- [ ] Generos con las siguientes propiedades:
  - ID
  - Nombre
- [ ] Plataformas con las siguientes propiedades:
  - ID
  - Nombre

La relación entre ambas entidades es de muchos a muchos ya que un videojuego puede pertenecer a varios géneros en simultaneo y, a su vez, un género puede contener múltiples videojuegos distintos. Un ejemplo sería el juego `Counter Strike` pertenece a los géneros Shooter y Action al mismo tiempo. Pero a su vez existen otros videojuegos considerados como Shooter o como Action.

---

<div >
  <div>
    <img src="./deploy-images/database-image-1.png" width="90%"/>
  </div>
  <div>
    <img src="./deploy-images/database-image-2.png" width="90%" />
  </div>
</div>

**NOTA**: Cuando hacemos click en algun videojuego, este puede provenir de la API o de la Base de Datos por lo que cuando se muestra su detalle no hay ambigüedad en cual se muestra.

---

## Backend

Se desarrolló un servidor en Node/Express con las siguientes rutas:

- [ ] **GET /videogames**:
  - Obtiene un listado de los videojuegos API + DATABASE
  - Devuelve solo los datos necesarios para la ruta principal
- [ ] **GET /videogames?name="..."**:
  - Obtiene un listado de las primeros 15 videojuegos que contengan la palabra ingresada como query parameter
  - Si no existe ningún videojuego mostrar una ruta de errorNotFound
- [ ] **GET /videogame/{idVideogame}**:
  - Obtiene el detalle de un videojuego en particular
  - Trae solo los datos pedidos en la ruta de detalle del videojuego
  - Incluye los géneros asociados
- [ ] **POST /videogames**:
  - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
  - Crea un videojuego en la base de datos, relacionado a sus géneros.
- [ ] **GET /genres**:
  - Obtiene todos los tipos de géneros de videojuegos posibles
  - En una primera instancia se trajeron desde la API rawg y se almacenaron en la base de datos para luego ya utilizarlos desde allí
- [ ] **GET /platforms**:
  - Obtiene todos los tipos de plataformas de videojuegos posibles
  - En una primera instancia se trajeron desde la API rawg y se almacenaron en la base de datos para luego ya utilizarlas desde allí

## Frontend

Se desarrolló una aplicación de React/Redux que contiene las siguientes pantallas/rutas.

**Pagina inicial**: landing page con

- [ ] Una imagen de fondo representativa al proyecto
- [ ] Botón para ingresar al home (`Ruta principal`)
<div align="center">
  <img width="90%" src="./deploy-images/landingPage.png" />
</div>

**Ruta principal**: contiene

- [ ] Input de búsqueda para encontrar videojuegos por nombre
- [ ] Área donde se ve el listado de videojuegos. Junto con su:
  - Imagen
  - Nombre
  - Géneros
- [ ] Botones/Opciones para filtrar por género y por videojuego existente o agregado por nosotros (dataBase)
- [ ] Botones/Opciones para ordenar tanto ascendentemente como descendentemente los videojuegos por orden alfabético y por rating
- [ ] Paginado para ir buscando y mostrando los siguientes videojuegos, 15 juegos por pagina, mostrando los primeros 15 en la primer pagina.

**IMPORTANTE**: Debido a que en la API existen alrededor de 500 mil juegos, por cuestiones de performance se simplificó para obtener y paginar los primeros 100 videojuegos.

<div align="center">
  <img width="90%" src="./deploy-images/home.png" />
</div>

**Ruta de detalle de videojuego**: contiene

- [ ] Los campos mostrados en la ruta principal para cada videojuegos (imagen, nombre, y géneros)
- [ ] Descripción
- [ ] Fecha de lanzamiento
- [ ] Rating
- [ ] Plataformas
<div align="center">
  <img width="90%" src="./deploy-images/detail.png" />
</div>

**Ruta de creación de videojuegos**: contiene

- [ ] Un formulario **controlado con JavaScript** con los siguientes campos:
  - Nombre
  - Descripción
  - Fecha de lanzamiento
  - Rating
  - Imagen - con una vista previa de la imagen para poder validar una imagen correcta.
- [ ] Posibilidad de seleccionar/agregar varios géneros
- [ ] Posibilidad de seleccionar/agregar varias plataformas
- [ ] Botón/Opción para crear un nuevo videojuego
<div align="center">
  <img width="90%" src="./deploy-images/createVideogame.png" />
</div>
> El formulario de creación está validado con JavaScript y no sólo con validaciones HTML.

---
