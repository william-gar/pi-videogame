const axios = require("axios");
const { Genre } = require("../db");
// require("dotenv").config();
const { API_KEY } = process.env;

const loadGenres = async (db = false) => {
  let genres = [];

  const genresExist = await Genre.findAll();

  if (!genresExist.length) {
    const api = await axios(`https://api.rawg.io/api/genres?key=${API_KEY}`);

    genres = [...api.data.results];

    // Filter - Info
    genres = genres.map((genre) => {
      const { id, name } = genre;
      const obj = {
        id,
        name,
      };

      return obj;
    });
  }

  if (db && !genresExist.length) await Genre.bulkCreate(genres);

  return genres;
};
// --------------------------------------------------------

// GET - GENRES -------------------------------------------
const getGenres = async (req, res) => {
  try {
    // const genres = await loadGenres();

    const genres = await Genre.findAll();

    // console.log(`Genres length: ${genres.length}`);

    return res.status(200).send(genres);
  } catch (error) {
    return res.status(400).send(error);
  }
};
// --------------------------------------------------------

module.exports = {
  loadGenres,
  getGenres,
};
