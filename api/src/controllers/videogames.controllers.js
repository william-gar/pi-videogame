const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;

const getVideogames = async (req, res) => {
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
      const { id, name, genres, rating, platforms, background_image } = char;
      const obj = {
        id,
        name,
        genres: genres ? genres.map((g) => g.name) : null,
        rating,
        platforms: platforms ? platforms.map((p) => p.platform.name) : null,
        background_image,
      };

      return obj;
    });
    console.log(videogamesApi.length);
    return res.send(videogamesApi);
  } catch (error) {
    console.log(`Error getting characters from API: ${error}`);
  }

  //   return res.send(api.data.results);
};

module.exports = {
  getVideogames,
};
