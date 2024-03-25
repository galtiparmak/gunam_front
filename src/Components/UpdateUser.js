import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UpperBar from './UpperBar';

const UpdateUser = () => {
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/users');
      setUsers(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteUser = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/user/remove/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <div><UpperBar />
      <h2>All Users</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Email</th>
            <th>Company</th>
            <th>Position</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.user_id}>
              <td>{user.name}</td>
              <td>{user.surname}</td>
              <td>{user.email}</td>
              <td>{user.company}</td>
              <td>{user.position}</td>
              <td>{user.phone}</td>
              <td>
                <Link to={`/updateselecteduser/${user.user_id}`}>Update</Link> |{' '}
                <button onClick={() => handleDeleteUser(user.user_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default UpdateUser;
