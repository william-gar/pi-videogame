import React from "react";
import { Card } from "../Card/Card";
import style from "./ContainerCards.module.css";
import { Link } from "react-router-dom";
import { memoryCurrentPage } from "../../actions";
import { useDispatch } from "react-redux";

export default function ContainerCards({ currentVideogames, currentPage }) {
  const dispatch = useDispatch();

  const handleMemoryCurrentPage = () => {
    dispatch(memoryCurrentPage(currentPage));
  };

  return (
    <div className={style.cards}>
      {currentVideogames?.map((el) => {
        return (
          <fragment onClick={() => handleMemoryCurrentPage()}>
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
  );
}
