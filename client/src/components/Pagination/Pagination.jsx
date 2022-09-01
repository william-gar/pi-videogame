import React from "react";
import style from "./Pagination.module.css";

export default function Pagination({
  videogamesPerPage,
  allVideogames,
  paginado,
  currentPage,
  lastPage,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allVideogames / videogamesPerPage); i++) {
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
