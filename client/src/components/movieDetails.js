import React, { useEffect, useState } from "react";
import "./movieDetails.scss";
import Navbar from "./Navbar";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL, API_KEY } from "../config.js";
import { fetchData } from "../utils/fetchData";

// ste this as state= localStorage.getItem(props.match.params.movie_id)
// set endpoint to movie
// similar to what darren does in movie list
const MovieDetails = () => {
  const [state, setState] = useState({
    movieId: null,
    loading: false,
    value: "",
  });

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

  // how to get movie_id??? --> in url
  // const movieId = 361743;

  useEffect(() => {
    const getMovieDetails = async () => {
      // setState({ loading: true });
      // const query = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;
      // const res = await fetchData(query);
      // const movie = res;
      // setState({ movie, loading: false });
      if (localStorage.getItem(`${this.props.match.params.movieId}`)) {
        const state = JSON.parse(
          localStorage.getItem(`${this.props.match.params.movieId}`)
        );
        this.setState({ ...state });
      } else {
        this.setState({ loading: true });
        const user = JSON.parse(sessionStorage.getItem("currentUser"));
        const endPoint = `${API_URL}movie/${this.props.match.params.movieId}?api_key=${API_KEY}`;
        this.fetchItems(endPoint);
      }
    };
    getMovieDetails();
  }, []);

  const fetchItems = (endpoint) => {
    fetch(endpoint)
      .then((result) => result.json())
      .then((result) => {
        this.setState({ movie: result }, () => {
          const endpoint = `${API_URL}movie/${this.props.match.params.movieId}/credits?api_key=${API_KEY}`;
          fetch(endpoint);
        });
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const props = state.movie;

  const imageUrl = "https://image.tmdb.org/t/p/w500/" + props.poster_path;

  console.log(props);

  return (
    <>
      <Navbar />
      <main className="bigcard">
        <div className="card">
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h2 className="card-descript title">{props.title}</h2>
            <p className="card-descript overview">{props.overview}</p>
            <h5 className="card-descript runtime">
              Runtime: {props.runtime} minutes
            </h5>
            <h5 className="card-descript tagline">"{props.tagline}"</h5>
            {/* {props.genres.name.map((genre, index) => (
              <p className="card-descript genre" key={index}>
                {genre}
              </p>
            ))} */}
            <div className="d-flex justify-content-between">
              <small className="card-descript release-date">
                Release date: {props.release_date}
              </small>
              <span className="badge rounded-pill text-bg-warning">
                <i className="fa-solid fa-star me-1"></i>
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
      </main>
    </>
  );
};

export default MovieDetails;
