import React, { useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import axios from 'axios';

const LoginPopup = ({ setShowLogin, onLoginSuccess }) => {
  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    location: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (currState === "Login") {
      if (!data.email || !data.password) {
        console.error("Email and password are required");
        return;
      }

      try {
        const response = await axios.post('http://localhost:4000/api/user/login', {
          email: data.email,
          password: data.password,
        });

        if (response.data.success) {
          console.log("Login successful", response.data.token);
          onLoginSuccess();  // Notify parent component about successful login
        }
      } catch (error) {
        console.error("Login failed:", error);
      }
    } else {
      if (
        !data.username ||
        !data.email ||
        !data.password ||
        !data.phoneNumber ||
        !data.location
      ) {
        console.error("All fields are required for registration");
        return;
      }

      try {
        const response = await axios.post('http://localhost:4000/api/user/register', {
          username: data.username,
          email: data.email,
          password: data.password,
          phoneNumber: data.phoneNumber,
          location: data.location,
        });

        if (response.data.success) {
          console.log("Registration successful", response.data.token);
          onLoginSuccess();  // Notify parent component about successful login
        }
      } catch (error) {
        console.error("Registration failed:", error);
      }
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onSubmit} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
        </div>

        <div className="login-popup-inputs">
          {currState === "Login" ? (
            <>
              <input
                name="email"
                onChange={onChangeHandler}
                value={data.email}
                type="email"
                placeholder="Your email"
                required
              />
              <input
                name="password"
                onChange={onChangeHandler}
                value={data.password}
                type="password"
                placeholder="Password"
                required
              />
            </>
          ) : (
            <>
              <input
                name="username"
                onChange={onChangeHandler}
                value={data.username}
                type="text"
                placeholder="Your username"
                required
              />
              <input
                name="email"
                onChange={onChangeHandler}
                value={data.email}
                type="email"
                placeholder="Your email"
                required
              />
              <input
                name="password"
                onChange={onChangeHandler}
                value={data.password}
                type="password"
                placeholder="Password"
                required
              />
              <input
                name="phoneNumber"
                onChange={onChangeHandler}
                value={data.phoneNumber}
                type="text"
                placeholder="Your phone number"
                required
              />
              <input
                name="location"
                onChange={onChangeHandler}
                value={data.location}
                type="text"
                placeholder="Your location"
                required
              />
            </>
          )}
        </div>

        <button type="submit">
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy</p>
        </div>

        {currState === "Login" ? (
          <p>
            Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
