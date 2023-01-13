import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/Login.scss";


const Login = () => {
  return (
    <main className='main'>
      <Link to="/" className='btn btn-primary btn-float'>Home</Link>
      <div className="card card-container">
        <h3 id="profile-name" className="profile-name-card py-4">Welcome Back to StarStudded</h3>
        <form className="d-flex justify-content-center align-items-center flex-column" >
          <span id="reauth-email" className="reauth-email"></span>
          <input type="email" id="inputEmail" className="form-control mb-3" placeholder="Email address" required autofocus />
          <input type="password" id="inputPassword" className="form-control mb-3" placeholder="Password" required />
          <button className="btn btn-lg btn-primary btn-signin mt-3" type="submit">Sign in</button>
        </form>
        <div className='d-flex justify-content-center mt-3'>
          <p>Not a member? <Link className='signup-link' to="/register">Sign Up</Link></p>
        </div>
      </div>
    </main>
  );
};

export default Login;