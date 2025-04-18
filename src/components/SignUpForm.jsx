import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const SignUpForm = () => {
  const [user, setUser] = useState({
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
  });

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUserTypeChange = (event, newType) => {
    if (newType !== null) {
      setUser((prev) => ({
        ...prev,
        userType: newType === "Customer" ? "CUSTOMER" : "PHARMACY",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fullAddress = `${user.addressLine1}, ${user.area}, ${user.city}, ${user.state}, ${user.pinCode}`;

    const { area, addressLine1, city, state, pinCode, ...finalUser } = {
      ...user,
      address: fullAddress,
    };

    console.log(finalUser);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 800, mx: "auto", p: 2 }}>
      <Stack spacing={2}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            name="name"
            value={user.name}
            onChange={handleUserChange}
          />
          <TextField
            fullWidth
            label="Phone Number"
            variant="outlined"
            name="contactNumber"
            value={user.contactNumber}
            onChange={handleUserChange}
          />
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            name="email"
            value={user.email}
            onChange={handleUserChange}
          />
          <TextField
            fullWidth
            label="Set Password"
            type="password"
            variant="outlined"
            name="password"
            value={user.password}
            onChange={handleUserChange}
          />
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            label="Address Line 1"
            variant="outlined"
            name="addressLine1"
            value={user.addressLine1}
            onChange={handleUserChange}
            fullWidth
            sx={{ flex: 7 }}
          />
          <TextField
            label="Area"
            variant="outlined"
            name="area"
            value={user.area}
            onChange={handleUserChange}
            fullWidth
            sx={{ flex: 3 }}
          />
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            label="City"
            variant="outlined"
            name="city"
            value={user.city}
            onChange={handleUserChange}
            fullWidth
          />
          <TextField
            label="State"
            variant="outlined"
            name="state"
            value={user.state}
            onChange={handleUserChange}
            fullWidth
          />
          <TextField
            label="Pin Code"
            variant="outlined"
            name="pinCode"
            value={user.pinCode}
            onChange={handleUserChange}
            fullWidth
          />
        </Box>

        <Typography variant="subtitle2" sx={{ mt: 1 }}>
          Sign up as
        </Typography>

        <ToggleButtonGroup
          value={user.userType === "CUSTOMER" ? "Customer" : "Pharmacy"}
          exclusive
          onChange={handleUserTypeChange}
          fullWidth
          sx={{ borderRadius: 2 }}
        >
          <ToggleButton value="Customer" sx={{ flex: 1 }}>
            <Box display="flex" alignItems="center" justifyContent="center" width="100%">
              {user.userType === "CUSTOMER" && <CheckIcon fontSize="small" sx={{ mr: 1 }} />}
              Customer
            </Box>
          </ToggleButton>
          <ToggleButton value="Pharmacy" sx={{ flex: 1 }}>
            <Box display="flex" alignItems="center" justifyContent="center" width="100%">
              {user.userType === "PHARMACY" && <CheckIcon fontSize="small" sx={{ mr: 1 }} />}
              Pharmacy
            </Box>
          </ToggleButton>
        </ToggleButtonGroup>

        <Button variant="contained" fullWidth sx={{ borderRadius: 2 }} type="submit">
          Sign Up
        </Button>
      </Stack>
    </Box>
  );
};

export default SignUpForm;
