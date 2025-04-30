import React, { useState } from "react";
import { Box, Button, TextField, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../context/GlobalContext";

const SignInForm = () => {
  const { loginUser } = React.useContext(GlobalContext); // Get login function from global context
  const navigate = useNavigate();

  const [loginRequest, setLoginRequest] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  // Validate email and password fields
  const validate = () => {
    let temp = {};
    temp.email = /\S+@\S+\.\S+/.test(loginRequest.email) ? "" : "Email is not valid.";
    temp.password = loginRequest.password.length >= 6 ? "" : "Password must be at least 6 characters.";
    setErrors(temp);
    return Object.values(temp).every(x => x === "");
  };

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginRequest((prev) => ({ ...prev, [name]: value }));
  };

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const response = await loginUser(loginRequest);
    if (!response) return; // Exit if login fails

    // Redirect based on role
    navigate(sessionStorage.getItem("role") === "CUSTOMER" ? "/customer/home" : "/pharmacy/home");
  };

  return (
    <Box component="form" onSubmit={handleLogin}>
      <Stack spacing={2}>
        <TextField
          fullWidth
          label="Email"
          type="email"
          name="email"
          value={loginRequest.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          name="password"
          value={loginRequest.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
        />
        <Button variant="contained" fullWidth sx={{ borderRadius: 2 }} type="submit">
          Sign In
        </Button>
      </Stack>
    </Box>
  );
};

export default SignInForm;
