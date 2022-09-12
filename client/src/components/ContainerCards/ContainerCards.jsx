import React from "react";
import { Card } from "../Card/Card";
import style from "./ContainerCards.module.css";
import { Link } from "react-router-dom";
import { fromByNameToAllVideogames } from "../../actions";
import { useDispatch, useSelector } from "react-redux";

export default function ContainerCards({ currentVideogames, allVideogames }) {
  const dispatch = useDispatch();

  const handleFromByNameToVideogame = () => {
    dispatch(fromByNameToAllVideogames());
  };

  const videogamesByName = useSelector((state) => state.videogamesByName);

  return (
    <div className={style.containerVideogamesByName}>
      {allVideogames.length <= 15 &&
      allVideogames.length >= 1 &&
      videogamesByName.length ? (
        <button
          type="button"
          className={style.returnAllVideogames}
          onClick={() => handleFromByNameToVideogame()}
        >
          &#8592; All Videogames
        </button>
      ) : null}
      <div className={style.cards}>
        {currentVideogames?.map((el) => {
          return (
            <fragment>
              <Link to={`/home/${el.id}`} className={style.linkCard}>
                <Card
                  name={el.name}
                  image={el.image}
                  rating={el.rating}
                  key={el.id}
                  genres={el.genres.map((el) => {
                    if (typeof el === "string") return ` ${el}`;
                    else return ` ${el.name}`;
                  })}
                />
              </Link>
            </fragment>
          );
        })}
      </div>
    </div>
  );
}
