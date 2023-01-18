import React from "react";
import classnames from "classnames";
import './Movie.scss';
import { Link, useNavigate } from 'react-router-dom';


export default function Movie(props) {
  const albumInfoClass = classnames("album__info", {
    "album__info--explicit": props.collectionExplicitness === "explicit"
  });

  const imageUrl = "https://image.tmdb.org/t/p/w500/" + props.poster_path;
  const movieUrl = `/${props.id}`;


  return (
    <article className="album"> 
    <Link to={movieUrl} >
      <img className="album__thumbnail" src={imageUrl} alt="Album" />
    </Link>
      <div className={albumInfoClass}>
        <div className="album__name">{props.title}</div>
        <div className="album__artist">{new Date(props.release_date).getFullYear()}</div>
        <div className="album__artist badge rounded-pill text-bg-warning">{props.vote_average}</div>
      </div>
    </article >
  );
}
