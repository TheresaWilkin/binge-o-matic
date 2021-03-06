import React from "react";
import TMDB from "../assets/tmdb.png";
import BrightEye from "../assets/bright-eye.png";
import Nav from "./Nav";

export default class AppWrapper extends React.Component {
  render() {
    return (
      <div className="bingomatic">
        <div className="wrapper">
          <header>
            <h1>
              Binge-
              <img className="eye" src={BrightEye} alt="o" />
              -matic
            </h1>
          </header>
          <Nav />
          {this.props.children}
        </div>
        <div className="push" />
        <footer className="footer">
          <img src={TMDB} alt="poster" />
          This product uses the TMDb API but is not endorsed or certified by
          TMDb.
          <p>
            Icon made by <a href="http://www.freepik.com/">Freepik</a> from{" "}
            <a href="http://www.flaticon.com/">www.flaticon.com</a> is licensed
            by{" "}
            <a href="http://creativecommons.org/licenses/by/3.0/">CC 3.0 BY</a>
          </p>
        </footer>
      </div>
    );
  }
}
