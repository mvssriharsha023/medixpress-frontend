import React, { useState } from "react";
import { Box, Paper, Typography, Button } from "@mui/material";
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
        overflow: "hidden",
        backgroundImage:
          'url("https://plus.unsplash.com/premium_photo-1668487827029-2bd54133c303?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        px: 2,
      }}
    >
      {/* Title Above Container */}
      <Typography
        variant="h3"
        sx={{
          color: "#004080", // Deep blue, suits medical theme
          fontWeight: "bold",
          textAlign: "center",
          textShadow: "1px 1px 3px rgba(255,255,255,0.5)", // subtle glow for clarity
          mb: 4,
        }}
      >
        Welcome To MediXpress!
      </Typography>

      {/* Auth Container */}



        {isSignIn ? <SignInForm /> : <SignUpForm />}
    </Box>
  );
};

export default AuthPage;
