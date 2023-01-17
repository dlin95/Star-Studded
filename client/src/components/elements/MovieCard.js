import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Moment from 'moment';
import "./MovieCard.scss";

const MovieCard = (props) => {

  const handleAddToWatchList = function(e, movie) {
    e.preventDefault();
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    const watchlist = {
      "user_id": currentUser.id,
      "movie_id": movie.id,
      "poster_path": movie.poster_path,
      "title": movie.title,
      "vote_average": movie.vote_average,
      "release_date": movie.release_date
    };

    return axios.post('/api/watchlist', watchlist).then((result) => {
      toast.success('Added successfully to Watchlist');
      if (result.status === 200) {
        props.setWatchList(result.data);
      }
    }).catch((error) => {
      console.log(error);
      toast.error(error.response.data);
    });
  };

  const handleAddToFavourite = function(e, movie) {
    e.preventDefault();
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    const favouriteMovie = {
      "user_id": currentUser.id,
      "movie_id": movie.id,
      "poster_path": movie.poster_path,
      "title": movie.title,
      "vote_average": movie.vote_average,
      "release_date": movie.release_date
    };

    return axios.post('/api/favourite_movies', favouriteMovie).then((result) => {
      toast.success('Added successfully to Favourite');
      if (result.status === 200) {
        props.setFavouriteMovie(result.data);
      }
    }).catch((error) => {
      console.log(error);
      toast.error(error.response.data);
    });
  };

  const handleRemoveWatchList = (id) => {
    return axios.delete(`/api/watchlist/${id}/delete`).then((result) => {
      if (result.status === 200) {
        props.removeWatchList(id);
      }
      toast.success('Remove successfully from watchlist');
    }).catch((error) => {
      console.log(error);
      toast.error(error.response.data);
    });
  };

  const handleRemoveFavourite = (id) => {
    return axios.delete(`/api/favourite_movies/${id}/delete`).then((result) => {
      if (result.status === 200) {
        props.removeFavouriteMovie(id);
      }
      toast.success('Remove successfully from favourite');
    }).catch((error) => {
      console.log(error);
      toast.error(error.response.data);
    });
  };

  const imageUrl = "https://image.tmdb.org/t/p/w500/" + props.poster_path;

  return (
    <div className="card">
      <img src={imageUrl} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <div className='d-flex justify-content-between'>
          <small>{Moment(props.release_date).format('YYYY-MM-DD')}</small>
          <span className="badge rounded-pill text-bg-warning"><i className="fa-solid fa-star me-1"></i>{Number(props.vote_average).toFixed(1)}</span>
        </div>
        {props.trending && <div className='mt-2 d-flex justify-content-between align-items-center'>
          <button type="button" className="btn btn-light mt-1" onClick={(e) => handleAddToWatchList(e, props)}><i className="fa-regular fa-plus me-1"></i>Watchlist</button>
          <i className="fa-2x fa-solid fa-heart pointer" onClick={(e) => handleAddToFavourite(e, props)}></i>
        </div>}
        {props.watchlist && <div className='mt-2 d-flex justify-content-between align-items-center'>
          <button type="button" className="btn btn-light mt-1 w-100" onClick={(e) => handleRemoveWatchList(props.movie_id)}><i className="fa-regular fa-plus me-1"></i>Remove</button>
        </div>}
        {props.favourite && <div className='mt-2 d-flex justify-content-between align-items-center'>
          <button type="button" className="btn btn-light mt-1 w-100" onClick={(e) => handleRemoveFavourite(props.movie_id)}><i className="fa-regular fa-plus me-1"></i>Remove</button>
        </div>}
      </div>
    </div>
  );
};

export default MovieCard;