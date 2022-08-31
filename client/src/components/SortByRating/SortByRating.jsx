import React from "react";

export default function SortByRating({ handleSortByRating }) {
  return (
    <>
      <select
        name="select"
        defaultValue="default"
        onChange={(e) => handleSortByRating(e, 1)}
      >
        <option disabled value="default">
          Rating
        </option>
        <option value="low">Low to High</option>
        <option value="high">High to Low</option>
      </select>
    </>
  );
}
