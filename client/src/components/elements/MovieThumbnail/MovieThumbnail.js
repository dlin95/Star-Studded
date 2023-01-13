import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './MovieThumbnail.css';

const movieThumbnail = (props) => {
  return (
    <div className='movieThumbnail'>
      {props.clickable ?
      <Link to={{ pathname: `/${props.movieId}`, movieName: `${props.movieName}`}}>
        <img src={props.image} alt='movieThumbnail' />
      </Link>
      :
      <img src={props.image} alt='movieThumbnail' />
      }
    </div>
  )
};

movieThumbnail.propTypes = {
  image: PropTypes.string,
  movieId: PropTypes.number,
  movieName: PropTypes.string,
};

export default movieThumbnail;