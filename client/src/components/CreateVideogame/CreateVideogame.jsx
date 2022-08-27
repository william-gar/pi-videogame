import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postvideogame, filterByGenre, getGenres } from "../../actions/index";
import { useDispatch, useSelector } from "react-redux";

export default function CreateVideogame() {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);

  const inputs = [
    { name: "text" },
    { image: "text" },
    { description: "textarea" },
    { released: "date" },
    { rating: "number" },
  ];

  const [input, setInput] = useState({
    name: "",
    image: "",
    description: "",
    released: "",
    rating: 0,
    genres: [],
    platforms: [],
  });

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  return (
    <div>
      <Link to="/home">
        <button>&#8592; Go Back</button>
      </Link>
      <h1>Create VideoGame</h1>
      <form>
        {/* <div>
          <label>Name:</label>
          <input type="text" value={input.name} name="name"></input>
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={input.description}
            name="description"
          ></input>
        </div>
        <div>
          <label>Name:</label>
          <input type="text" value={input.name} name="name"></input>
        </div> */}
        {inputs.map((e) => {
          return Object.values(e).join() !== "textarea" ? (
            <div>
              <input
                type={`${Object.values(e).join()}`}
                value={input[`"${Object.keys(e).join()}"`]}
                name={Object.keys(e).join()}
                placeholder={`${Object.keys(e).join()}`}
              ></input>
            </div>
          ) : (
            <div>
              <textarea
                type="text"
                value={input[`"${Object.keys(e).join()}"`]}
                name={Object.keys(e).join()}
                placeholder={`${Object.keys(e).join()}`}
              ></textarea>
            </div>
          );
        })}
        {<div>Hola Mundo</div>}
      </form>
    </div>
  );
}
