import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getVideogames, sortByRating } from "../../actions/index";
import { Card } from "../Card/Card";
import style from "./Home.module.css";
import Pagination from "../Pagination/Pagination";

export default function Home() {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.videogames);

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
  }, []);

  function handleSortByRating(e) {
    // e.preventDefault();
    setCurrentPage(1);
    dispatch(sortByRating(e.target.value));
  }

  return (
    <div>
      <Pagination
        videogamesPerPage={videogamesPerPage}
        allVideogames={allVideogames.length}
        paginado={paginado}
      />
      {allVideogames.length === 0 ? (
        <div className={style.loading}>
          <img
            src="https://i.gifer.com/origin/ac/acf3abb6da430dd78cc99f925bb52d49.gif"
            alt="img-loading"
          />
          <div>
            <h3>Loading...</h3>
          </div>
        </div>
      ) : (
        <div>
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
