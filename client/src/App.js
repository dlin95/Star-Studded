import './App.scss';
import { Routes, Route } from "react-router-dom";

import ErrorPage from './error-page';
import Main from '../src/pages/Main'
import Home from './components/Home/Home';
import Dashboard from './components/Dashboard/Dashboard';
import FriendsSuggestions from './pages/FriendsSuggestions';
import MovieDetail from './pages/MovieDetail';
import MoviesList from './components/MoviesList/MoviesList';
import WatchList from './components/Watchlist/Watchlist';
import Login from './components/Login/Login';
import Register from './components/Register';
import Favourites from './components/Favourites/Favourites'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Main />} />
        <Route index element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/friend-suggestion' element={<FriendsSuggestions />} />
        <Route path='/movie-detail' element={<MovieDetail />} />
        <Route path='/movies-list' element={<MoviesList />} />
        <Route path='/watch-list' element={<WatchList />} />
        <Route path='/favourites' element={<Favourites />} />
        <Route path="*" element={< ErrorPage />}>
        </Route>
      </Routes>
    </div >
  );
}

export default App;
