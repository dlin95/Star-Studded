import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import './navbar.scss';
import axios from "axios";
import Results from "../Results";
import useCurrentUser from "../../../hooks/useCurrentUser";


const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser } = useCurrentUser();

  const [term, setTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState(term);
  const [results, setResults] = useState([]);

  // update 'term' value after 1 second from the last update of 'debouncedTerm'
  useEffect(() => {
    const timer = setTimeout(() => setTerm(debouncedTerm), 500);
    return () => clearTimeout(timer);
  }, [debouncedTerm]);

  // submit a new search
  useEffect(() => {
    if (term !== '') {
      fetchData(term);
    }
    else {
      clearResults();
    }
  }, [term]);


  const handleSignOut = () => {
    sessionStorage.clear();
    navigate("/");
    return;
  };

  const fetchData = async (term) => {
    const testURL = `https://api.themoviedb.org/3/search/movie?api_key=ff8bf22061899c44db0f7ebbc6415994&language=en-US&query=${term}&page=1&include_adult=false`;
    await axios.get(testURL).then(response => {
      setResults([...response.data.results]);
    });
  };

  const clearResults = () => setResults([]);

  const getUserInitial = () => {
    return <span className="profile-icon rounded-circle me-2">{currentUser.first_name[0] + currentUser.last_name[0]}</span>;
  };

  return (
    <header>
      <nav className="navbar bg-dark" data-bs-theme="dark">
        <div className="container-fluid navbarContent">
          <div className="d-flex align-items-center">
            <a className="navbar-brand" href='/dashboard'>StarStudded</a>
          </div>
          <form className="d-flex" role="search">
            <input className="searchBar form-control me-2" type="search" placeholder="Search Movie" aria-label="Search"
              onChange={e => setDebouncedTerm(e.target.value)}
              value={debouncedTerm} />
          </form>
          <div className="dropdown-center">
            <span className="dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              {getUserInitial()}{currentUser.first_name} {currentUser.last_name}
            </span>
            <ul className="dropdown-menu">
              <li><span className="dropdown-item" onClick={handleSignOut} >SignOut</span></li>
            </ul>
          </div>
        </div>
      </nav>
      {results.length > 0 && <div className="search-result">
        <Results results={results} />
      </div>}
      <div className="d-flex mt-3 sub-nav">
        <Link to="/movies-list" className='btn btn-primary btn-nav me-3'>All Movies</Link>
        <Link to="/watch-list" className='btn btn-primary btn-nav me-3'>Watchlist</Link>
        <Link to="/favourites" className='btn btn-primary btn-nav me-3'>Favourites</Link>
      </div>
    </header>
  );
};

export default Navbar;