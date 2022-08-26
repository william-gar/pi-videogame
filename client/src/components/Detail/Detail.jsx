import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetailVideogame, resetDetail } from "../../actions";
import { useEffect } from "react";
import style from "./Detail.module.css";
import marioGif from "../../assets/images/mario.gif";
import defaultImage from "../../assets/images/default-image-detail.png";
const stars = ["⭐", "⭐", "⭐", "⭐", "⭐"];

export default function Detail(props) {
  // console.log(props);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetailVideogame(props.match.params.id));
  }, [dispatch]);

  const videogame = useSelector((state) => state.detail);

  function handleResetDetail() {
    dispatch(resetDetail());
  }

  const { name, description, released, rating, platforms, image, genres } =
    videogame;

  return (
    <div className={style.componentDetail}>
      <Link to="/home">
        <button
          className={style.goBackDetail}
          onClick={() => handleResetDetail()}
        >
          &#8592; Go Back
        </button>
      </Link>

      {name ? (
        <div className={style.containerDetail}>
          <div className={style.imageDetail}>
            <img src={image ? image : defaultImage} alt={`pic-${name}`} />
          </div>
          <div className={style.infoDetail}>
            <div className={style.nameDetail}>
              <h1>{name}</h1>
            </div>
            <div className={style.ratingDetail}>
              <h3>&nbsp;{rating}</h3>
              <h4>
                {rating ? stars.slice(0, Math.floor(rating)).join("") : `---`}
              </h4>
            </div>
            <div className={style.genresDetail}>
              <h3>
                <span>Genres:</span> {genres}
              </h3>
            </div>
            <div className={style.containerDescriptionDetail}>
              <div className={style.descriptionDetail}>
                <p>{description}</p>
              </div>
            </div>
            <div className={style.releasedDetail}>
              <h4>
                <span>Released:</span> {released ? released : `No Info`}
              </h4>
            </div>
            <div className={style.platformsDetail}>
              <h4>
                <span>Platforms:</span> {platforms}
              </h4>
            </div>
          </div>
        </div>
      ) : (
        <div className={style.loadingDetail}>
          <img src={marioGif} alt="loading" />
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
}
