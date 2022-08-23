import axios from "axios";
import { GET_VIDEOGAMES, SORT_BY_RATING } from "../types";

export function getVideogames() {
  return async function (dispatch) {
    let json = await axios(`http://localhost:3001/videogames`);

    return dispatch({
      type: GET_VIDEOGAMES,
      payload: json.data,
    });
  };
}

export function sortByRating(payload) {
  return {
    type: SORT_BY_RATING,
    payload,
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
