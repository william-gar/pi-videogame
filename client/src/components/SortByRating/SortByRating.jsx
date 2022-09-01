import React from "react";
import { useDispatch } from "react-redux";
import { sortByRating } from "../../actions";

export default function SortByRating({ handleSetCurrentPage }) {
  const dispatch = useDispatch();

  const handleSortByRating = (e) => {
    handleSetCurrentPage();
    dispatch(sortByRating(e.target.value));
  };

  return (
    <>
      <select
        name="select"
        defaultValue="default"
        onChange={(e) => handleSortByRating(e)}
      >
        <option disabled value="default">
          Rating
        </option>
        <option value="default">Default</option>
        <option value="low">Low to High</option>
        <option value="high">High to Low</option>
      </select>
    </>
  );
}
