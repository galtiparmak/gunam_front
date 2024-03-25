import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { FaRegUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const UpperBar = ({ userType }) => {
  const ent = () => {
    if (userType === 'user') {
      JSON.parse(localStorage.getItem('userdata'));
    } else if (userType === 'admin') {
      JSON.parse(localStorage.getItem('admindata'));
    }
  }; 
  const history = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userdata');
    localStorage.removeItem('admindata');
    history('/');
  };

  const displayAdminBar = () => { 
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Button component={Link} to="/userprofile" variant="contained" size="small" sx={{ flexGrow: 1, paddingX: '30px' }}>
          Profile
        </Button>
        <Button component={Link} to="/analyze" variant="contained" size="small" sx={{ flexGrow: 1, marginLeft: '10px', paddingX: '30px' }}>
          Analyze
        </Button>
        <Button component={Link} to="/updateuser" variant="contained" size="small" sx={{ flexGrow: 1, marginLeft: '10px', paddingX: '30px' }}>
          Users
        </Button>
        <Button component={Link} to="/createuser" variant="contained" size="small" sx={{ flexGrow: 1, marginLeft: '10px', paddingX: '30px' }}>
          Create User
        </Button>
        <Button component={Link} to="/createadmin" variant="contained" size="small" sx={{ flexGrow: 1, marginLeft: '10px', paddingX: '30px' }}>
          Create Admin
        </Button>
        <Button component={Link} to="/home" variant="contained" size="small" sx={{ flexGrow: 1, marginLeft: '10px', paddingX: '30px' }}>
          Home
        </Button>
        <Button component={Link} to="/viewdata" variant="contained" size="small" sx={{ flexGrow: 1, marginLeft: '10px', paddingX: '30px' }}>
          View Data
        </Button>
        <Button onClick={handleLogout} variant="contained" size="small" sx={{ flexGrow: 1, marginLeft: '10px' }}>
          Log Out
        </Button>
      </div>
    );  
  }

  const displayUserBar = () => { 
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Button component={Link} to="/userprofile" variant="contained" size="small" sx={{ flexGrow: 1, paddingX: '30px' }}>
          Profile
        </Button>
        <Button component={Link} to="/analyze" variant="contained" size="small" sx={{ flexGrow: 1, marginLeft: '10px', paddingX: '30px' }}>
          Analyze
        </Button>
        <Button component={Link} to="/updateuser" variant="contained" size="small" sx={{ flexGrow: 1, marginLeft: '10px', paddingX: '30px' }}>
          Users
        </Button>
        <Button component={Link} to="/createuser" variant="contained" size="small" sx={{ flexGrow: 1, marginLeft: '10px', paddingX: '30px' }}>
          Create User
        </Button>
        <Button component={Link} to="/createadmin" variant="contained" size="small" sx={{ flexGrow: 1, marginLeft: '10px', paddingX: '30px' }}>
          Create Admin
        </Button>
        <Button component={Link} to="/home" variant="contained" size="small" sx={{ flexGrow: 1, marginLeft: '10px', paddingX: '30px' }}>
          Home
        </Button>
        <Button component={Link} to="/viewdata" variant="contained" size="small" sx={{ flexGrow: 1, marginLeft: '10px', paddingX: '30px' }}>
          View Data
        </Button>
        <Button onClick={handleLogout} variant="contained" size="small" sx={{ flexGrow: 1, marginLeft: '10px' }}>
          Log Out
        </Button>
      </div>
    );  
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
        backgroundColor: '#f0f0f0',
      }}
    >
      <div>
        <FaRegUserCircle size={24} />
        <Typography variant="body1" sx={{ marginLeft: '5px' }}>
          {ent?.name} {ent?.surname}
        </Typography>
      </div>
      {userType === 'admin' ? displayAdminBar() : displayUserBar()}
    </Box>
  );
};

export default UpperBar;
