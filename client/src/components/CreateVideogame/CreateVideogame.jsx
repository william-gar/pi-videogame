import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  postVideogame,
  filterByGenre,
  getGenres,
  getPlatforms,
} from "../../actions/index";
import { useDispatch, useSelector } from "react-redux";
import style from "./CreateVideogame.module.css";

export default function CreateVideogame() {
  const dispatch = useDispatch();
  const history = useHistory();
  const allGenres = useSelector((state) => state.genres);
  let allPlatforms = useSelector((state) => state.platforms);

  allPlatforms = allPlatforms.slice(0, 20);
  // console.log(platforms);

  const genresNames = {};
  allGenres.forEach(
    (e, i) => (genresNames[allGenres[i].id] = allGenres[i].name)
  );

  const inputs = [
    { name: "text" },
    { image: "text" },
    { description: "textarea" },
    { released: "date" },
    { rating: "number" },
  ];

  // const selects = [{ genres }, { platforms }];
  // console.log(selects);

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

  useEffect(() => {
    dispatch(getPlatforms());
  }, []);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelect = (e) => {
    setInput({
      ...input,
      [e.target.name]: isNaN(e.target.value * 1)
        ? [...input[`${e.target.name}`], e.target.value]
        : [...input[`${e.target.name}`], e.target.value * 1],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input);
    dispatch(postVideogame(input));
    alert("VideoGame Created");
    setInput({
      name: "",
      image: "",
      description: "",
      released: "",
      rating: 0,
      genres: [],
      platforms: [],
    });
    history.push("/home");
  };

  return (
    <div className={style.containerCreateVideogame}>
      <Link to="/home">
        <button>&#8592; Go Back</button>
      </Link>
      <h1>Create VideoGame</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        {inputs.map((e) => {
          return Object.values(e).join() !== "textarea" ? (
            <div>
              <div>
                <label>{Object.keys(e).join()}:</label>
              </div>
              <input
                type={`${Object.values(e).join()}`}
                value={input[`"${Object.keys(e).join()}"`]}
                name={Object.keys(e).join()}
                placeholder={`${Object.keys(e).join()}`}
                onChange={(e) => handleChange(e)}
              ></input>
            </div>
          ) : (
            <div>
              <div>
                <label>{Object.keys(e).join()}:</label>
              </div>
              <textarea
                type="text"
                value={input[`"${Object.keys(e).join()}"`]}
                name={Object.keys(e).join()}
                placeholder={`${Object.keys(e).join()}`}
                onChange={(e) => handleChange(e)}
              ></textarea>
            </div>
          );
        })}
        <div>
          <select
            defaultValue="default"
            name="genres"
            onChange={(e) => handleSelect(e)}
          >
            <option value="default" disabled>
              Genres
            </option>
            {allGenres.map((e) => (
              <option value={e.id}>{e.name}</option>
            ))}
          </select>
          <div>
            <ul>
              {input.genres.map((e) => {
                return (
                  <li>
                    {genresNames[e]}
                    <button>X</button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div>
          <select
            defaultValue="default"
            name="platforms"
            onChange={(e) => handleSelect(e)}
          >
            <option value="default" disabled>
              Platforms
            </option>
            {allPlatforms.map((e) => (
              <option value={e.name}>{e.name}</option>
            ))}
          </select>
          <div>
            <ul>
              {input.platforms.map((el) => (
                <li>{el}</li>
              ))}
            </ul>
          </div>
        </div>
        <button type="submit">Create VideoGame</button>
      </form>
    </div>
  );
}

/*
{selects.map((e) => {
          return (
            <div>
              <div>
                <label>{Object.keys(e).join()}:</label>
              </div>
              <div>
                <select
                  defaultValue="default"
                  onChange={(e) => handleSelect(e)}
                  name={Object.keys(e).join()}
                >
                  <option disabled value="default">
                    {Object.keys(e).join()}
                  </option>
                  {e[`${Object.keys(e).join()}`].map((option) => {
                    return (
                      <option
                        value={option.name}
                        className={`style.${option.name}`}
                        disabled={input[`${Object.keys(e)}`].includes(
                          option.name
                        )}
                      >
                        {option.name}
                      </option>
                    );
                  })}
                </select>
                <ul>
                  {input[`${Object.keys(e)}`].map((el) => {
                    return input[`${Object.keys(e)}`].includes(el) ? (
                      <li>{el}</li>
                    ) : null;
                  })}
                </ul>
              </div>
            </div>
          );
        })}
*/
