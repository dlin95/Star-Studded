import React from "react";
import axios from "axios";
import { toast } from "react-toastify";

const MovieCard = (props) => {
  const handleAddToWatchList = async function (e, movie_id) {
    e.preventDefault();
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    const watchlist = {
      user_id: currentUser.id,
      movie_id: movie_id,
    };

    return await axios
      .post("/api/watchlist", watchlist)
      .then((result) => {
        console.log("Added to Watchlist");
        toast.success("Added successfully to Watchlist");
      })
      .catch((error) => {
        toast.error("Failed to Add to WatchList");
      });
  };

  const imageUrl = "https://image.tmdb.org/t/p/w500/" + props.poster_path;

  return (
    <div className="card">
      <img src={imageUrl} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <div className="d-flex justify-content-between">
          <small>{props.release_date}</small>
          <span className="badge rounded-pill text-bg-warning">
            <i class="fa-solid fa-star me-1"></i>
            {props.vote_average.toFixed(1)}
          </span>
        </div>
        <div className="mt-2 d-flex justify-content-between align-items-center">
          <button
            type="button"
            className="btn btn-light mt-1"
            onClick={(e) => handleAddToWatchList(e, props.id)}
          >
            <i className="fa-regular fa-plus me-1"></i>Watchlist
          </button>
          <i className="fa-regular fa-2x fa-heart"></i>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
