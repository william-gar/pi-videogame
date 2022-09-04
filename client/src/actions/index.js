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
  GO_BACK_HOME,
  RESET_VIDEOGAMES,
  MEMORY_CURRENT_PAGE,
  FROM_BY_NAME_TO_ALLVIDEOGAMES,
} from "../types";

export function getVideogames() {
  return async function (dispatch) {
    let json = await axios(`/videogames`);

    return dispatch({
      type: GET_VIDEOGAMES,
      payload: json.data,
    });
  };
}

export function getGenres() {
  return async function (dispatch) {
    let genres = await axios(`/genres`);

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
    let videogamesByName = await axios(`/videogames?name=${name}`);

    return dispatch({
      type: GET_VIDEOGAMES_BY_NAME,
      payload: videogamesByName.data,
    });
  };
}

export function getDetailVideogame(id) {
  return async function (dispatch) {
    try {
      let videogameById = await axios.get(`/videogames/${id}`);

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
    const videogameCreate = await axios.post(`/videogames`, payload);
    // console.log(videogameCreate);
    return videogameCreate;
  };
}

export function getPlatforms() {
  return async function (dispatch) {
    let platforms = await axios(`/platforms`);

    return dispatch({
      type: GET_PLATFORMS,
      payload: platforms.data,
    });
  };
}

export function goBackHome() {
  return {
    type: GO_BACK_HOME,
  };
}

export function resetVideogames() {
  return {
    type: RESET_VIDEOGAMES,
  };
}

export function fromByNameToAllVideogames() {
  return {
    type: FROM_BY_NAME_TO_ALLVIDEOGAMES,
  };
}

export function memoryCurrentPage(page) {
  console.log(page);
  return {
    type: MEMORY_CURRENT_PAGE,
    payload: page,
  };
}
