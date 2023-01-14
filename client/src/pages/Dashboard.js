import React, { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import Navbar from '../components/Navbar';
import "../styles/Dashboard.scss";
import { fetchData } from '../utils/fetchData';

const Dashboard = () => {
  const [state, setState] = useState({
    movies: [],
    loading: false,
    value: ''
  });

  useEffect(() => {
    const getData = async () => {
      setState({ loading: true });
      const query = `https://api.themoviedb.org/3/trending/movie/week?api_key=ff8bf22061899c44db0f7ebbc6415994`;
      const res = await fetchData(query);
      const movies = res;
      setState({ movies, loading: false });
    };
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
          {renderMovies()}
        </div>
        <div className='heading d-flex justify-content-between align-item-center mt-4 mb-2'>
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
