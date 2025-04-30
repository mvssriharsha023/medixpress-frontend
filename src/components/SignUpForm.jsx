import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Alert,
  Collapse
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import GlobalContext from "../context/GlobalContext";

const SignUpForm = ({ onRegistrationSuccess }) => {
  const { registerUser } = React.useContext(GlobalContext);

  // Form data state
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

  const [errors, setErrors] = useState({});
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  // Form validation logic
  const validate = () => {
    const newErrors = {};

    if (!user.name) newErrors.name = "Name is required";
    if (!user.contactNumber) {
      newErrors.contactNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(user.contactNumber)) {
      newErrors.contactNumber = "Phone number must be 10 digits";
    }

    if (!user.email) {
      newErrors.email = "Email is required";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(user.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!user.password) {
      newErrors.password = "Password is required";
    } else if (user.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!user.addressLine1) newErrors.addressLine1 = "Address is required";
    if (!user.area) newErrors.area = "Area is required";
    if (!user.city) newErrors.city = "City is required";
    if (!user.state) newErrors.state = "State is required";
    if (!user.pinCode) {
      newErrors.pinCode = "Pin code is required";
    } else if (!/^\d{6}$/.test(user.pinCode)) {
      newErrors.pinCode = "Pin code must be 6 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input field changes
  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Handle toggle between Customer and Pharmacy
  const handleUserTypeChange = (event, newType) => {
    if (newType !== null) {
      setUser((prev) => ({
        ...prev,
        userType: newType === "Customer" ? "CUSTOMER" : "PHARMACY",
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Construct full address string
    const fullAddress = `${user.addressLine1}, ${user.area}, ${user.city}, ${user.state}, ${user.pinCode}`;
    const { area, addressLine1, city, state, pinCode, ...finalUser } = {
      ...user,
      address: fullAddress,
    };

    const response = await registerUser(finalUser);

    // Show success message and switch to login
    if (response) {
      setShowSuccessAlert(true);
      setTimeout(() => {
        setShowSuccessAlert(false);
        if (onRegistrationSuccess) onRegistrationSuccess();
      }, 3000);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 800, mx: "auto", p: 2 }}>
      <Stack spacing={2}>
        {/* Success message alert */}
        <Collapse in={showSuccessAlert}>
          <Alert severity="success" variant="filled" sx={{ fontSize: "1rem", py: 2 }}>
            Registration successful! Please log in.
          </Alert>
        </Collapse>

        {/* Name and contact number fields */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            name="name"
            value={user.name}
            onChange={handleUserChange}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            fullWidth
            label="Phone Number"
            variant="outlined"
            name="contactNumber"
            value={user.contactNumber}
            onChange={handleUserChange}
            error={!!errors.contactNumber}
            helperText={errors.contactNumber}
          />
        </Box>

        {/* Email and password fields */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            name="email"
            value={user.email}
            onChange={handleUserChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            fullWidth
            label="Set Password"
            type="password"
            variant="outlined"
            name="password"
            value={user.password}
            onChange={handleUserChange}
            error={!!errors.password}
            helperText={errors.password}
          />
        </Box>

        {/* Address line 1 and area */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            label="Address Line 1"
            variant="outlined"
            name="addressLine1"
            value={user.addressLine1}
            onChange={handleUserChange}
            fullWidth
            sx={{ flex: 7 }}
            error={!!errors.addressLine1}
            helperText={errors.addressLine1}
          />
          <TextField
            label="Area"
            variant="outlined"
            name="area"
            value={user.area}
            onChange={handleUserChange}
            fullWidth
            sx={{ flex: 3 }}
            error={!!errors.area}
            helperText={errors.area}
          />
        </Box>

        {/* City, state, and pin code */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            label="City"
            variant="outlined"
            name="city"
            value={user.city}
            onChange={handleUserChange}
            fullWidth
            error={!!errors.city}
            helperText={errors.city}
          />
          <TextField
            label="State"
            variant="outlined"
            name="state"
            value={user.state}
            onChange={handleUserChange}
            fullWidth
            error={!!errors.state}
            helperText={errors.state}
          />
          <TextField
            label="Pin Code"
            variant="outlined"
            name="pinCode"
            value={user.pinCode}
            onChange={handleUserChange}
            fullWidth
            error={!!errors.pinCode}
            helperText={errors.pinCode}
          />
        </Box>

        {/* Toggle button for user type */}
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

        {/* Submit button */}
        <Button variant="contained" fullWidth sx={{ borderRadius: 2 }} type="submit">
          Sign Up
        </Button>
      </Stack>
    </Box>
  );
};

export default SignUpForm;
