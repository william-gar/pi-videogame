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
    // console.log(nameVideogame);
  };

  const handleSubmit = (e) => {
    handleSetCurrentPage();
    dispatch(resetVideogames());
    e.preventDefault();
    dispatch(getVideogamesByName(nameVideogame.trim()));
    setNameVideogame("");
  };
  return (
    <div className={style.searchBar}>
      <input
        className={style.search}
        value={nameVideogame}
        type="text"
        placeholder="Search..."
        onChange={(e) => handleInputChange(e)}
      ></input>
      <input
        type="submit"
        value="&#128269;"
        className={style.submit}
        onClick={(e) => handleSubmit(e)}
      ></input>
    </div>
  );
}
