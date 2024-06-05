import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
    if (boolean) {
      toast.success("Login successful!");
    } else {
      toast.info("Logged out successfully.");
    }
  };

  async function isAuth() {
    try {
      const response = await fetch("http://localhost:5000/auth/is-verify", {
        method: "GET",
        headers: { token: localStorage.token }
      });

      const parseRes = await response.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    isAuth();
  }, []);

  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route
          path='/Login'
          element={!isAuthenticated ? <Login setAuth={setAuth} /> : <Navigate to="/Dashboard" />}
        />
        <Route
          path='/Dashboard'
          element={isAuthenticated ? <Dashboard setAuth={setAuth} /> : <Navigate to="/Login" />}
        />
        <Route
          path='/Register'
          element={!isAuthenticated ? <Register setAuth={setAuth} /> : <Navigate to="/Dashboard" />}
        />
        <Route path='/' element={<Navigate to='/Login' />} />
      </Routes>
    </Router>
  );
}

export default App;
