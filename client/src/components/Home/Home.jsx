import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getVideogames,
  resetVideogames,
  memoryCurrentPage,
} from "../../actions/index";
import NavBar from "../NavBar/NavBar";
import ContainerCards from "../ContainerCards/ContainerCards";
import Pagination from "../Pagination/Pagination";
import metalSlug from "../../assets/images/metal-slug.gif";
import ErrorNotFound from "../ErrorNotFound/ErrorNotFound";
import style from "./Home.module.css";

export default function Home() {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.videogames);
  const memoryPage = useSelector((state) => state.currentPage);

  //Set VideoGames per page and current page ---------
  const [currentPage, setCurrentPage] = useState(memoryPage);
  const [videogamesPerPage] = useState(15);
  const indexOfLastVideogame = currentPage * videogamesPerPage; //15
  const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage; // 0
  const currentVideogames = allVideogames.slice(
    indexOfFirstVideogame,
    indexOfLastVideogame
  );

  const handleSetCurrentPage = () => {
    setCurrentPage(1);
    dispatch(memoryCurrentPage(1));
  };
  //--------------------------------------------------

  const handleRefresh = (e) => {
    e.preventDefault();
    handleSetCurrentPage();
    dispatch(resetVideogames());
    dispatch(getVideogames());
  };

  return (
    <div className={style.containerAllHome}>
      <Pagination
        videogamesPerPage={videogamesPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
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
            <NavBar
              handleRefresh={handleRefresh}
              handleSetCurrentPage={handleSetCurrentPage}
            />
          </div>
          <ContainerCards
            currentVideogames={currentVideogames}
            allVideogames={allVideogames}
          />
        </div>
      )}
    </div>
  );
}
