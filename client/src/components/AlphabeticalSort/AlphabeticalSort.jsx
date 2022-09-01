import React from "react";
import { useDispatch } from "react-redux";
import { alphabeticalSort } from "../../actions";

export default function AlphabeticalSort({ handleSetCurrentPage }) {
  const dispatch = useDispatch();

  const handleAlphabeticalSort = (e) => {
    handleSetCurrentPage();
    dispatch(alphabeticalSort(e.target.value));
  };
  return (
    <>
      <select
        defaultValue="default"
        onChange={(e) => handleAlphabeticalSort(e)}
      >
        <option disabled value="default">
          Alphabetical Sort
        </option>
        <option value="default">Default</option>
        <option value="a-z">A - Z</option>
        <option value="z-a">Z - A</option>
      </select>
    </>
  );
}
