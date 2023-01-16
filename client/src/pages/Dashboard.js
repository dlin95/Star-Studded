import React, { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import Navbar from '../components/Navbar';
import axios from 'axios';


import "../styles/Dashboard.scss";
import { fetchData } from '../utils/fetchData';

const Dashboard = () => {
  const [state, setState] = useState({
    movies: [],
    watchList: [],
    favouriteMovie: [],
    loading: false,
    value: ''
  });

  useEffect(() => {
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    const getMovieData = async () => {
      setState({ loading: true });
      const query = `https://api.themoviedb.org/3/trending/movie/week?api_key=ff8bf22061899c44db0f7ebbc6415994`;
      const res = await fetchData(query);
      const movies = res;
      setState({ movies, loading: false });
    };

    const getData = async () => {
      setState({ loading: true });
      Promise.all([
        axios.get(`/api/watchlist/${currentUser.id}`),
        axios.get(`/api/favourite_movies/${currentUser.id}`),
      ]).then((all) => {
        setState(prev => ({ ...prev, watchList: all[0].data, favouriteMovie: all[1].data, loading: false }));
      }).catch((error) => {
        console.log(error);
      });
    };

    getMovieData();
    getData();
  }, []);

  const renderMovies = () => {
    let movies = <div className="spinner-border text-danger" role="status" >
      <span className="visually-hidden" > Loading...</span >
    </div >;
    if (state.movies) {
      movies = state.movies.map(movie => {
        return <MovieCard key={movie.id} {...movie} />;
      });
    }
    return movies;
  };

  // const getMovieDetailbyId = async (movie_id) => {
  //   const query = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=ff8bf22061899c44db0f7ebbc6415994&language=en-US`;
  //   const res = await axios.get(query);
  //   return res.data;
  // };

  // const renderWatchList = () => {
  //   if (state.watchList) {
  //     let watchlistPromises = state.watchList.map((record) => {
  //       return getMovieDetailbyId(record.movie_id).then((res) => { return res; });
  //     });
  //     Promise.all(watchlistPromises).then(function(results) {
  //       let result = results.map(movie => {
  //         return <MovieCard key={movie.id} {...movie} />;
  //       });
  //       return result;
  //     });
  //   };
  // };

  // const renderFavouriteMovies = () => {
  //   let movies = <div className="spinner-border text-danger" role="status" >
  //     <span className="visually-hidden" > Loading...</span >
  //   </div >;
  //   if (state.movies) {
  //     movies = state.favouriteMovie.map(movie => {
  //       // return <MovieCard key={movie.id} {...movie} />;
  //     });
  //   }
  //   return movies;
  // };

  return (
    <div>
      <Navbar />
      <main className='container text-start mt-5 '>
        <div className='heading d-flex justify-content-between align-item-center mt-4 mb-2'>
          <h3>Trending</h3>
          <a href='/'>View All <i className="fa-solid fa-angles-right ms-1"></i> </a>
        </div>
        <div className='movielistContainer'>
          {renderMovies()}
        </div>
        {/* <div className='heading d-flex justify-content-between align-item-center mt-4 mb-2'>
          <h3>Watchlist</h3>
          <a href='/'>View All <i className="fa-solid fa-angles-right ms-1"></i> </a>
        </div>
        <div className='movielistContainer'>
          {renderWatchList()}
        </div> */}
        {/* <div className='heading d-flex justify-content-between align-item-center mt-4 mb-2'>
          <h3>Favourite</h3>
          <a href='/'>View All <i className="fa-solid fa-angles-right ms-1"></i> </a>
        </div>
        <div className='movielistContainer'>
          {renderMovies()}
        </div> */}

      </main>
    </div>
  );
};

export default Dashboard;
