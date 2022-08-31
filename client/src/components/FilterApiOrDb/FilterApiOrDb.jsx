import React from "react";

export default function FilterApiOrDb({ handleFilterByApiOrDb }) {
  return (
    <>
      <select
        defaultValue="default"
        onChange={(e) => handleFilterByApiOrDb(e, 1)}
      >
        <option value="all">ALL</option>
        <option value="api">API</option>
        <option value="database">DataBase</option>
      </select>
    </>
  );
}
