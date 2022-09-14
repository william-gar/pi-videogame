<!--![HenryLogo](https://d31uz8lwfmyn8g.cloudfront.net/Assets/logo-henry-white-lg.png)-->

# Project - Videogames App

<div align="center">
You can see the finished project here<br><br>
👉 <a href="https://pi-videogame-two.vercel.app/"><img width="60px" src="./link-project-deploy.png" /></a> 👈
</div>
<hr>

### Contact me:

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

## Project Details

This App was built using ReactJS, Redux, Node, Sequelize and PostgreSQL.

SPA in which you can see different video games available along with relevant information about them, using the [rawg](https://rawg.io/apidocs) external api and from it you can, among other things:

- Search VideoGames
- Filter / Sort them
- See the detail with information of each video game
- Add new VideoGames

---

<!--
### Endpoints/Flags utilizados de la Api

- GET <https://api.rawg.io/api/games>
- GET <https://api.rawg.io/api/games?search={game}>
- GET <https://api.rawg.io/api/genres>
- GET <https://api.rawg.io/api/games/{id}>
-->

### Technologies

[![Javascript Badge](https://img.shields.io/badge/-Javascript-F0DB4F?style=for-the-badge&labelColor=222222&logo=javascript&logoColor=F0DB4F)](#)
[![React Badge](https://img.shields.io/badge/-React%20JS-61DBFB?style=for-the-badge&labelColor=222222&logo=react&logoColor=61DBFB)](#)
[![Redux  Badge](https://img.shields.io/badge/-Redux-764ABC?style=for-the-badge&labelColor=222222&logo=redux&logoColor=ffffff)](#)

[![Expressjs Badge](https://img.shields.io/badge/-Express%20js-A52A2A?style=for-the-badge&labelColor=222222&logo=node.js&logoColor=3c873a)](#)
[![Sequelize Badge](https://img.shields.io/badge/-Sequelize-444444?style=for-the-badge&labelColor=222222&logo=sequelize&logoColor=ffffff)](#)
[![PostgreSQL Badge](https://img.shields.io/badge/-Postgresql-32658E?style=for-the-badge&labelColor=222222&logo=postgresql&logoColor=ffffff)](#)

---

## Database

The database model has the following entities:

- [ ] Video game with the following properties:
  - ID: UUIDV4
  - Name
  - Description
  - Released
  - Rating
  - Platforms
- [ ] Genres with the following properties:
  - ID
  - Name
- [ ] Platforms with the following properties:
  - ID
  - Name

The relationship between both entities is many-to-many since a video game can belong to several genres simultaneously and, in turn, a genre can contain multiple different video games. An example would be the game `Counter Strike` belongs to the Shooter and Action genres at the same time. But at the same time there are other video games considered as Shooter or as Action.

---

<div >
  <div>
    <img src="./deploy-images/database-image-1.png" width="90%"/>
  </div>
  <div>
    <img src="./deploy-images/database-image-2.png" width="90%" />
  </div>
</div>

**NOTE**: When we click on a video game, it can come from the API or the Database, so when its detail is shown there is no ambiguity in which one is shown.

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
