import React, { useState } from 'react';
import axios from 'axios';
import UpperBar from './UpperBar';

const CreateUser = () => {
  const [userData, setUserData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    company: '',
    position: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userData.name || !userData.surname || !userData.email || !userData.password) {
      alert('Please fill in all the required fields.');
      return;
    }

    try {
      await axios.post('http://localhost:8080/api/user', JSON.stringify(userData), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('User created successfully!');
      setUserData({
        name: '',
        surname: '',
        email: '',
        password: '',
        company: '',
        position: '',
        phone: ''
      });
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div>
        <div><UpperBar />
      <h2>Create User</h2>
      <form onSubmit={handleSubmit} style={{ width: '50%', marginLeft: 'auto', marginRight: 'auto' }}>
        <div style={{ marginBottom: '10px' }}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            style={{ width: '100%', textAlign: 'left' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Surname:</label>
          <input
            type="text"
            name="surname"
            value={userData.surname}
            onChange={handleChange}
            style={{ width: '100%', textAlign: 'left' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            style={{ width: '100%', textAlign: 'left' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            style={{ width: '100%', textAlign: 'left' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Company:</label>
          <input
            type="text"
            name="company"
            value={userData.company}
            onChange={handleChange}
            style={{ width: '100%', textAlign: 'left' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Position:</label>
          <input
            type="text"
            name="position"
            value={userData.position}
            onChange={handleChange}
            style={{ width: '100%', textAlign: 'left' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={userData.phone}
            onChange={handleChange}
            style={{ width: '100%', textAlign: 'left' }}
          />
        </div>
          <button type="submit">Create User</button>
      </form>
      </div>
    </div>
  );
};

export default CreateUser;
