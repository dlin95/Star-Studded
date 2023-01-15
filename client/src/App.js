import './App.scss';
import { Routes, Route } from "react-router-dom";

import ErrorPage from './error-page';
import Main from '../src/pages/Main'
import Home from './components/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';
import FriendsSuggestions from './pages/FriendsSuggestions';
import MovieDetail from './pages/MovieDetail';
import MoviesList from './pages/MoviesList/MoviesList';
import WatchList from './pages/Watchlist/Watchlist';
import Login from './pages/Login/Login';
import Register from './pages/Register';
import Favourites from './pages/Favourites/Favourites'
// import Register from './pages/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div >
  );
}

export default App;
