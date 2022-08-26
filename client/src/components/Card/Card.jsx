import React from "react";
import style from "./Card.module.css";
import defaultImage from "../../assets/images/default-image.jpg";
const stars = ["⭐", "⭐", "⭐", "⭐", "⭐"];

export const Card = ({ name, image, rating, genres }) => {
  return (
    <div className={style.cardContainer}>
      <div className={style.cardName}>
        <h1>{name}</h1>
      </div>
      <div className={style.cardImage}>
        <img src={image ? image : defaultImage} alt={name} />
      </div>
      <div className={style.cardRating}>
        <div>
          <h3>{rating}</h3>
        </div>
        <div>
          <h4>
            {rating ? stars.slice(0, Math.floor(rating)).join("") : `---`}
          </h4>
        </div>
      </div>
      <div className={style.cardGenres}>
        {genres.length ? genres.toString() : `No Genres`}
      </div>
    </div>
  );
};
