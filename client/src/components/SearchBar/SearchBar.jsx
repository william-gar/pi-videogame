import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getVideogamesByName, resetVideogames } from "../../actions";
import style from "./SearchBar.module.css";

export default function SearchBar({ handleSetCurrentPage }) {
  const dispatch = useDispatch();
  const [nameVideogame, setNameVideogame] = useState("");

  const handleInputChange = (e) => {
    e.preventDefault();
    setNameVideogame(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (nameVideogame.trim().length) {
      handleSetCurrentPage();
      dispatch(resetVideogames());
      dispatch(getVideogamesByName(nameVideogame.trim()));
      setNameVideogame("");
    }
  };

  return (
    <div className={style.searchBar}>
      <form onSubmit={handleSubmit}>
        <input
          className={style.search}
          value={nameVideogame}
          type="text"
          placeholder="Search..."
          onChange={(e) => handleInputChange(e)}
          required
        ></input>
        <button type="submit" className={style.submit}>
          &#128269;
        </button>
      </form>
    </div>
  );
}
