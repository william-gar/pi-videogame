import React from "react";
import { useSelector } from "react-redux";

export default function FilterByGenre({ handleFilterByGenre }) {
  const allGenres = useSelector((state) => state.genres);
  return (
    <>
      <select
        defaultValue="default"
        onChange={(e) => handleFilterByGenre(e, 1)}
      >
        <option value="All Genres">All Genres</option>
        {allGenres?.map((el) => {
          return <option value={el.name}>{el.name}</option>;
        })}
      </select>
    </>
  );
}
