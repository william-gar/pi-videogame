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
  POST_VIDEOGAME,
  GET_PLATFORMS,
  GO_BACK_HOME,
  RESET_VIDEOGAMES,
  MEMORY_CURRENT_PAGE,
  FROM_BY_NAME_TO_ALLVIDEOGAMES,
} from "../types";

const initialState = {
  videogames: [],
  allVideogames: [],
  genres: [],
  platforms: [],
  detail: [],
  videogamesByName: [],
  currentPage: 1,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        videogames: [...action.payload],
        allVideogames: [...action.payload],
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
        videogamesByName: [...action.payload],
      };

    case FILTER_BY_GENRE:
      let genreFilter;
      if (state.videogamesByName.length) {
        if (action.payload === "All Genres") {
          genreFilter = [...state.videogamesByName];
        } else {
          const vGames = [...state.videogamesByName];
          vGames.forEach((el) => {
            if (typeof el.genres[0] !== "string") {
              el.genres = el.genres.map((e) => e.name);
            }
          });

          genreFilter = vGames.filter((el) =>
            el.genres.includes(action.payload)
          );
        }
        if (!genreFilter.length) genreFilter.push("Error");

        return {
          ...state,
          videogames: [...genreFilter],
        };
      } else {
        if (action.payload === "All Genres") {
          genreFilter = [...state.allVideogames];
        } else {
          const vGames = [...state.allVideogames];
          vGames.forEach((el) => {
            if (typeof el.genres[0] !== "string") {
              el.genres = el.genres.map((e) => e.name);
            }
          });

          genreFilter = vGames.filter((el) =>
            el.genres.includes(action.payload)
          );
        }

        if (!genreFilter.length) genreFilter.push("Error");

        return {
          ...state,
          videogames: [...genreFilter],
        };
      }

    case FILTER_BY_API_OR_DB:
      let apiOrDbFilter;

      if (state.videogamesByName.length) {
        if (action.payload === "all") {
          apiOrDbFilter = [...state.videogamesByName];
        } else if (action.payload === "database") {
          apiOrDbFilter = [...state.videogamesByName].filter(
            (e) => e.createdInDb
          );
        } else {
          apiOrDbFilter = [...state.videogamesByName].filter(
            (e) => !e.createdInDb
          );
        }

        if (!apiOrDbFilter.length) apiOrDbFilter.push("Error");

        return {
          ...state,
          videogames: [...apiOrDbFilter],
        };
      } else {
        if (action.payload === "all") {
          apiOrDbFilter = [...state.allVideogames];
        } else if (action.payload === "database") {
          apiOrDbFilter = [...state.allVideogames].filter((e) => e.createdInDb);
        } else {
          apiOrDbFilter = [...state.allVideogames].filter(
            (e) => !e.createdInDb
          );
        }

        if (!apiOrDbFilter.length) apiOrDbFilter.push("Error");

        return {
          ...state,
          videogames: [...apiOrDbFilter],
        };
      }

    case ALPHABETICAL_SORT:
      let alphabeticalSort;
      if (action.payload === "default") {
        if (state.videogamesByName.length)
          alphabeticalSort = [...state.videogamesByName];
        else alphabeticalSort = [...state.allVideogames];
      } else {
        alphabeticalSort =
          action.payload === "a-z"
            ? [...state.videogames].sort((a, b) => {
                if (a.name > b.name) return 1;
                if (b.name > a.name) return -1;
                return 0;
              })
            : [...state.videogames].sort((a, b) => {
                if (a.name > b.name) return -1;
                if (b.name > a.name) return 1;
                return 0;
              });
      }

      return {
        ...state,
        videogames: [...alphabeticalSort],
      };

    case SORT_BY_RATING:
      let ratingSort;
      if (action.payload === "default") {
        if (state.videogamesByName.length)
          ratingSort = [...state.videogamesByName];
        else ratingSort = [...state.allVideogames];
      } else {
        ratingSort =
          action.payload === "low"
            ? [...state.videogames].sort((a, b) => {
                if (a.rating > b.rating) return 1;
                if (b.rating > a.rating) return -1;
                return 0;
              })
            : [...state.videogames].sort((a, b) => {
                if (a.rating > b.rating) return -1;
                if (b.rating > a.rating) return 1;
                return 0;
              });
      }

      return {
        ...state,
        videogames: [...ratingSort],
      };

    case GET_DETAIL_VIDEOGAME:
      let videogameInfo;
      if (!Array.isArray(action.payload)) {
        videogameInfo = { ...action.payload };

        if (videogameInfo.genres.length) {
          videogameInfo.genres =
            typeof videogameInfo.genres[0] !== "string"
              ? videogameInfo.genres.map((g) => g.name).join(", ")
              : videogameInfo.genres.join(", ");
        } else {
          videogameInfo.genres = `No Genres`;
        }

        if (videogameInfo.platforms.length) {
          videogameInfo.platforms = videogameInfo.platforms.join(", ");
        } else {
          videogameInfo.platforms = `No Platforms`;
        }

        if (!videogameInfo.description.length)
          videogameInfo.description = `No Description...`;
      } else {
        videogameInfo = [...action.payload];
      }

      return {
        ...state,
        detail: videogameInfo,
      };

    case RESET_DETAIL:
      return {
        ...state,
        detail: [],
      };

    case POST_VIDEOGAME:
      return {
        ...state,
      };

    case GET_PLATFORMS:
      return {
        ...state,
        platforms: action.payload,
      };

    case GO_BACK_HOME:
      if (state.videogamesByName.length) {
        state.videogames = [...state.videogamesByName];
      } else {
        state.videogames = [...state.allVideogames];
      }
      return {
        ...state,
      };

    case RESET_VIDEOGAMES:
      return {
        ...state,
        videogames: [],
        videogamesByName: [],
      };

    case MEMORY_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };

    case FROM_BY_NAME_TO_ALLVIDEOGAMES:
      return {
        ...state,
        videogames: [...state.allVideogames],
        videogamesByName: [],
      };

    default:
      return state;
  }
}

export default rootReducer;
