import React, { useState } from 'react';
import { Box, Button, TextField, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
 
const SignInForm = () => {
  const navigate = useNavigate();
  const [loginRequest, setLoginRequest] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginRequest((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
    console.log('Login Request:', loginRequest);
    sessionStorage.setItem("token", "abcdefgh");
    sessionStorage.setItem("userType", "PHARMACY");
    if (sessionStorage.getItem("userType") === "CUSTOMER") {
      navigate('/customer/home');
    }
    else if (sessionStorage.getItem("userType") === "PHARMACY") {
      navigate('/pharmacy/home');
    }
    else {
      navigate('/');
    }
  }

  return (
    <Box component="form" onSubmit={handleLogin}>
      <Stack spacing={2}>
        <TextField fullWidth label="Email" type="email" name='email' value={loginRequest.email} onChange={handleChange} variant="outlined" />
        <TextField fullWidth label="Password" type="password" name='password' value={loginRequest.password} onChange={handleChange} variant="outlined" />
        <Button variant="contained" fullWidth sx={{ borderRadius: 2 }} type="submit" color="primary">
          Sign In
        </Button>
      </Stack>
    </Box>
  );
};
 
export default SignInForm;
 
 