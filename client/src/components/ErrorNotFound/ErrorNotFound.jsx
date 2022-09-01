import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { goBackHome } from "../../actions";
import style from "./ErrorNotFound.module.css";
import errorNotFound from "../../assets/images/errorNotFound.gif";

const ErrorNotFound = () => {
  const dispatch = useDispatch();

  const handleGoBack = () => {
    dispatch(goBackHome());
  };

  return (
    <div className={style.containerErrorNotFound}>
      <Link to="/home">
        <button onClick={() => handleGoBack()} className={style.goBackHome}>
          &#8592; Go Back Home
        </button>
      </Link>
      <h2 className={style.messageError}>
        ⚠️Sorry, This Content Was Not Found⚠️
      </h2>
      <h3 className={style.emojiError}>😕</h3>
      <img
        src={errorNotFound}
        alt="img-errorNotFound"
        className={style.imageError}
      />
    </div>
  );
};

export default ErrorNotFound;
