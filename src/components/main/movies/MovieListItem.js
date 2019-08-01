// MovieListItem.js

import React from "react";
import "./MovieListItem.css";
import { Link } from "react-router-dom";

const MovieListItem = ({ movie }) => {
  const {
    id,
    title,
    poster_path,
    release_date,
    vote_average,
    overview
  } = movie;
  const imgUrl = `https://image.tmdb.org/t/p/w342/${poster_path}`;
  const year = release_date.substring(0, 4);
  return (
    <>
      <div className="movie-list">
        <div className=" movie-item">
          <Link to={`/movie/${id}`} className="thumbnail">
            <div className="mb-3" style={{ maxWidth: "540px" }}>
              <div className="row no-gutters">
                <div className="col-md-4">
                  <img
                    src={imgUrl}
                    alt={title}
                    className="card-img movie-img"
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <p className="card-text">
                      <small className="text-muted ">
                        Year: {year}| Rating: {vote_average}
                      </small>
                    </p>
                    <h2 className="card-title movie-title">{title}</h2>
                    <p className="card-text">
                      {overview
                        .split(" ")
                        .splice(0, 20)
                        .join(" ")}
                      ...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default MovieListItem;
