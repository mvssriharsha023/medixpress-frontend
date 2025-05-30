import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const role = sessionStorage.getItem('role'); // Get user role from sessionStorage

  // Handle logout and clear session data
  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/'); // Redirect to login page after logout
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          MediXpress
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          {/* Show specific links based on user role */}
          {role === 'CUSTOMER' && (
            <>
              <Button color="inherit" onClick={() => navigate('/customer/home')}>Home</Button>
              <Button color="inherit" onClick={() => navigate('/customer/cart')}>My Cart</Button>
              <Button color="inherit" onClick={() => navigate('/customer/order')}>Order History</Button>
            </>
          )}

          {role === 'PHARMACY' && (
            <>
              <Button color="inherit" onClick={() => navigate('/pharmacy/home')}>Home</Button>
              <Button color="inherit" onClick={() => navigate('/pharmacy/inventory')}>Manage Inventory</Button>
              <Button color="inherit" onClick={() => navigate('/pharmacy/order')}>Order History</Button>
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
