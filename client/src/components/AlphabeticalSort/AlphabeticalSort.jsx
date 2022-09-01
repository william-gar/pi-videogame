import React from "react";

export default function AlphabeticalSort({ handleAlphabeticalSort }) {
  return (
    <>
      <select
        defaultValue="default"
        onChange={(e) => handleAlphabeticalSort(e, 1)}
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
