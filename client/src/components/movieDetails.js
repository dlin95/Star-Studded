import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./elements/Navbar/Navbar";
import Actor from "./elements/Actor/Actor";
import FourColumnGrid from "./elements/FourColumnGrid/FourColumnGrid";
import { toast } from "react-toastify";
import { API_URL, API_KEY } from "../config.js";
import { useParams } from "react-router-dom";
import "./movieDetails.scss";

const MovieDetails = () => {
  const [state, setState] = useState({
    movie: null,
    actors: null,
    loading: false,
  });
  const { movieId } = useParams();
  const [disabled, setDisabled] = useState(false);

  const handleAddToWatchList = function (e, movie) {
    e.preventDefault();
    setDisabled(true);
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    const watchlist = {
      user_id: currentUser.id,
      movie_id: movie.id,
      poster_path: movie.poster_path,
      title: movie.title,
      vote_average: movie.vote_average,
      release_date: movie.release_date,
    };

    return axios
      .post("/api/watchlist", watchlist)
      .then((result) => {
        toast.success("Added successfully to Watchlist");
        setDisabled(false);
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          toast.error(error.response.data);
        } else {
          toast.error("Fail to add to watchlist");
        }
        setDisabled(false);
      });
  };

  const handleAddToFavourite = function (e, movie) {
    e.preventDefault();
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    const favouriteMovie = {
      user_id: currentUser.id,
      movie_id: movie.id,
      poster_path: movie.poster_path,
      title: movie.title,
      vote_average: movie.vote_average,
      release_date: movie.release_date,
    };

    return axios
      .post("/api/favourites", favouriteMovie)
      .then((result) => {
        toast.success("Added successfully to Favourite");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data);
      });
  };

  const fetchData = async (endpoint) => {
    setState({ loading: true });
    Promise.all([
      axios.get(`${API_URL}movie/${movieId}?api_key=${API_KEY}`),
      axios.get(`${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`),
    ])
      .then((all) => {
        setState((prev) => ({
          ...prev,
          movie: all[0].data,
          actors: all[1].data.cast,
          loading: false,
        }));
        console.log(state);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    console.log(movieId);
    if (localStorage.getItem(`${movieId}`)) {
      const newState = JSON.parse(localStorage.getItem(`${movieId}`));
      setState({ ...newState });
    } else {
      setState({ ...state });
      const endPoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;
      fetchData(endPoint);
    }
  }, []);

  return (
    <>
      <Navbar />
      <div>
        {state.movie && (
          <main className="bigcard">
            <div>
              <img
                src={
                  `https://image.tmdb.org/t/p/w500/` + state.movie.poster_path
                }
                className="card-img-top w-50"
                alt="..."
              />
              <div className="card-body">
                <h2 className="card-descript title">{state.movie.title}</h2>
                <p className="card-descript overview">{state.movie.overview}</p>
                <h5 className="card-descript runtime">
                  Runtime: {state.movie.runtime} minutes
                </h5>
                <h5 className="card-descript tagline">
                  "{state.movie.tagline}"
                </h5>
                <div className="d-flex justify-content-between">
                  <small className="card-descript release-date">
                    Release date: {state.movie.release_date}
                  </small>
                  <span className="badge rounded-pill text-bg-warning">
                    <i className="fa-solid fa-star me-1"></i>
                    {state.movie.vote_average.toFixed(1)}
                  </span>
                </div>
                <div className="mt-2 d-flex justify-content-start align-items-center">
                  <button
                    type="button"
                    className="btn btn-light mt-1 me-4"
                    disabled={disabled}
                    onClick={(e) => handleAddToWatchList(e, state.movie)}
                  >
                    <i className="fa-regular fa-plus me-1"></i>Watchlist
                  </button>
                  <i
                    className="fa-2x fa-solid fa-heart pointer"
                    onClick={(e) => handleAddToFavourite(e, state.movie)}
                  ></i>
                </div>
              </div>
            </div>
          </main>
        )}
        {state.actors && (
          <div className="movie-grid">
            <FourColumnGrid header={"Actors"}>
              {state.actors.map((e, i) => {
                <pre>{e.name}</pre>;
                return <Actor key={i} actor={e} />;
              })}
            </FourColumnGrid>
          </div>
        )}
      </div>
    </>
  );
};

export default MovieDetails;
