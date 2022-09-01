import React, { useEffect } from "react";
import style from "./Pagination.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames } from "../../actions";

export default function Pagination({
  currentPage,
  setCurrentPage,
  videogamesPerPage,
}) {
  //--------------------------------------------------------------------
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.videogames);

  useEffect(() => {
    if (!allVideogames.length) dispatch(getVideogames());
  }, []);

  const lastPage = Math.ceil(allVideogames.length / videogamesPerPage);

  const paginado = (pageNumber) => {
    if (pageNumber === "prev" && currentPage > 1)
      setCurrentPage(currentPage - 1);
    if (pageNumber === "next" && currentPage < lastPage)
      setCurrentPage(currentPage + 1);

    if (typeof pageNumber === "number") setCurrentPage(pageNumber);
  };

  //--------------------------------------------------------------------
  const pageNumbers = [];

  for (
    let i = 1;
    i <= Math.ceil(allVideogames.length / videogamesPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <div>
      {pageNumbers.length <= 1 ? null : (
        <nav className={style.pagination}>
          <ul>
            {pageNumbers.length > 1 ? (
              <li
                onClick={() => paginado("prev")}
                className={currentPage === 1 ? style.disconnect : ""}
              >
                &#9650;
              </li>
            ) : null}
            {pageNumbers &&
              pageNumbers.map((number) => (
                <li
                  key={number}
                  className={currentPage === number ? style.active : ""}
                >
                  <a onClick={() => paginado(number)} href>
                    {number}
                  </a>
                </li>
              ))}
            {pageNumbers.length > 1 ? (
              <li
                onClick={() => paginado("next")}
                className={currentPage === lastPage ? style.disconnect : ""}
              >
                &#9660;
              </li>
            ) : null}
          </ul>
        </nav>
      )}
    </div>
  );
}
