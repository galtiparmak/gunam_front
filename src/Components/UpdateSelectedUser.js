import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import UpperBar from './UpperBar';

const UpdateSelectedUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/user/${id}`);
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/user/${id}`, user);
      console.log('User updated successfully!');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div>
      <div><UpperBar />
      <h2>Update User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={user.name || ''} onChange={handleInputChange} />
        </div>
        <div>
          <label>Surname:</label>
          <input type="text" name="surname" value={user.surname || ''} onChange={handleInputChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={user.email || ''} onChange={handleInputChange} />
        </div>
        <div>
          <label>Company:</label>
          <input type="text" name="company" value={user.company || ''} onChange={handleInputChange} />
        </div>
        <div>
          <label>Position:</label>
          <input type="text" name="position" value={user.position || ''} onChange={handleInputChange} />
        </div>
        <div>
          <label>Phone:</label>
          <input type="text" name="phone" value={user.phone || ''} onChange={handleInputChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
      </div>
    </div>
  );
};

export default UpdateSelectedUser;
