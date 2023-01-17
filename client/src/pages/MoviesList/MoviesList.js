import React, { Component } from "react";
import {
  API_KEY,
  API_URL,
  IMAGE_BASE_URL,
  BACKDROP_SIZE,
  POSTER_SIZE,
} from "../../config";
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
    currentPage: 0,
    totalPages: 0,
    searchTerm: "",
  };

  componentDidMount() {
    if (localStorage.getItem("movieListState")) {
      const state = JSON.parse(localStorage.getItem("movieListState"));
      this.setState({ ...state });
    } else {
      this.setState({ loading: true });
      const endPoint = `${API_URL}trending/movie/week?api_key=${API_KEY}&language-en-US&page=1`;
      this.fetchItems(endPoint);
    }
  }

  searchItems = (searchTerm) => {
    let endpoint = "";
    this.setState({
      movies: [],
      loading: true,
      searchTerm,
    });

    if (searchTerm === "") {
      endpoint = `${API_URL}trending/movie/week?api_key=${API_KEY}&language-en-US&page=1`;
    } else {
      endpoint = `${API_URL}search/movie?api_key=${API_KEY}&query=${searchTerm}`;
    }
    this.fetchItems(endpoint);
  };

  loadMoreMovies = () => {
    let endpoint = "";
    this.setState({ loading: true });

    if ((this.state.searchTerm = "")) {
      endpoint = `${API_URL}trending/movie/week?api_key=${API_KEY}&language-en-US&page=${
        this.state.currentPage + 1
      }`;
    } else {
      endpoint = `${API_URL}trending/movie/week?api_key=${API_KEY}&language=en-US&query=${
        this.state.searchTerm
      }&page=${this.state.currentPage + 1}`;
    }
    this.fetchItems(endpoint);
  };

  fetchItems = (endpoint) => {
    fetch(endpoint)
      .then((result) => result.json())
      .then((result) => {
        this.setState(
          {
            movies: [...this.state.movies, ...result.results],
            loading: false,
            currentPage: result.page,
            totalPages: result.total_pages,
          },
          () => {
            if (this.state.searchTerm === "") {
              localStorage.setItem(
                "movieListState",
                JSON.stringify(this.state)
              );
            }
          }
        );
      });
  };

  render() {
    return (
      <div className="home">
        <Navbar />
        <div className="movie-grid">
          <FourColumnGrid
            header={this.state.searchTerm ? "Search Result" : "All Movies"}
            loading={this.state.loading}
          >
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
            <ShowMoreBtn text={"View More"} onClick={this.loadMoreMovies} />
          ) : null}
        </div>
      </div>
    );
  }
}

export default moviesList;
