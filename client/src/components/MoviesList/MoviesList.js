import React, { Component } from 'react';
import { API_KEY, API_URL, IMAGE_BASE_URL, BACKDROP_SIZE, POSTER_SIZE } from '../../config';
import FourColumnGrid from '../elements/FourColumnGrid/FourColumnGrid';
import MovieThumbnail from '../elements/MovieThumbnail/MovieThumbnail';
// import { Link } from 'react-router-dom';
import './MoviesList.scss';


class moviesList extends Component {

  state = {
    movies: [],
    loading: false,
    searchTerm: ''
  }

  componentDidMount() {
    if (localStorage.getItem('homeState')) {
      const state = JSON.parse(localStorage.getItem('homeState'));
      this.setState({...state});
    } else {
      this.setState({loading: true});
      const endPoint = `${API_URL}trending/movie/week?api_key=${API_KEY}`;
      this.fetchItems(endPoint);
    }
  }

  fetchItems = (endpoint) => {
    fetch(endpoint)
      .then(result => result.json())
      .then(result => {
        this.setState({
          movies: [...this.state.movies, ...result.results],
          loading: false
        }, () => {
          if(this.state.searchTerm === ''){
            localStorage.setItem('homeState', JSON.stringify(this.state))
          }
        })
      })
  }

    render() {
      return (
        <main className='main-container'>
          <img
            src='/background.jpeg'
            alt='StarStudded Movies Background'
            className='mainBackground'
          />
          <div className='movie-grid'>
            <FourColumnGrid 
              header={this.state.searchTerm ? 'Search Result' : 'All Movies'}
              loading={this.state.loading}
              >
                {this.state.movies.map((element, i) => {
                  return <MovieThumbnail
                  key={i}
                  clickable={true}
                  image={`${IMAGE_BASE_URL}${POSTER_SIZE}${element.poster_path}`}
                  movieId={element.id}
                  movieName={element.original_title}
                  />
                })}
            </FourColumnGrid>
          </div>
        </main>
      )
    }
}

export default moviesList;