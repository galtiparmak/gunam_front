import React from 'react';
import { Box, Typography, TextField, Button, InputLabel } from '@mui/material';
import { FaRegUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import UpperBar from './UpperBar';

const ProfilePage = () => {
  // Fetch user data from local storage
  const user = JSON.parse(localStorage.getItem('userdata'));

  return (
    <div><UpperBar />
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
        Profile
      </Typography>
      <Box sx={{ marginBottom: 2 }}>
        <FaRegUserCircle size={24} />
      </Box>

      <Box sx={{ marginBottom: 2 }}>
        <InputLabel sx={{ fontSize: '12px', mb: 1 }}>Name</InputLabel>
        <TextField
          label=""
          variant="outlined"
          value={user.name}
          InputProps={{
            readOnly: true,
            disableUnderline: true,
            sx: { fontWeight: 'bold' }
          }}
        />
      </Box>
      <Box sx={{ marginBottom: 2 }}>
        <InputLabel sx={{ fontSize: '12px', mb: 1 }}>Surname</InputLabel>
        <TextField
          label=""
          variant="outlined"
          value={user.surname}
          InputProps={{
            readOnly: true,
            disableUnderline: true,
            sx: { fontWeight: 'bold' }
          }}
        />
      </Box>
      <Box sx={{ marginBottom: 2 }}>
        <InputLabel sx={{ fontSize: '12px', mb: 1 }}>Password</InputLabel>
        <TextField
          label=""
          variant="outlined"
          value={user.password}
          InputProps={{
            readOnly: true,
            disableUnderline: true,
            sx: { fontWeight: 'bold' }
          }}
        />
        <Button component={Link} to="/changePassword" variant='contained' size="small" sx={{
          mt: 1,
          ml: 1,
        }}> Change Password</Button>
      </Box>
      <Box sx={{ marginBottom: 2 }}>
        <InputLabel sx={{ fontSize: '12px', mb: 1 }}>Email</InputLabel>
        <TextField
          label=""
          variant="outlined"
          value={user.email}
          InputProps={{
            readOnly: true,
            disableUnderline: true,
            sx: { fontWeight: 'bold' }
          }}
        />
      </Box>
      <Box sx={{ marginBottom: 2 }}>
        <InputLabel sx={{ fontSize: '12px', mb: 1 }}>Company</InputLabel>
        <TextField
          label=""
          variant="outlined"
          value={user.company}
          InputProps={{
            readOnly: true,
            disableUnderline: true,
            sx: { fontWeight: 'bold' }
          }}
        />
      </Box>
      <Box sx={{ marginBottom: 2 }}>
        <InputLabel sx={{ fontSize: '12px', mb: 1 }}>Position</InputLabel>
        <TextField
          label=""
          variant="outlined"
          value={user.position}
          InputProps={{
            readOnly: true,
            disableUnderline: true,
            sx: { fontWeight: 'bold' }
          }}
        />
      </Box>
      <Box sx={{ marginBottom: 2 }}>
        <InputLabel sx={{ fontSize: '12px', mb: 1 }}>Phone</InputLabel>
        <TextField
          label=""
          variant="outlined"
          value={user.phone}
          InputProps={{
            readOnly: true,
            disableUnderline: true,
            sx: { fontWeight: 'bold' }
          }}
        />
      </Box>
    </Box>
    </div>
  );
};

export default ProfilePage;
