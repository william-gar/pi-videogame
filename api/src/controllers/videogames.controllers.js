const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const { Videogame, Genre } = require("../db");

// VIDEOGAMES - API--------------------------------------------------------------
const getVideogamesApi = async (req, res) => {
  const quantity = 100;
  let videogamesApi = [];

  try {
    const api = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);

    videogamesApi = [...api.data.results];

    if (quantity > 20) {
      let apiAux = api;
      let residue = quantity % videogamesApi.length;

      if (residue === 0) residue = undefined;

      for (let i = 0; videogamesApi.length < quantity; i++) {
        let api2;
        api2 = await axios.get(apiAux.data.next);
        apiAux = api2;

        if (quantity - videogamesApi.length < 20) {
          videogamesApi = [
            ...videogamesApi,
            ...api2.data.results.slice(0, residue),
          ];
          break;
        }

        videogamesApi = [...videogamesApi, ...api2.data.results];
      }
    }

    // Format
    videogamesApi = videogamesApi.map((char) => {
      const {
        id,
        name,
        genres,
        rating,
        platforms,
        background_image: image,
      } = char;
      const obj = {
        id,
        name,
        genres: genres ? genres.map((g) => g.name) : null,
        rating,
        platforms: platforms ? platforms.map((p) => p.platform.name) : null,
        image,
      };

      return obj;
    });

    return videogamesApi;
  } catch (error) {
    throw new Error(`Error getting characters from API: ${error}`);
  }
};
//-------------------------------------------------------------------------------

// VIDEOGAMES - DataBase --------------------------------------------------------
const getVideogamesDb = async () => {
  try {
    let videogamesDb = await Videogame.findAll({
      include: {
        model: Genre,
        attributes: ["name"],
        through: { attributes: [] },
      },
    });

    return videogamesDb;
  } catch (error) {
    console.log(error);
  }
};
// ------------------------------------------------------------------------------

// GET VIDEOGAMES BY NAME API----------------------------------------------------
const getVideogamesApiByName = async (name, quantity) => {
  let videogamesByName = await axios(
    `https://api.rawg.io/api/games?search=${name.trim()}&key=${API_KEY}`
  );

  videogamesByName = videogamesByName.data.results.slice(0, quantity);

  return videogamesByName;
};
// ------------------------------------------------------------------------------

// GET ALL VIDEOGAMES - API + DB & BY NAME --------------------------------------
const getAllVideogames = async (req, res) => {
  let { name } = req.query;

  const apiVideogames = await getVideogamesApi();
  const dbVideogames = await getVideogamesDb();

  if (name) {
    name = name.toLowerCase().trim();
    let quantity = 15;

    let nameDb = dbVideogames.filter((game) =>
      game.name.toLowerCase().includes(name)
    );

    if (nameDb) {
      quantity = 15 - nameDb.length;
    }

    let videogames = await getVideogamesApiByName(name, quantity);

    videogames = videogames.map((game) => {
      const { id, name, background_image: image, genres, rating } = game;
      const obj = {
        id,
        name,
        image,
        genres: genres.map((g) => g.name),
        rating,
      };
      return obj;
    });

    nameDb = nameDb.map((game) => {
      const { id, name, image, genres, rating } = game;
      const obj = {
        id,
        name,
        image,
        genres: genres.map((g) => g.name),
        rating,
      };
      return obj;
    });

    videogames = [...nameDb, ...videogames];

    if (!videogames.length) videogames.push("Error");

    return res.send(videogames);
  }

  const allVideogames = [...apiVideogames, ...dbVideogames];

  return res.send(allVideogames);
};
// -----------------------------------------------------------------------------

// GET VIDEOGAME API - BY ID ---------------------------------------------------
const getVideogameApiById = async (idVideogame) => {
  try {
    let videogame = await axios(
      `https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`
    );

    if (!videogame) return `Game with id:${idVideogame} Not Found`;

    const {
      id,
      name,
      background_image: image,
      rating,
      genres,
      description_raw: description,
      released,
      platforms,
    } = videogame.data;

    const objVideogame = {
      id,
      name,
      image,
      rating,
      genres: genres.map((g) => g.name),
      description,
      released,
      platforms: platforms ? platforms.map((p) => p.platform.name) : null,
    };

    return objVideogame;
  } catch (error) {
    console.log(`An Error ocurred, ${error}`);
    return ["Error"];
  }
};

// GET VIDEOGAME BY ID --------------------------------------------------------
const getVideogameById = async (req, res) => {
  const { idVideogame } = req.params;

  try {
    if (idVideogame) {
      const dbVideogames = await getVideogamesDb();

      const videoGameFoundDb = dbVideogames.find(
        (game) => game.id == idVideogame
      );

      if (videoGameFoundDb) return res.status(200).send(videoGameFoundDb);

      const videoGameFoundApi = await getVideogameApiById(idVideogame);

      return res.status(200).send(videoGameFoundApi);
    }
  } catch (error) {
    // console.log(error);
    return res.status(404).send(videoGameFoundApi);
  }
};

// POST VIDEOGAME -------------------------------------------------------------
const postVideogame = async (req, res) => {
  let { name, description, released, rating, platforms, image, genres } =
    req.body;

  const validator =
    name && description && released && rating && platforms && image
      ? true
      : false;

  if (!validator) return res.status(400).send(`Some data is missing!`);

  name = name.trim();
  description = description.trim();
  image = image.trim();

  try {
    const obj = { name, description, released, rating, platforms, image };

    const newVideogame = await Videogame.create(obj);

    newVideogame.addGenres(genres);

    return res.status(200).send(`${name} videogame create successfully!`);
  } catch (error) {
    console.log(error);
  }
};
//---------------------------------------------------------

module.exports = {
  getAllVideogames,
  getVideogameById,
  postVideogame,
};
