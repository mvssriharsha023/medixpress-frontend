import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Button, 
  TextField, 
  Stack, 
  Typography, 
  Link,
  Paper,
  Container,
  Alert
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Custom theme
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

const SignInForm = () => {
  const navigate = useNavigate();
  const [loginRequest, setLoginRequest] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginRequest(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  // const validateForm = () => {
  //   const newErrors = {};
  //   if (!loginRequest.email) newErrors.email = 'Email is required';
  //   else if (!/\S+@\S+\.\S+/.test(loginRequest.email)) {
  //     newErrors.email = 'Enter a valid email address';
  //   }
  //   if (!loginRequest.password) newErrors.password = 'Password is required';
  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  const handleLogin = (e) => {
    e.preventDefault();
    
    console.log('Login Request:', loginRequest);
    sessionStorage.setItem("token", "abcdefgh");
    sessionStorage.setItem("role", "CUSTOMER");
    if (sessionStorage.getItem("role") === "CUSTOMER") {
      navigate('/customer/home');
    }
    else if (sessionStorage.getItem("role") === "PHARMACY") {
      navigate('/pharmacy/home');
    }
    else {
      navigate('/');
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          backgroundImage: 'url(https://plus.unsplash.com/premium_photo-1668487827029-2bd54133c303?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)', // Add your image URL
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Welcome message outside container but still centered */}
        <Typography
          variant="h3"
          sx={{
            top:10 ,
            color: "rgba(17, 95, 154)", 
            fontWeight: "bold",
            textAlign: "center",
            textShadow: "2px 2px 4px rgba(12, 13, 13, 0.5)", // Darker shadow for contrast
            mb: 2,
            mt: 4,
            width: '100%',
            whiteSpace: 'nowrap', // Ensures text stays in one line
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            px: 2, // Padding to prevent text from touching edges
          }}
        >
          Welcome To MediXpress!
        </Typography>
        
        <Container component="main" maxWidth="xs" sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              width: '100%',
              borderRadius: 2,
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.3)',
              backgroundColor: 'rgba(255, 255, 255, 0.95)', // Slightly transparent white
            }}
          >
            <Typography 
              component="h1" 
              variant="h4" 
              align="center" 
              sx={{ 
                mb: 3,
                fontWeight: 'bold',
                color: 'primary.main'
              }}
            >
              Sign In
            </Typography>

            {loginError && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {loginError}
              </Alert>
            )}

            <Box component="form" onSubmit={handleLogin} noValidate>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={loginRequest.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  InputProps={{
                    style: {
                      fontSize: '1rem',
                    }
                  }}
                />

                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={loginRequest.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                  InputProps={{
                    style: {
                      fontSize: '1rem',
                    }
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{
                    mt: 2,
                    py: 1.5,
                    borderRadius: '8px',
                    boxShadow: 'none',
                    '&:hover': {
                      boxShadow: 'none',
                    }
                  }}
                >
                  Sign In
                </Button>

                <Typography 
                  variant="body2" 
                  align="center" 
                  sx={{ 
                    mt: 2,
                    color: 'text.secondary'
                  }}
                >
                  Don't have an account?{' '}
                  <Link
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/signup');
                    }}
                    sx={{
                      fontWeight: 600,
                      color: 'primary.main',
                      '&:hover': {
                        textDecoration: 'none',
                      }
                    }}
                  >
                    Sign Up
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

export default SignInForm;