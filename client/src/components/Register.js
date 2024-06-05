import React, { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: ""
  });

  const { email, password, name } = inputs;
  const navigate = useNavigate();

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = { email, password, name };

      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      const parseRes = await response.json();

      if (response.ok) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        toast.success("Registration successful! Welcome.");
        navigate("/Dashboard");
      } else if (response.status === 409) {
        toast.error("User already exists.");
      } else {
        toast.error(parseRes.message || "Registration failed. Please try again."); // Handle other server messages
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <Fragment>
      <div className="main-container">
        <div className="register-container">
          <h1>Register</h1>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              value={name}
              onChange={onChange}
            />
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
            <button type="submit">Register</button>
          </form>
          <Link to="/Login">Login</Link>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
