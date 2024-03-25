import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UpperBar from './UpperBar';

const ChangePassword = () => {
  const history = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('userdata'));
    const updatedUser = { ...user, password: newPassword };

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    axios.put(
      `http://localhost:8080/api/user/update/${user.user_id}`,
      {
        name: user.name,
        surname: user.surname,
        email: user.email,
        password: newPassword,
        company: user.company,
        position: user.position,
        phone: user.phone
      }
    )
    .then((response) => {
      console.log('Password updated successfully:', response.data);
      localStorage.setItem('userdata', JSON.stringify(updatedUser));
      history('/userprofile');
    })
    .catch((error) => {
      console.error('Password update failed:', error.message);
      setError('Failed to update password. Please try again later.');
    });
  };

  return (
    <div> <UpperBar />
    <Box
      sx={{
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        minHeight: '100vh',
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Change Password
      </Typography>

      {error && (
        <Box sx={{ marginBottom: 2, color: 'red' }}>
          {error}
        </Box>
      )}

      <Box sx={{ marginBottom: 3 , mb: 3}}>
        <TextField
          label="New Password"
          variant="outlined"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </Box>

      <Box sx={{ marginBottom: 3 , mb: 3}}>
        <TextField
          label="Confirm New Password"
          variant="outlined"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </Box>

      <Button variant='contained' size="small" onClick={handleChangePassword}>
        Update Password
      </Button>
    </Box>
    </div>
  );
};

export default ChangePassword;
