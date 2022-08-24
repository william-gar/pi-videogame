import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetailVideogame, resetDetail } from "../../actions";
import { useEffect } from "react";
const stars = ["⭐", "⭐", "⭐", "⭐", "⭐"];

export default function Detail(props) {
  console.log(props);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetailVideogame(props.match.params.id));
  }, [dispatch]);

  const videogame = useSelector((state) => state.detail);

  function handleResetDetail() {
    dispatch(resetDetail());
  }

  const { id, name, description, released, rating, platforms, image, genres } =
    videogame;

  return (
    <div>
      <Link to="/home">
        <button className="goBackDetail" onClick={() => handleResetDetail()}>
          &#8592; Go Back
        </button>
      </Link>

      {videogame ? (
        <div>
          <h1>{name}</h1>
          <img src={image} alt={`pic-${name}`} />
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
}
