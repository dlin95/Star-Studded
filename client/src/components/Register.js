import React from 'react';
import { Link } from 'react-router-dom';
import ".././components/Login/Login.scss";

const Register = () => {
  return (
    <main className='main'>
      <Link to="/" className='btn btn-primary btn-float'>Home</Link>
      <div className="card card-container">
        <h3 id="profile-name" className="profile-name-card py-4">
          Create an Account
        </h3>
        <form className="d-flex justify-content-center align-items-center flex-column">
          <input
            type="text"
            id="FirstName"
            className="form-control mb-3"
            placeholder="First Name"
            required
            autofocus
          />
          <input
            type="text"
            id="LastName"
            className="form-control mb-3"
            placeholder="Last Name"
            required
          />
          <input
            type="email"
            id="Email"
            className="form-control mb-3"
            placeholder="Email address"
            required
          />
          <input
            type="password"
            id="Password"
            className="form-control mb-3"
            placeholder="Password"
            required
          />
          <input
            type="password"
            id="ConfirmPassword"
            className="form-control mb-3"
            placeholder="Confirm Password"
            required
          />
          <button
            className="btn btn-lg btn-primary btn-signup mt-3"
            type="submit"
          >
            Sign up
          </button>
        </form>
        <div className="d-flex justify-content-center mt-3">
          <p>
            Already have an account? {" "}
            <Link className="signup-link" to="/login">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Register;