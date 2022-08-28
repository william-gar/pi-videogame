import axios from "axios";
import {
  GET_VIDEOGAMES,
  GET_GENRES,
  FILTER_BY_GENRE,
  FILTER_BY_API_OR_DB,
  ALPHABETICAL_SORT,
  SORT_BY_RATING,
  GET_VIDEOGAMES_BY_NAME,
  GET_DETAIL_VIDEOGAME,
  RESET_DETAIL,
  GET_PLATFORMS,
} from "../types";

export function getVideogames() {
  return async function (dispatch) {
    let json = await axios(`http://localhost:3001/videogames`);

    return dispatch({
      type: GET_VIDEOGAMES,
      payload: json.data,
    });
  };
}

export function getGenres() {
  return async function (dispatch) {
    let genres = await axios(`http://localhost:3001/genres`);

    return dispatch({
      type: GET_GENRES,
      payload: genres.data,
    });
  };
}

export function filterByGenre(payload) {
  return {
    type: FILTER_BY_GENRE,
    payload,
  };
}

export function filterByApiOrDb(payload) {
  return {
    type: FILTER_BY_API_OR_DB,
    payload,
  };
}

export function alphabeticalSort(payload) {
  return {
    type: ALPHABETICAL_SORT,
    payload,
  };
}

export function sortByRating(payload) {
  return {
    type: SORT_BY_RATING,
    payload,
  };
}

export function getVideogamesByName(name) {
  return async function (dispatch) {
    let videogamesByName = await axios(
      `http://localhost:3001/videogames?name=${name}`
    );

    return dispatch({
      type: GET_VIDEOGAMES_BY_NAME,
      payload: videogamesByName.data,
    });
  };
}

export function getDetailVideogame(id) {
  return async function (dispatch) {
    try {
      let videogameById = await axios.get(
        `http://localhost:3001/videogames/${id}`
      );

      return dispatch({
        type: GET_DETAIL_VIDEOGAME,
        payload: videogameById.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function resetDetail() {
  return {
    type: RESET_DETAIL,
  };
}

export function postVideogame(payload) {
  return async function (dispatch) {
    const videogameCreate = await axios.post(
      `http://localhost:3001/videogames`,
      payload
    );
    console.log(videogameCreate);
    return videogameCreate;
  };
}

export function getPlatforms() {
  return async function (dispatch) {
    let platforms = await axios(`http://localhost:3001/platforms`);

    return dispatch({
      type: GET_PLATFORMS,
      payload: platforms.data,
    });
  };
}

// export function getVideogames() {
//   return function (dispatch) {
//     let results = fetch(`https://localhost:3001/videogames`);

//     results.then((response) => response.json()).then((res) => res);

//     return dispatch({
//       type: "GET_VIDEOGAMES",
//       payload: results,
//     });
//   };
// }
