import {
  GET_VIDEOGAMES,
  GET_GENRES,
  FILTER_BY_GENRE,
  FILTER_BY_API_OR_DB,
  SORT_BY_RATING,
} from "../types";

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

    case FILTER_BY_GENRE:
      let genreFilter;

      if (action.payload === "All Genres") {
        genreFilter = state.allVideogames;
      } else {
        const vGames = state.allVideogames;
        vGames.forEach((el) => {
          if (typeof el.genres[0] !== "string") {
            el.genres = el.genres.map((e) => e.name);
          }
        });

        genreFilter = vGames.filter((el) => el.genres.includes(action.payload));
      }

      return {
        ...state,
        videogames: [...genreFilter],
      };

    case FILTER_BY_API_OR_DB:
      let apiOrDbFilter;

      if (action.payload === "all") {
        apiOrDbFilter = state.allVideogames;
      } else if (action.payload === "database") {
        apiOrDbFilter = state.allVideogames.filter((e) => e.createdInDb);
      } else {
        apiOrDbFilter = state.allVideogames.filter((e) => !e.createdInDb);
      }

      return {
        ...state,
        videogames: [...apiOrDbFilter],
      };

    case SORT_BY_RATING:
      const ratingSort =
        action.payload === "low"
          ? state.videogames.sort((a, b) => {
              if (a.rating > b.rating) return 1;
              if (b.rating > a.rating) return -1;
              return 0;
            })
          : state.videogames.sort((a, b) => {
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
