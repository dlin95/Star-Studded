import React from "react";
import "./movieDetails.scss";
import Navbar from "./Navbar";

const MovieDetails = (props) => {
  props = props.movie;
  const imageUrl = "https://image.tmdb.org/t/p/w500/" + props.poster_path;
  console.log(props);
  console.log("hi mars");
  return (
    <>
      <Navbar />
      <main className="bigcard">
        <div className="card">
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h2 className="card-title">{props.title}</h2>
            <p className="card-overview">{props.overview}</p>
            <h5 className="card-runtime">Runtime: {props.runtime} minutes</h5>
            <h5 className="card-tagline">"{props.tagline}"</h5>
            {props.genres.map((genre) => (
              <p className="card-genre" key={genre}>
                {genre}
              </p>
            ))}
            <div className="d-flex justify-content-between">
              <small>Release date: {props.release_date}</small>
              <span className="badge rounded-pill text-bg-warning">
                <i className="fa-solid fa-star me-1"></i>
                {props.vote_average}
              </span>
            </div>
            <div className="mt-2 d-flex justify-content-between align-items-center">
              <button type="button" className="btn btn-light mt-1">
                <i className="fa-regular fa-plus me-1"></i>Watchlist
              </button>
              <i className="fa-regular fa-2x fa-heart"></i>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default MovieDetails;