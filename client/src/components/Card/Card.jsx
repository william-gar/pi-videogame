import React from "react";
import style from "./Card.module.css";

export const Card = ({ name, image, rating, genres }) => {
  return (
    <div className={style.cardContainer}>
      <div className={style.cardName}>
        <h1>{name}</h1>
      </div>
      <div className={style.cardImage}>
        <img src={image} alt={name} />
      </div>
      <div className={style.cardRating}>
        <h3>{rating} ⭐</h3>
      </div>
      <div className={style.cardGenres}>{genres.toString()}</div>
    </div>
  );
};
