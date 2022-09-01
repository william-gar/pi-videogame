import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterByGenre, getGenres } from "../../actions";

export default function FilterByGenre({ handleSetCurrentPage }) {
  const dispatch = useDispatch();
  const allGenres = useSelector((state) => state.genres);

  useEffect(() => {
    if (!allGenres.length) dispatch(getGenres());
  }, []);

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
