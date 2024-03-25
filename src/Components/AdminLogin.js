import React, { useState } from 'react';
import axios from 'axios';
import '../CSS/AdminLogin.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    axios
      .get('http://localhost:8080/api/admin/login', {
        params: {
          email: email,
          password: password,
        },
      })
      .then((response) => {
        console.log('Logged in:', response.data);
        const admin = response.data;
        if (admin !== null) {
          const adminData = JSON.stringify(admin);
          localStorage.setItem('admindata', adminData);
          
        }
      })
      .catch((error) => {
        console.error('Login failed:', error.message);
      });
  };

  return (
    <div className="login-container">
      <h1>Login As Admin</h1>
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

export default AdminLogin;