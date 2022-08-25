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
} from "../types";

const initialState = {
  videogames: [],
  allVideogames: [],
  genres: [],
  detail: [],
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

    case GET_VIDEOGAMES_BY_NAME:
      // console.log(state.videogamesByName);
      return {
        ...state,
        videogames: [...action.payload],
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
      console.log(state.genres);
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

    case ALPHABETICAL_SORT:
      const alphabeticalSort =
        action.payload === "a-z"
          ? state.videogames.sort((a, b) => {
              if (a.name > b.name) return 1;
              if (b.name > a.name) return -1;
              return 0;
            })
          : state.videogames.sort((a, b) => {
              if (a.name > b.name) return -1;
              if (b.name > a.name) return 1;
              return 0;
            });

      return {
        ...state,
        videogames: [...alphabeticalSort],
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

    case GET_DETAIL_VIDEOGAME:
      let arreglo = action.payload;

      if (arreglo.genres.length) {
        arreglo.genres =
          typeof arreglo.genres[0] !== "string"
            ? arreglo.genres.map((g) => g.name).join(", ")
            : arreglo.genres.join(", ");
      } else {
        arreglo.genres = `No Genres`;
      }

      if (arreglo.platforms.length) {
        arreglo.platforms = arreglo.platforms.join(", ");
      } else {
        arreglo.platforms = `No Platforms`;
      }

      return {
        ...state,
        detail: arreglo,
      };

    case RESET_DETAIL:
      return {
        ...state,
        detail: [],
      };

    default:
      return state;
  }
}

export default rootReducer;
