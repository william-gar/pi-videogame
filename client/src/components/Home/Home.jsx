import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getVideogames,
  getGenres,
  // filterByGenre,
  filterByApiOrDb,
  alphabeticalSort,
  sortByRating,
} from "../../actions/index";
import { Card } from "../Card/Card";
import style from "./Home.module.css";
import Pagination from "../Pagination/Pagination";
import SearchBar from "../SearchBar/SearchBar";
import metalSlug from "../../assets/images/metal-slug.gif";
import FilterByGenre from "../FilterByGenre/FilterByGenre";
import FilterApiOrDb from "../FilterApiOrDb/FilterApiOrDb";
import AlphabeticalSort from "../AlphabeticalSort/AlphabeticalSort";
import SortByRating from "../SortByRating/SortByRating";
import ErrorNotFound from "../ErrorNotFound/ErrorNotFound";

export default function Home() {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.videogames);
  const allGenres = useSelector((state) => state.genres);

  //Paginado ------------------------------

  const [currentPage, setCurrentPage] = useState(1);
  const [videogamesPerPage, setVideogamesPerPage] = useState(15);
  const indexOfLastVideogame = currentPage * videogamesPerPage; //15
  const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage; // 0
  const currentVideogames = allVideogames.slice(
    indexOfFirstVideogame,
    indexOfLastVideogame
  );
  const lastPage = Math.ceil(allVideogames.length / videogamesPerPage);

  const paginado = (pageNumber) => {
    if (pageNumber === "prev" && currentPage > 1)
      setCurrentPage(currentPage - 1);
    if (pageNumber === "next" && currentPage < lastPage)
      setCurrentPage(currentPage + 1);

    if (typeof pageNumber === "number") setCurrentPage(pageNumber);
  };
  //---------------------------------------

  useEffect(() => {
    if (!allVideogames.length) dispatch(getVideogames());
  }, []);

  useEffect(() => {
    if (!allGenres.length) dispatch(getGenres());
  }, []);

  const handleSetCurrentPage = () => {
    setCurrentPage(1);
  };

  //--FILTER FUNCTIONS----------------------------
  // const handleFilterByGenre = (e, p) => {
  //   setCurrentPage(p);
  //   dispatch(filterByGenre(e.target.value));
  // };

  const handleFilterByApiOrDb = (e, p) => {
    setCurrentPage(p);
    dispatch(filterByApiOrDb(e.target.value));
  };
  //----------------------------------------------

  //--SORT FUNCTIONS------------------------------
  const handleAlphabeticalSort = (e, p) => {
    setCurrentPage(p);
    dispatch(alphabeticalSort(e.target.value));
  };

  const handleSortByRating = (e, p) => {
    setCurrentPage(p);
    dispatch(sortByRating(e.target.value));
  };
  //----------------------------------------------

  const handleRefresh = (e) => {
    e.preventDefault();
    dispatch(getVideogames());
  };

  return (
    <div className={style.containerAllHome}>
      <Pagination
        videogamesPerPage={videogamesPerPage}
        allVideogames={allVideogames.length}
        paginado={paginado}
        currentPage={currentPage}
        lastPage={lastPage}
      />
      {allVideogames.length === 1 && allVideogames[0] === "Error" ? (
        <ErrorNotFound />
      ) : allVideogames.length === 0 ? (
        <div className={style.loading}>
          <img src={metalSlug} alt="img-loading" />
          <div>
            <h3>Loading...</h3>
          </div>
        </div>
      ) : (
        <div>
          <div className={style.navBar}>
            <div className={style.titleHome}>
              <h1>VideoGames</h1>
              <button
                type="button"
                onClick={(e) => handleRefresh(e)}
                className={style.buttonRefresh}
              >
                Refresh &#8635;
              </button>
            </div>
            <div className={style.containerAllMenu}>
              <div className={style.containerFilter}>
                <FilterByGenre handleSetCurrentPage={handleSetCurrentPage} />
              </div>
              <div className={style.containerFilter}>
                <FilterApiOrDb handleFilterByApiOrDb={handleFilterByApiOrDb} />
              </div>
              <div className={style.containerFilter}>
                <AlphabeticalSort
                  handleAlphabeticalSort={handleAlphabeticalSort}
                />
              </div>
              <div className={style.containerFilter}>
                <SortByRating handleSortByRating={handleSortByRating} />
              </div>
              <div>
                <SearchBar />
              </div>
              <div className={style.containerButtonCreate}>
                <Link to="/create-videogame">
                  <button>Create</button>
                </Link>
              </div>
            </div>
          </div>
          <div className={style.cards}>
            {currentVideogames?.map((el) => {
              return (
                <fragment>
                  <Link to={"/home/" + el.id} className={style.linkCard}>
                    <Card
                      name={el.name}
                      image={el.image}
                      rating={el.rating}
                      key={el.id}
                      genres={el.genres.map((el) => {
                        if (typeof el === "string") return ` ${el}`;
                        else return ` ${el.name}`;
                      })}
                    />
                  </Link>
                </fragment>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
