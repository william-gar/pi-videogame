import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getVideogames,
  getGenres,
  filterByGenre,
  filterByApiOrDb,
  alphabeticalSort,
  sortByRating,
} from "../../actions/index";
import { Card } from "../Card/Card";
import style from "./Home.module.css";
import Pagination from "../Pagination/Pagination";
import SearchBar from "../SearchBar/SearchBar";
import metalSlug from "../../assets/images/metal-slug.gif";

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

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  //---------------------------------------

  useEffect(() => {
    dispatch(getVideogames());
    dispatch(getGenres());
  }, [dispatch]);

  function handleFilterByGenre(e) {
    setCurrentPage(1);
    dispatch(filterByGenre(e.target.value));
  }

  function handleFilterByApiOrDb(e) {
    setCurrentPage(1);
    dispatch(filterByApiOrDb(e.target.value));
  }

  function handleAlphabeticalSort(e) {
    setCurrentPage(1);
    dispatch(alphabeticalSort(e.target.value));
  }

  function handleSortByRating(e) {
    // e.preventDefault();
    setCurrentPage(1);
    dispatch(sortByRating(e.target.value));
  }

  return (
    <div className={style.containerAllHome}>
      <Pagination
        videogamesPerPage={videogamesPerPage}
        allVideogames={allVideogames.length}
        paginado={paginado}
      />
      {allVideogames.length === 0 ? (
        <div className={style.loading}>
          <img src={metalSlug} alt="img-loading" />
          <div>
            <h3>Loading...</h3>
          </div>
        </div>
      ) : (
        <div>
          <div>
            <select
              defaultValue="default"
              onChange={(e) => handleFilterByGenre(e)}
            >
              <option value="All Genres">All Genres</option>
              {allGenres?.map((el) => {
                return <option value={el.name}>{el.name}</option>;
              })}
            </select>
          </div>
          <div>
            <select
              defaultValue="default"
              onChange={(e) => handleFilterByApiOrDb(e)}
            >
              <option value="all">ALL</option>
              <option value="api">API</option>
              <option value="database">DataBase</option>
            </select>
          </div>
          <div>
            <select
              defaultValue="default"
              onChange={(e) => handleAlphabeticalSort(e)}
            >
              <option disabled value="default">
                Alphabetical Sort
              </option>
              <option value="a-z">A - Z</option>
              <option value="z-a">Z - A</option>
            </select>
          </div>
          <div>
            <select
              name="select"
              defaultValue="default"
              onChange={(e) => handleSortByRating(e)}
            >
              <option disabled value="default">
                Rating
              </option>
              <option value="low">Low to High</option>
              <option value="high">High to Low</option>
            </select>
          </div>
          <div>
            <SearchBar />
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
