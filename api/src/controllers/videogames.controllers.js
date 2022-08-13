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

    // Get more than 20 characters. Change value in constant quantity.
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
    const videogamesDb = await Videogame.findAll({
      include: [{ model: Genre }],
    });

    return videogamesDb;
  } catch (error) {
    console.log(error);
  }
};
// ------------------------------------------------------------------------------

// GET VIDEOGAMES BY NAME API--------------------------------------------------------
const getVideogamesApiByName = async (name, quantity) => {
  let videogamesByName = await axios(
    `https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`
  );

  videogamesByName = videogamesByName.data.results.slice(0, quantity);

  return videogamesByName;
};
// ------------------------------------------------------------------------------

// GET ALL VIDEOGAMES - API + DB ------------------------------------------------
const getAllVideogames = async (req, res) => {
  let { name } = req.query;

  const apiVideogames = await getVideogamesApi();
  const dbVideogames = await getVideogamesDb();

  if (name) {
    name = name.toLowerCase();
    let quantity = 15;

    const nameDb = dbVideogames.filter((game) =>
      game.name.toLowerCase.includes(name)
    );

    if (nameDb) {
      quantity = 15 - nameDb.length;
    }

    let videogames = await getVideogamesApiByName(name, quantity);

    videogames = [...nameDb, ...videogames];

    videogames = videogames.map((game) => {
      const { id, name, genres, rating } = game;
      const obj = {
        id,
        name,
        genres: genres.map((g) => g.name),
        rating,
      };
      return obj;
    });

    return res.send(videogames);
  }

  const allVideogames = [...apiVideogames, ...dbVideogames];

  return res.send(allVideogames);
};
// -----------------------------------------------------------------------------

module.exports = {
  getAllVideogames,
};
