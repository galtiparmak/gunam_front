import React, { useState } from 'react';
import axios from 'axios';
import '../CSS/UserLogin.css';
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    axios
      .get('http://localhost:8080/api/user/login', {
        params: {
          email: email,
          password: password,
        },
      })
      .then((response) => {
        console.log('Logged in:', response.data);
        const user = response.data;
        console.log(user);
        if (user !== null) {
          const userData = JSON.stringify(user);
          localStorage.setItem('userdata', userData);
          
        }
        history('/home');
      })
      .catch((error) => {
        console.error('Login failed:', error.message);
      });
  };

  return (
    <div className="login-container">
      <h1>Login As User</h1>
      <div className="form-group">
        <label>Email:</label>
        <input type="email" value={email} onChange={handleEmailChange} />
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input type="password" value={password} onChange={handlePasswordChange} />
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default UserLogin;
