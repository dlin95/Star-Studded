import './App.css';
import { Routes, Route } from "react-router-dom";

import ErrorPage from './error-page';
import Main from './pages/Main';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import FriendsSuggestions from './pages/FriendsSuggestions';
import MovieDetail from './pages/MovieDetail';
import MoviesList from './pages/MoviesList';
import WatchList from './pages/WatchList';
import Login from './pages/Login';
import Register from './pages/Register';

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
        <Route path='/movie-list' element={<MoviesList />} />
        <Route path='/watch-list' element={<WatchList />} />
        <Route path="*" element={< ErrorPage />}>
        </Route>
      </Routes>
    </div >
  );
}

export default App;
