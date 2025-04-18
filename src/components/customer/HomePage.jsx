import React, { useEffect } from 'react';
import Navbar from '../Navbar';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const role = sessionStorage.getItem('role');
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    if (token === null || role != "CUSTOMER") {
      navigate("/");
    }
  })
  return (
    <>
      <Navbar />
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" align="center">
          Welcome to MediXpress! This is Customer
        </Typography>
      </Box>
    </>
  );
};

export default HomePage;
