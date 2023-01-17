import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './navbar.scss';
import axios from "axios";
import Results from "../Results";


const Navbar = () => {
  const navigate = useNavigate();

  const [term, setTerm] = useState("");
  const [username, setUsername] = useState("");
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

  useEffect(() => {
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    if (!currentUser) {
      // signOut();
    } else {
      setUsername(`${currentUser.first_name} ${currentUser.last_name}`);
    }
  }, []);

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

  return (
    <header>
      <nav className="navbar bg-dark" data-bs-theme="dark">
        <div className="container-fluid">
          <div className="d-flex align-items-center gap-3">
            <a className="navbar-brand" href='/dashboard'>StarStudded</a>
            <a className="nav-link" href="/favourites">Favourite</a>
            <a className="nav-link" href="/watch-list">WatchList</a>
          </div>
          <form className="d-flex" role="search">
            <input className="searchBar form-control me-2" type="search" placeholder="Search Movie" aria-label="Search"
              onChange={e => setDebouncedTerm(e.target.value)}
              value={debouncedTerm} />
          </form>
          <div className="dropdown me-5">
            <span className="dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              {username}
            </span>
            <ul className="dropdown-menu">
              <li><span className="dropdown-item" onClick={() => handleSignOut} >SignOut</span></li>
            </ul>
          </div>
        </div>
      </nav>
      {results.length > 0 && <div className="search-result">
        <Results results={results} />
      </div>}
    </header>
  );
};

export default Navbar;