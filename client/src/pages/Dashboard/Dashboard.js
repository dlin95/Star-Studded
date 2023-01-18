import React from "react";
import MovieCard from "../../components/elements/MovieCard";
import Navbar from "../../components/elements/Navbar/Navbar";
import useMovieData from "../../hooks/useMovieData";


import "./Dashboard.scss";

const Dashboard = () => {
  const {
    state,
    setWatchList,
    setFavouriteMovie,
    removeWatchList,
    removeFavouriteMovie,
  } = useMovieData();

  const renderMovies = () => {
    let movies = (
      <div className="spinner-border text-danger" role="status">
        <span className="visually-hidden"> Loading...</span>
      </div>
    );
    if (state.movies) {
      movies = state.movies.map((movie) => {
        return (
          <MovieCard
            key={movie.id}
            setWatchList={setWatchList}
            setFavouriteMovie={setFavouriteMovie}
            trending={true}
            {...movie}
            {...state}
          />
        );
      });
    }
    return movies;
  };

  const renderWatchList = () => {
    let watchlist = (
      <div className="spinner-border text-danger" role="status">
        <span className="visually-hidden"> Loading...</span>
      </div>
    );
    if (state.watchList) {
      watchlist = state.watchList.map((movie) => {
        return (
          <MovieCard
            key={movie.movie_id}
            {...movie}
            watchlist={true}
            removeWatchList={removeWatchList}
          />
        );
      });
    }
    if (watchlist.length <= 0) {
      watchlist = (
        <div className="text-center">No Movie Added to watchlist</div>
      );
    }
    return watchlist;
  };

  const renderFavouriteMovie = () => {
    let favouriteMovie = (
      <div className="spinner-border text-danger" role="status">
        <span className="visually-hidden"> Loading...</span>
      </div>
    );
    if (state.favouriteMovie) {
      favouriteMovie = state.favouriteMovie.map((movie) => {
        return (
          <MovieCard
            key={movie.movie_id}
            {...movie}
            favourite={true}
            removeFavouriteMovie={removeFavouriteMovie}
          />
        );
      });
    }
    if (favouriteMovie.length <= 0) {
      favouriteMovie = (
        <div className="text-center">No Movie Added to favourite</div>
      );
    }
    return favouriteMovie;
  };

  return (
    <div>
      <Navbar />

      <main className="container text-start mt-4 mb-5 ">
        <div className="heading d-flex justify-content-between align-item-center mt-4 mb-2">
          <h3>Trending</h3>
          {/* <a href='/'>View All <i className="fa-solid fa-angles-right ms-1"></i> </a> */}
        </div>
        <div className="movielistContainer">{renderMovies()}</div>
        <div className="heading d-flex justify-content-between align-item-center mt-4 mb-2">
          <h3>Watchlist</h3>
        </div>
        <div className="movielistContainer">{renderWatchList()}</div>
        <div className="heading d-flex justify-content-between align-item-center mt-4 mb-2">
          <h3>Favourites</h3>
        </div>
        <div className="movielistContainer">{renderFavouriteMovie()}</div>
      </main>
    </div>
  );
};

export default Dashboard;
