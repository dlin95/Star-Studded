import './App.scss';
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ErrorPage from './error-page';
import Main from '../src/pages/Main';
import Home from './components/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';
import FriendsSuggestions from './pages/FriendsSuggestions';
import MovieDetails from "./components/movieDetails";
import MoviesList from './pages/MoviesList/MoviesList';
import WatchList from './pages/Watchlist/Watchlist';
import Login from './pages/Login/Login';
import Register from './pages/Register';
import Favourites from './pages/Favourites/Favourites';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useCurrentUser from './hooks/useCurrentUser';
import Protected from './Proctected';

export default function App() {
  const { currentUser, setCurrentUser } = useCurrentUser();

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route index element={<Home />} />
        <Route path='/login' element={<Login setCurrentUser={setCurrentUser} />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={
          <Protected currentUser={currentUser} setCurrentUser={setCurrentUser}>
            <Dashboard />
          </Protected>} />
        <Route path="/:movieId" element={<MovieDetails />} exact />
        <Route path='/movies-list' element={<MoviesList />} />
        <Route path='/watch-list' element={<WatchList />} />
        <Route path='/favourites' element={<Favourites />} />
        <Route path='/friend-suggestion' element={<FriendsSuggestions />} />
        <Route path="*" element={< ErrorPage />}>
        </Route>
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="light"
      />
    </div>
  );
}