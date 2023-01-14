import React from "react";
import classnames from "classnames";
import './movie.scss';


export default function Movie(props) {
  const albumInfoClass = classnames("album__info", {
    "album__info--explicit": props.collectionExplicitness === "explicit"
  });

  const imageUrl = "https://image.tmdb.org/t/p/w500/" + props.poster_path;

  return (
    <article className="album">
      <img className="album__thumbnail" src={imageUrl} alt="Album" />
      <div className={albumInfoClass}>
        <div className="album__name">{props.title}</div>
        <div className="album__artist">{new Date(props.release_date).getFullYear()}</div>
        <div className="album__artist badge rounded-pill text-bg-warning">{props.vote_average}</div>
      </div>
    </article >
  );
}
