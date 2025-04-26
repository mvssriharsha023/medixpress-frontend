// AuthPage.jsx
import React, { useState } from "react";
import { Box, Paper, Typography, Link } from "@mui/material";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const AuthPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundImage:
          'url("https://plus.unsplash.com/premium_photo-1668487827029-2bd54133c303?q=80&w=2012")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        px: 2,
      }}
    >
      <Typography
        variant="h3"
        sx={{
          color: "#004080",
          fontWeight: "bold",
          textAlign: "center",
          textShadow: "1px 1px 3px rgba(255,255,255,0.5)",
          mb: 4,
        }}
      >
        Welcome To MediXpress!
      </Typography>

      <Paper
        elevation={8}
        sx={{
          width: "100%",
          maxWidth: 450,
          padding: 4,
          borderRadius: 3,
          backgroundColor: "rgba(255, 255, 255, 0.95)",
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          {isSignIn ? "Sign In" : "Sign Up"}
        </Typography>

        {isSignIn ? (
          <>
            <SignInForm />
            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Don't have an account?{" "}
              <Link component="button" onClick={() => setIsSignIn(false)}>
                Sign up
              </Link>
            </Typography>
          </>
        ) : (
          <>
            <SignUpForm onRegistrationSuccess={() => setIsSignIn(true)}/>
            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Already have an account?{" "}
              <Link component="button" onClick={() => setIsSignIn(true)}>
                Sign in
              </Link>
            </Typography>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default AuthPage;
