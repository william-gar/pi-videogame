const axios = require("axios");
const { Genre } = require("../db");
require("dotenv").config();
const { API_KEY } = process.env;

const loadGenres = async (db = false) => {
  let genres = [];

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

  if (db) await Genre.bulkCreate(genres);

  return genres;
};

// GET - GENRES
const getGenres = async (req, res) => {
  //
};
module.exports = {
  loadGenres,
  getGenres,
};
