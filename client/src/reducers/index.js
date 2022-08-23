import { GET_VIDEOGAMES, SORT_BY_RATING, GET_GENRES } from "../types";

const initialState = {
  videogames: [],
  allVideogames: [],
  genres: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
        allVideogames: action.payload,
      };

    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };

    case SORT_BY_RATING:
      const ratingSort =
        action.payload === "low"
          ? state.allVideogames.sort((a, b) => {
              if (a.rating > b.rating) return 1;
              if (b.rating > a.rating) return -1;
              return 0;
            })
          : state.allVideogames.sort((a, b) => {
              if (a.rating > b.rating) return -1;
              if (b.rating > a.rating) return 1;
              return 0;
            });

      return {
        ...state,
        videogames: [...ratingSort],
      };
    default:
      return state;
  }
}

export default rootReducer;
