import React from 'react';

const MovieCard = (props) => {

  const imageUrl = "https://image.tmdb.org/t/p/w500/" + props.poster_path;

  return (
    <div className="card">
      <img src={imageUrl} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <div className='d-flex justify-content-between'>
          <small>{props.release_date}</small>
          <span className="badge rounded-pill text-bg-warning"><i class="fa-solid fa-star me-1"></i>{props.vote_average.toFixed(1)}</span>
        </div>
        <div className='mt-2 d-flex justify-content-between align-items-center'>
          <button type="button" className="btn btn-light mt-1"><i className="fa-regular fa-plus me-1"></i>Watchlist</button>
          <i className="fa-regular fa-2x fa-heart"></i>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;