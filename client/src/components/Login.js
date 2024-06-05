import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });

  const { email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = { email, password };

      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      const parseRes = await response.json();

      if (response.ok) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        toast.success("Login successful!");
      } else {
        toast.error(parseRes); // Display error message from server
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <Fragment>
      <div className="main-container">
        <div className="register-container">
          <h1>Login</h1>
          <form onSubmit={onSubmit}>
            <input
              type="email"
              name="email"
              placeholder="email@gmail.com"
              required
              value={email}
              onChange={onChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={password}
              onChange={onChange}
            />
            <button type="submit">Login</button>
          </form>
          <Link to="/Register">Register</Link>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
