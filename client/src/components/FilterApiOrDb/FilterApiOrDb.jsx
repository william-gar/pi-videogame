import React from "react";
import { useDispatch } from "react-redux";
import { filterByApiOrDb } from "../../actions";

export default function FilterApiOrDb({ handleSetCurrentPage }) {
  const dispatch = useDispatch();

  const handleFilterByApiOrDb = (e) => {
    handleSetCurrentPage();
    dispatch(filterByApiOrDb(e.target.value));
  };
  return (
    <>
      <select defaultValue="default" onChange={(e) => handleFilterByApiOrDb(e)}>
        <option value="all">API & DB</option>
        <option value="api">API</option>
        <option value="database">DataBase</option>
      </select>
    </>
  );
}
