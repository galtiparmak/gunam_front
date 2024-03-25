import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Login.css';

const Login = () => {
  return (
    <div className="login-container">
      <h1>Login As</h1>
      <div className="button-container">
        <Link to="/admin">
          <button className="login-button">Admin</button>
        </Link>
        <Link to="/user">
          <button className="login-button">User</button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
