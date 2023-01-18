import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Login.scss";
import PropTypes from 'prop-types';


const Login = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginUser = async (credentials) => {
    return await axios.post('/api/login', credentials).then((result) => {
      console.log("login success", result);
      return result.data;
    }).catch((error) => {
      console.log(error);
      setError(error.response.data);
    });
  };

  const handleSignIn = async function(e) {
    e.preventDefault();
    const user = {
      email,
      password
    };
    const currentUser = await loginUser(user);
    if (currentUser) {
      props.setCurrentUser(currentUser);
      navigate("/dashboard");
    }
  };


  return (
    <main className='main'>
      <Link to="/" className='btn btn-primary btn-float'>Home</Link>
      <div className="card card-container">
        <h3 id="profile-name" className="profile-name-card py-4">Welcome Back to StarStudded</h3>
        {error && <div className="alert alert-danger mb-5" role="alert">
          <i className="fa-solid fa-circle-exclamation me-2"></i> {error}
        </div>}
        <form className="d-flex justify-content-center align-items-center flex-column" onSubmit={handleSignIn} >
          <span id="reauth-email" className="reauth-email"></span>
          <input type="email" id="inputEmail" className="form-control mb-3" placeholder="Email address" onChange={e => setEmail(e.target.value)} required />
          <input type="password" id="inputPassword" className="form-control mb-3" placeholder="Password" onChange={e => setPassword(e.target.value)} required />
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
Login.propTypes = {
  setCurrentUser: PropTypes.func.isRequired
};