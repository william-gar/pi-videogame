import React from "react";
import { Link } from "react-router-dom";
import style from "./LandingPage.module.css";

export default function LandingPage() {
  return (
    <div className={style.container}>
      <h1 className={style.title}>VideoGames</h1>
      <h2>Welcome</h2>
      <Link to="/home" className={style.containerButtonHome}>
        <button className={style.buttonHome}>Home</button>
      </Link>
    </div>
  );
}
