import React, { useState, useEffect } from "react";
import './navbar.scss';
import axios from "axios";
import Results from "../Results";


const Navbar = () => {

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


  const fetchData = async (term) => {
    const testURL = `https://api.themoviedb.org/3/search/movie?api_key=ff8bf22061899c44db0f7ebbc6415994&language=en-US&query=${term}&page=1&include_adult=false`;
    await axios.get(testURL).then(response => {
      setResults([...response.data.results]);
      console.log(response.data.results);
    });
  };

  const clearResults = () => setResults([]);

  return (
    <header>
      <nav className="navbar bg-dark" data-bs-theme="dark">
        <div className="container-fluid">
          <a className="navbar-brand" href='/'>StarStudded</a>
          <form className="d-flex" role="search">
            <input className="searchBar form-control me-2" type="search" placeholder="Search Movie" aria-label="Search"
              onChange={e => setDebouncedTerm(e.target.value)}
              value={debouncedTerm} />
            {/* <button className="btn btn-primary searchBtn" type="submit" onSearch={term => setTerm(term)} >Search</button> */}
          </form>
          <div className="dropdown me-5">
            <a className="btn dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              JACK JOHAN
            </a>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="/logout">SignOut</a></li>
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

export default Navbar;;