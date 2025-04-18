import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Link,
  Alert,
  Paper,
  Container,
  CssBaseline
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CheckIcon from "@mui/icons-material/Check";

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontSize: '1rem',
          height: '48px'
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
          },
        },
      },
    },
  },
});

const SignUpForm = () => {
  const navigate = useNavigate();

  const initialUserState = {
    name: "",
    email: "",
    contactNumber: "",
    password: "",
    addressLine1: "",
    area: "",
    city: "",
    state: "",
    pinCode: "",
    userType: "CUSTOMER",
  };

  const [user, setUser] = useState(initialUserState);
  const [errors, setErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // const validateForm = () => {
  //   const newErrors = {};
  //   if (!user.name.trim()) newErrors.name = "Name is required";
  //   if (!user.email.trim()) {
  //     newErrors.email = "Email is required";
  //   } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
  //     newErrors.email = "Email is invalid";
  //   }
  //   if (!user.contactNumber.trim()) {
  //     newErrors.contactNumber = "Phone number is required";
  //   } else if (!/^\d{10}$/.test(user.contactNumber)) {
  //     newErrors.contactNumber = "Phone number must be 10 digits";
  //   }
  //   if (!user.password) newErrors.password = "Password is required";
  //   if (!user.addressLine1.trim()) newErrors.addressLine1 = "Address is required";
  //   if (!user.city.trim()) newErrors.city = "City is required";
  //   if (!user.state.trim()) newErrors.state = "State is required";
  //   if (!user.pinCode.trim()) {
  //     newErrors.pinCode = "Pin code is required";
  //   } else if (!/^\d{6}$/.test(user.pinCode)) {
  //     newErrors.pinCode = "Pin code must be 6 digits";
  //   }
  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleUserTypeChange = (event, newType) => {
    if (newType !== null) {
      setUser(prev => ({
        ...prev,
        userType: newType === "Customer" ? "CUSTOMER" : "PHARMACY",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (!validateForm()) return;

    const fullAddress = `${user.addressLine1}, ${user.area}, ${user.city}, ${user.state}, ${user.pinCode}`;
    const { area, addressLine1, city, state, pinCode, ...finalUser } = {
      ...user,
      address: fullAddress,
    };


    setSubmitSuccess(true);

    setTimeout(() => navigate('/'), 2000);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          backgroundImage: 'url(https://plus.unsplash.com/premium_photo-1668487827029-2bd54133c303?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: 2,
          py: 6,
        }}
      >
        <Container component="main" maxWidth="sm">
          <Paper
            elevation={3}
            sx={{
              p: 4,
              borderRadius: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.3)',
            }}
          >
            <Typography variant="h4" align="center" sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main' }}>
              Sign Up
            </Typography>

            {submitSuccess && (
              <Alert severity="success" sx={{ mb: 3 }}>
                Registration successful! Redirecting to sign in...
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    value={user.name}
                    onChange={handleUserChange}
                    error={!!errors.name}
                    helperText={errors.name}
                  />
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="contactNumber"
                    value={user.contactNumber}
                    onChange={handleUserChange}
                    error={!!errors.contactNumber}
                    helperText={errors.contactNumber}
                  />
                </Box>

                <Box sx={{ display: "flex", gap: 2 }}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleUserChange}
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                  <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleUserChange}
                    error={!!errors.password}
                    helperText={errors.password}
                  />
                </Box>

                <TextField
                  fullWidth
                  label="Street Address"
                  name="addressLine1"
                  value={user.addressLine1}
                  onChange={handleUserChange}
                  error={!!errors.addressLine1}
                  helperText={errors.addressLine1}
                />

                <Box sx={{ display: "flex", gap: 2 }}>
                  <TextField
                    label="Area/Locality"
                    name="area"
                    value={user.area}
                    onChange={handleUserChange}
                    fullWidth
                  />
                  <TextField
                    label="City"
                    name="city"
                    value={user.city}
                    onChange={handleUserChange}
                    error={!!errors.city}
                    helperText={errors.city}
                    fullWidth
                  />
                </Box>

                <Box sx={{ display: "flex", gap: 2 }}>
                  <TextField
                    label="State"
                    name="state"
                    value={user.state}
                    onChange={handleUserChange}
                    error={!!errors.state}
                    helperText={errors.state}
                    fullWidth
                  />
                  <TextField
                    label="PIN Code"
                    name="pinCode"
                    value={user.pinCode}
                    onChange={handleUserChange}
                    error={!!errors.pinCode}
                    helperText={errors.pinCode}
                    fullWidth
                  />
                </Box>

                <Box>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    I am signing up as:
                  </Typography>
                  <ToggleButtonGroup
                    value={user.userType === "CUSTOMER" ? "Customer" : "Pharmacy"}
                    exclusive
                    onChange={handleUserTypeChange}
                    fullWidth
                    sx={{ borderRadius: 1 }}
                  >
                    <ToggleButton value="Customer" sx={{ flex: 1, textTransform: 'none', py: 1.5 }}>
                      <Box display="flex" alignItems="center">
                        {user.userType === "CUSTOMER" && <CheckIcon fontSize="small" sx={{ mr: 1 }} />}
                        Customer
                      </Box>
                    </ToggleButton>
                    <ToggleButton value="Pharmacy" sx={{ flex: 1, textTransform: 'none', py: 1.5 }}>
                      <Box display="flex" alignItems="center">
                        {user.userType === "PHARMACY" && <CheckIcon fontSize="small" sx={{ mr: 1 }} />}
                        Pharmacy
                      </Box>
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Box>

                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  type="submit"
                  sx={{ mt: 2 }}
                >
                  Create Account
                </Button>

                <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                  Already have an account?{' '}
                  <Link
                    component="button"
                    type="button"
                    onClick={() => navigate('/')}
                    sx={{ fontWeight: 600 }}
                  >
                    Sign In
                  </Link>
                </Typography>
              </Stack>
            </Box>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default SignUpForm;
