import React from "react";

import Movie from "./Movie/Movie";

export default function Results(props) {
  const { results } = props;

  return results.map(movie => {
    return <Movie key={movie.id} {...movie} />;
  });
}