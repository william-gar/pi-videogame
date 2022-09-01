import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterByGenre } from "../../actions";

export default function FilterByGenre({ handleSetCurrentPage }) {
  const dispatch = useDispatch();
  const allGenres = useSelector((state) => state.genres);

  const handleFilterByGenre = (e) => {
    handleSetCurrentPage();
    dispatch(filterByGenre(e.target.value));
  };

  return (
    <>
      <select defaultValue="default" onChange={(e) => handleFilterByGenre(e)}>
        <option value="All Genres">All Genres</option>
        {allGenres?.map((el) => {
          return <option value={el.name}>{el.name}</option>;
        })}
      </select>
    </>
  );
}
