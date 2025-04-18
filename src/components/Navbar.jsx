import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const role = sessionStorage.getItem('role');

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/'); // or wherever your login page is
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          MediXpress
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          

          {role === 'CUSTOMER' && (
            <>
            <Button color="inherit" onClick={() => navigate('/customer/home')}>Home</Button>
              <Button color="inherit" onClick={() => navigate('/cart')}>My Cart</Button>
              <Button color="inherit" onClick={() => navigate('/orders')}>Order History</Button>
            </>
          )}

          {role === 'PHARMACY' && (
            <>
            <Button color="inherit" onClick={() => navigate('/pharmacy/home')}>Home</Button>
              <Button color="inherit" onClick={() => navigate('/inventory')}>Manage Inventory</Button>
              <Button color="inherit" onClick={() => navigate('/orders')}>Order History</Button>
            </>
          )}
        </Box>

        <Box sx={{ flexGrow: 1 }} />
        <Button color="inherit" onClick={handleLogout}>Log Out</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
