import React, { Component } from "react";
import { API_KEY, API_URL, IMAGE_BASE_URL, POSTER_SIZE } from "../../config";
import FourColumnGrid from "../../components/elements/FourColumnGrid/FourColumnGrid";
import MovieThumbnail from "../../components/elements/MovieThumbnail/MovieThumbnail";
import ShowMoreBtn from "../../components/elements/ShowMoreBtn/ShowMoreBtn";
import Navbar from "../../components/elements/Navbar/Navbar";
// import { Link } from 'react-router-dom';
import "./MoviesList.scss";

class moviesList extends Component {
  state = {
    movies: [],
    loading: false,
    currentPage: 1,
    totalPages: 0,
  };

  componentDidMount() {
    this.setState({ loading: true });
    const endpoint = `${API_URL}trending/movie/week?api_key=${API_KEY}&page=1`;
    this.fetchItems(endpoint);
  }

  loadMoreMovies = () => {
    this.setState({ loading: true });
    let endpoint = `${API_URL}trending/movie/week?api_key=${API_KEY}&page=${
      this.state.currentPage + 1
    }`;
    this.fetchItems(endpoint);
  };

  fetchItems = (endpoint) => {
    fetch(endpoint)
      .then((result) => result.json())
      .then((result) => {
        this.setState({
          movies: [...this.state.movies, ...result.results],
          loading: false,
          currentPage: result.page,
          totalPages: result.total_pages,
        });
      });
  };

  render() {
    return (
      <div className="home">
        <Navbar />
        <div className="movie-grid">
          <FourColumnGrid header={"All Movies"} loading={this.state.loading}>
            {this.state.movies.map((element, i) => {
              return (
                <MovieThumbnail
                  key={i}
                  clickable={true}
                  image={`${IMAGE_BASE_URL}${POSTER_SIZE}${element.poster_path}`}
                  movieId={element.id}
                  movieName={element.original_title}
                />
              );
            })}
          </FourColumnGrid>
          {this.state.currentPage <= this.state.totalPages &&
          !this.state.loading ? (
            <ShowMoreBtn text={"View More"} Click={this.loadMoreMovies} />
          ) : null}
        </div>
      </div>
    );
  }
}

export default moviesList;
