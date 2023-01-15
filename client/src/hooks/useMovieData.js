import { useState, useEffect } from "react";
import { fetchData } from "../utils/fetchData";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    movies: [],
    watchList: [],
    favouriteMovie: [],
    loading: false,
    value: "",
  });

  const setWatchList = (watchList) => {
    const newWatchList = [...state.watchList];
    newWatchList.push(watchList);
    setState({ ...state, watchList: newWatchList });
  };

  const setFavouriteMovie = (movie) => {
    const newFavouriteList = [...state.favouriteMovie];
    newFavouriteList.push(movie);
    setState({ ...state, favouriteMovie: newFavouriteList });
  };

  const removeWatchList = (id) => {
    const newWatchList = [...state.watchList];
    newWatchList.splice(
      newWatchList.findIndex((m) => m.movie_id === id),
      1
    );
    setState({ ...state, watchList: newWatchList });
  };

  const removeFavouriteMovie = (id) => {
    const newFavouriteList = [...state.favouriteMovie];
    newFavouriteList.splice(
      newFavouriteList.findIndex((m) => m.movie_id === id),
      1
    );
    setState({ ...state, favouriteMovie: newFavouriteList });
  };

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
        axios.get(`/api/favourites/${currentUser.id}`),
      ])
        .then((all) => {
          setState((prev) => ({
            ...prev,
            watchList: all[0].data,
            favouriteMovie: all[1].data,
            loading: false,
          }));
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getMovieData();
    getData();
  }, []);

  return {
    state,
    setWatchList,
    setFavouriteMovie,
    removeWatchList,
    removeFavouriteMovie,
  };
}
