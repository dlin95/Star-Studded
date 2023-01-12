import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/Home.scss";

const Home = () => {
  return (
    <>
      <main className="main-container">
        <img
          src="/background.jpeg"
          alt="StarStudded Movies Backgound"
          className="mainBackground" />
        <section className='layout'>
          <h1>Welcome to StarStudded</h1>
          <h3>Make sharing movies with your friends fun.</h3>
          <div className='mt-4'>
            <Link to="/login" className="btn btn-primary me-4" type="button">Sign in</Link>
            <Link to="/register" className="btn btn-primary" type="button">Sign Up</Link>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;