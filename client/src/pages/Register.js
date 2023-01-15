import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../pages/Login/Login.scss";

const Register = () => {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async function(e) {
    e.preventDefault();
    if (confirmPassword !== password) {
      setError("Confirm password does not match");
      return;
    }
    setError("");

    const user = {
      "first_name": firstName,
      "last_name": lastName,
      "email": email,
      "password": password
    };
    return await axios.post('/api/register', user).then((result) => {
      sessionStorage.setItem("currentUser", JSON.stringify(result.data));
      navigate("/dashboard");
    }).catch((error) => {
      setError(error.response.data);
    });

  };

  return (
    <main className='main'>
      <Link to="/" className='btn btn-primary btn-float'>Home</Link>
      <div className="card card-container">
        <h3 id="profile-name" className="profile-name-card py-4">
          Create an Account
        </h3>
        {error && <div className="alert alert-danger mb-5" role="alert">
          <i className="fa-solid fa-circle-exclamation me-2"></i> {error}
        </div>}
        <form className="d-flex justify-content-center align-items-center flex-column" onSubmit={handleRegister}>
          <input
            type="text"
            id="FirstName"
            className="form-control mb-3"
            placeholder="First Name"
            onChange={e => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            id="LastName"
            className="form-control mb-3"
            placeholder="Last Name"
            onChange={e => setLastName(e.target.value)}
            required
          />
          <input
            type="email"
            id="Email"
            className="form-control mb-3"
            placeholder="Email address"
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            id="Password"
            className="form-control mb-3"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            id="ConfirmPassword"
            className="form-control mb-3"
            placeholder="Confirm Password"
            onChange={e => setConfirmPassword(e.target.value)}

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