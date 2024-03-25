import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UpperBar from './UpperBar';

const CreateAdmin = () => {
  const [adminData, setAdminData] = useState({
    name: '',
    surname: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminData({
      ...adminData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!adminData.name || !adminData.surname || !adminData.email || !adminData.password) {
      alert('Please fill in all the required fields.');
      return;
    }

    try {
      await axios.post('http://localhost:8080/api/admin', JSON.stringify(adminData), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Admin created successfully!');
      setAdminData({
        name: '',
        surname: '',
        email: '',
        password: ''
      });
    } catch (error) {
      console.error('Error creating admin:', error);
    }
  };

  return (
    <div>
        <div><UpperBar />
      <h2>Create Admin</h2>
      <form onSubmit={handleSubmit} style={{ width: '50%', marginLeft: 'auto', marginRight: 'auto' }}>
        <div style={{ marginBottom: '10px' }}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={adminData.name}
            onChange={handleChange}
            style={{ width: '100%', textAlign: 'left' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Surname:</label>
          <input
            type="text"
            name="surname"
            value={adminData.surname}
            onChange={handleChange}
            style={{ width: '100%', textAlign: 'left' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={adminData.email}
            onChange={handleChange}
            style={{ width: '100%', textAlign: 'left' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={adminData.password}
            onChange={handleChange}
            style={{ width: '100%', textAlign: 'left' }}
          />
        </div>
        <Link to="/home">
          <button type="submit">Create Admin</button>
        </Link>
      </form>
      </div>
    </div>
  );
};

export default CreateAdmin;
