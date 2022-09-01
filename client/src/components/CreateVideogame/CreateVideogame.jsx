import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postVideogame, getGenres, getPlatforms } from "../../actions/index";
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
    { rating: "text" },
    { released: "date" },
  ];

  // const selects = [{ genres }, { platforms }];
  // console.log(selects);
  const initialInputs = {
    name: "",
    image: "",
    description: "",
    released: "",
    rating: "",
    genres: [],
    platforms: [],
  };

  const [input, setInput] = useState({ ...initialInputs });

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    dispatch(getPlatforms());
  }, []);

  const [inputsErrors, setInputsErrors] = useState({});

  const inputsValidator = (form) => {
    let errors = {};
    let regexName = /^[A-Za-z\s]+$/;
    let regexDate = /^\d{4}-\d{2}-\d{2}$/;
    let regexImage = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpe?g|gif|png|webp|bmp)/i;

    if (
      !regexName.test(form.name.trim()) ||
      !form.name.trim() ||
      form.name.length > 15 ||
      form.name.length < 4
    )
      errors.name = "*Name is required (min 4 char & max 15 char)";

    if (!regexImage.test(form.image)) {
      errors.image = "*Image URL is required (enter a valid image url)";
    }

    if (form.description.length < 10 || form.description.length > 250)
      errors.description =
        "*Description is required (min 10 char & max 250 char)";

    if (!regexDate.test(form.released))
      errors.released = "*Release date is required - format(yyyy-mm-dd)";

    if (
      isNaN(form.rating) ||
      form.rating < 0 ||
      form.rating > 5 ||
      form.rating === ""
    )
      errors.rating = "*Rating is required number(min 0 & max 5)";

    if (form.genres.length > 5 || form.genres.length === 0)
      errors.genres = "*Select Genre (min 1 & max 5)";

    if (form.platforms.length > 5 || form.platforms.length === 0)
      errors.platforms = "*Select Platform (min 1 & max 5)";

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputsErrors(
      inputsValidator({
        ...input,
        [name]: value,
      })
    );

    setInput({
      ...input,
      [name]: isNaN(value * 1) ? value : Number.parseFloat(value).toFixed(2),
    });
    // console.log(typeof input.rating);
  };

  const handleSelect = (e) => {
    // console.log("Name: ", e.target.name);
    // console.log("Value: ", e.target.value);
    setInputsErrors(
      inputsValidator({
        ...input,
        [e.target.name]: isNaN(e.target.value * 1)
          ? [...input[`${e.target.name}`], e.target.value]
          : [...input[`${e.target.name}`], e.target.value * 1],
      })
    );

    if (input[`${e.target.name}`].length === 5) {
      setInput({
        ...input,
      });
    } else {
      setInput({
        ...input,
        [e.target.name]: isNaN(e.target.value * 1)
          ? [...new Set([...input[`${e.target.name}`], e.target.value])]
          : Array.from(
              new Set([...input[`${e.target.name}`], e.target.value * 1])
            ),
      });
    }
  };

  const handleDelete = (e, k) => {
    setInputsErrors(
      inputsValidator({
        ...input,
        [k]:
          k === "genres"
            ? input[k].filter((gen) => genresNames[gen] !== e)
            : input[k].filter((plat) => plat !== e),
      })
    );
    console.log("e: ", e);
    console.log("k: ", k);
    setInput({
      ...input,
      [k]:
        k === "genres"
          ? input[k].filter((gen) => genresNames[gen] !== e)
          : input[k].filter((plat) => plat !== e),
    });
  };

  const validator =
    input.name &&
    input.image &&
    input.description &&
    input.rating &&
    input.released &&
    input.genres.length &&
    input.platforms.length
      ? true
      : false;

  const handleSubmit = (e) => {
    e.preventDefault();
    // setInput({
    //   ...input,
    //   name: input.name.trim(),
    //   image: input.image.trim(),
    //   description: input.description.trim(),
    // });
    // console.log(input);
    if (Object.keys(inputsErrors).length === 0 && validator) {
      dispatch(postVideogame(input));
      alert("VideoGame Created");
      setInput({ ...initialInputs });
      history.push("/home");
    } else {
      alert("Complete All Inputs!!!");

      setInputsErrors(
        inputsValidator({
          ...input,
        })
      );
    }
  };

  return (
    <div className={style.containerCreateVideogame}>
      <Link to="/home">
        <button className={style.goBackHome}>&#8592; Go Home</button>
      </Link>
      <h1 className={style.title}>Create VideoGame</h1>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className={style.formCreateVideogame}
      >
        {inputs.map((e) => {
          return Object.values(e).join() !== "textarea" ? (
            <div className={style.containerInputs}>
              <div>
                <label className={style.labels}>{Object.keys(e).join()}:</label>
              </div>
              <input
                className={style.inputs}
                type={`${Object.values(e).join()}`}
                value={input[`"${Object.keys(e).join()}"`]}
                name={Object.keys(e).join()}
                placeholder={`${Object.keys(e).join()}`}
                onChange={(e) => handleChange(e)}
              ></input>
              {inputsErrors[`${Object.keys(e).join()}`] && (
                <p className={style.errorsMessages}>
                  {inputsErrors[`${Object.keys(e).join()}`]}
                </p>
              )}
            </div>
          ) : (
            <div className={style.containerInputs}>
              <div>
                <label className={style.labels}>{Object.keys(e).join()}:</label>
              </div>
              <textarea
                className={style.textarea}
                type="text"
                value={input[`"${Object.keys(e).join()}"`]}
                name={Object.keys(e).join()}
                placeholder={`${Object.keys(e).join()}`}
                onChange={(e) => handleChange(e)}
              ></textarea>
              {inputsErrors[`${Object.keys(e).join()}`] && (
                <p className={style.errorsMessages}>
                  {inputsErrors[`${Object.keys(e).join()}`]}
                </p>
              )}
            </div>
          );
        })}
        <div className={style.containerSelects}>
          <select
            defaultValue="default"
            name="genres"
            onChange={(e) => handleSelect(e)}
            disabled={input.genres.length === 5}
            className={style.selects}
          >
            <option value="default" disabled>
              Genres
            </option>
            {allGenres.map((e) => (
              <option value={e.id}>{e.name}</option>
            ))}
          </select>
          {inputsErrors.genres ? (
            <p className={style.errorsMessages}>{inputsErrors.genres}</p>
          ) : null}

          <div>
            <ul className={style.containerLiSelects}>
              {input.genres.length ? (
                input.genres.map((e) => {
                  return (
                    <li className={style.liSelects}>
                      {genresNames[e]}
                      <button
                        type="button"
                        className="buttonDelete"
                        onClick={() => handleDelete(genresNames[e], "genres")}
                      >
                        X
                      </button>
                    </li>
                  );
                })
              ) : (
                <p className={style.selectEmpty}>Select min 1 Genre & max 5</p>
              )}
            </ul>
          </div>
        </div>
        <div className={style.containerSelects}>
          <select
            defaultValue="default"
            name="platforms"
            onChange={(e) => handleSelect(e)}
            disabled={input.platforms.length === 5}
            className={style.selects}
          >
            <option value="default" disabled>
              Platforms
            </option>
            {allPlatforms.map((e) => (
              <option value={e.name}>{e.name}</option>
            ))}
          </select>
          {/* {inputsErrors.platforms && (
            <p className={style.errorsMessages}>{inputsErrors.platforms}</p>
          )} */}
          {inputsErrors.platforms ? (
            <p className={style.errorsMessages}>{inputsErrors.platforms}</p>
          ) : null}
          <div>
            <ul className={style.containerLiSelects}>
              {input.platforms.length ? (
                input.platforms.map((el) => (
                  <li className={style.liSelects}>
                    {el}
                    <button
                      type="button"
                      className="buttonDelete"
                      onClick={() => handleDelete(el, "platforms")}
                    >
                      X
                    </button>
                  </li>
                ))
              ) : (
                <p className={style.selectEmpty}>
                  Select min 1 Platform & max 5
                </p>
              )}
            </ul>
          </div>
        </div>
        <button
          type="submit"
          disabled={
            Object.keys(inputsErrors).length || !validator ? true : false
          }
          className={style.buttonSubmit}
        >
          Create VideoGame
        </button>
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
