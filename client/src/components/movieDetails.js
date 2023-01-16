import React, { useState, useEffect } from "react";
import "./movieDetails.scss";
import Navbar from "./elements/Navbar/Navbar";
import axios from "axios";
// import { toast } from "react-toastify";
import { API_URL, API_KEY } from "../config.js";
import { useParams } from "react-router-dom";

const MovieDetails = () => {
  const [state, setState] = useState({
    movie: null,
    loading: false,
  });
  const {movieId} = useParams();
  
  // const handleAddToWatchList = async (e, movie_id) => {
  //   e.preventDefault();
  //   // const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  //   // const watchlist = {
  //   //   user_id: currentUser.id,
  //   //   movie_id: movie_id,
  //   // };

  //   // return await axios
  //   //   .post("/api/watchlist", watchlist)
  //   //   .then((result) => {
  //   //     console.log("Added to Watchlist");
  //   //     toast.success("Added successfully to Watchlist");
  //   //   })
  //   //   .catch((error) => {
  //   //     toast.error("Failed to Add to WatchList");
  //   //   });
  // };
  const fetchData = async (endpoint) => {
    fetch(endpoint)
      .then((result) => result.json())
      .then((result) => {
        console.log(result);
        const movie = result
        setState({ movie, loading: false });
      });
  };

  useEffect(() => {
    // setState({ loading: true });
    // const query = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;
    // const res = await fetchData(query);
    // const movie = res;
    // setState({ movie, loading: false });
    console.log(movieId);
    if (localStorage.getItem(`${movieId}`)) {
      const newState = JSON.parse(
        localStorage.getItem(`${movieId}`)
        );
        setState({ ...newState });
      } else {
        setState({ ...state, loading: true });
        // const user = JSON.parse(sessionStorage.getItem("currentUser"));
        // https://api.themoviedb.org/3/movie/76600?api_key=ff8bf22061899c44db0f7ebbc6415994&language=en-US
        const endPoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;
        fetchData(endPoint);
    }
  }, []);

  const fetchItems = (endpoint) => {
    console.log("fetchdata");
    fetch(endpoint)
      .then((result) => result.json())
      .then((result) => {
        console.log(result);
        if (result.status_code) {
          this.setState({ loading: false });
        } else {
          this.setState(
            { movie: result },
            () => {
              const endpoint = `${API_URL}movie/${this.props.match.params.id}/credits?api_key=${API_KEY}`;
              fetch(endpoint)
                .then((result) => result.json())
                .then((result) => {
                  this.setState({
                    loading: false,
                  });
                });
            },
            () => {
              localStorage.setItem(
                `${this.props.match.params.id}`,
                JSON.stringify(this.state)
              );
            }
          );
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  // const props = state.movieId;

  // const imageUrl = "https://image.tmdb.org/t/p/w500/" + props.poster_path;

  return (
    <>
      <Navbar />
      { state.movie && (
        <main className="bigcard">
          <div className="card">
            <img
              src={
                `https://image.tmdb.org/t/p/w500/` +
                state.movie.poster_path
              }
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h2 className="card-descript title">{state.movie.title}</h2>
              <p className="card-descript overview">
                {state.movie.overview}
              </p>
              <h5 className="card-descript runtime">
                Runtime: {state.movie.runtime} minutes
              </h5>
              <h5 className="card-descript tagline">
                "{state.movie.tagline}"
              </h5>
              {/* {props.genres.name.map((genre, index) => (
                <p className="card-descript genre" key={index}>
                  {genre}
                </p>
              ))} */}
              <div className="d-flex justify-content-between">
                <small className="card-descript release-date">
                  Release date: {state.movie.release_date}
                </small>
                <span className="badge rounded-pill text-bg-warning">
                  <i className="fa-solid fa-star me-1"></i>
                  {state.movie.vote_average.toFixed(1)}
                </span>
              </div>
              {/* <div className="mt-2 d-flex justify-content-between align-items-center">
                <button
                  type="button"
                  className="btn btn-light mt-1"
                  onClick={(e) =>
                    this.handleAddToWatchList(e, this.state.movie.id)
                  }
                >
                  <i className="fa-regular fa-plus me-1"></i>Watchlist
                </button>
                <i className="fa-regular fa-2x fa-heart"></i>
              </div> */}
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default MovieDetails;
