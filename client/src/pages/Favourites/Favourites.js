import React, { Component } from "react";
import { IMAGE_BASE_URL, POSTER_SIZE } from "../../config";
import FourColumnGrid from "../../components/elements/FourColumnGrid/FourColumnGrid";
import MovieThumbnail from "../../components/elements/MovieThumbnail/MovieThumbnail";
import ShowMoreBtn from "../../components/elements/ShowMoreBtn/ShowMoreBtn";
import Navbar from "../../components/elements/Navbar/Navbar";
// import { Link } from 'react-router-dom';
import "./Favourites.scss";

class Favourites extends Component {
  state = {
    movies: [],
    loading: false,
    currentPage: 0,
    totalPages: 0,
    searchTerm: "",
  };

  componentDidMount() {
    if (localStorage.getItem("Favourites")) {
      const state = JSON.parse(localStorage.getItem("Favourites"));
      this.setState({ ...state });
    } else {
      this.setState({ loading: true });
      const user = JSON.parse(sessionStorage.getItem("currentUser"));
      const endPoint = `/api/favourites/${user.id}`;
      this.fetchItems(endPoint);
    }
  }

  fetchItems = (endpoint) => {
    fetch(endpoint)
      .then((result) => result.json())
      .then((result) => {
        this.setState(
          {
            movies: [...this.state.movies, ...result],
            loading: false,
            currentPage: result.page,
            totalPages: result.total_pages,
          },
          () => {
            if (this.state.searchTerm === "") {
              localStorage.setItem("Favourites", JSON.stringify(this.state));
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
            header={"Favourites"}
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

export default Favourites;
