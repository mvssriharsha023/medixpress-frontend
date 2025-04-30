// Importing necessary modules from React and libraries
import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Navbar";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
  Divider,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../../context/GlobalContext";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";

// Main HomePage component for pharmacy dashboard
const HomePage = () => {
  // Initialize navigation
  const navigate = useNavigate();

  // Destructure necessary global functions from context
  const { getUserByToken, getMedicinesByPharmacy, getOrdersByPharmacy } =
    useContext(GlobalContext);

  // Local state to store user, medicines, and orders
  const [user, setUser] = useState({});
  const [medicines, setMedicines] = useState([]);
  const [orders, setOrders] = useState([]);

  // Get auth details from session storage
  const role = sessionStorage.getItem("role");
  const token = sessionStorage.getItem("token");

  // Redirect non-pharmacy users to home page
  useEffect(() => {
    const fetchInitialData = async () => {
      const user = await getUserByToken(token);
      setUser(user);

      const medicineData = await getMedicinesByPharmacy(user.id);
      setMedicines(medicineData);

      const orderData = await getOrdersByPharmacy(user.id);
      setOrders(orderData);
    };

    if (!token || role !== "PHARMACY") {
      navigate("/");
    } else {
      fetchInitialData();
    }
  }, [navigate, role, token, getUserByToken, getMedicinesByPharmacy, getOrdersByPharmacy]); // Adjusted dependencies

  // Count total delivered orders
  const totalOrdersFulfilled = orders.filter((order) => order.status === "DELIVERED").length;

  return (
    <>
      {/* Top Navigation Bar */}
      <Navbar />

      {/* Main container */}
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
          Welcome to MediXpress!
        </Typography>

        {/* Pharmacy information section */}
        <Paper elevation={3} sx={{ p: 3, borderRadius: 3, mb: 5 }}>
          <Box display="flex" alignItems="center" gap={2} mb={3}>
            <Avatar sx={{ bgcolor: "primary.main", width: 56, height: 56 }}>
              <LocalPharmacyIcon fontSize="large" />
            </Avatar>
            <Typography variant="h5" fontWeight={600}>
              {user.name || "Pharmacy Name"}
            </Typography>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Grid layout for pharmacy details */}
          <Grid container spacing={3}>
            {/* Email Card */}
            <Grid item xs={12} md={6}>
              <Card variant="outlined" sx={{ borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Email
                  </Typography>
                  <Typography variant="body1">{user.email}</Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Contact Number Card */}
            <Grid item xs={12} md={6}>
              <Card variant="outlined" sx={{ borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Contact Number
                  </Typography>
                  <Typography variant="body1">{user.contactNumber}</Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Address Card */}
            <Grid item xs={12}>
              <Card variant="outlined" sx={{ borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Address
                  </Typography>
                  <Typography variant="body1">{user.address}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>

        {/* Analytics Cards Section */}
        <Grid container spacing={4} justifyContent="center">
          {/* Total Medicines Card */}
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                borderRadius: 4,
                backgroundColor: "#e3f2fd",
                height: 180,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: 3,
                transition: "transform 0.3s",
                "&:hover": { transform: "translateY(-5px)" },
              }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  Total Medicines
                </Typography>
                <Typography variant="h3" fontWeight={700}>
                  {medicines.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Total Orders Card */}
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                borderRadius: 4,
                backgroundColor: "#e8f5e9",
                height: 180,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: 3,
                transition: "transform 0.3s",
                "&:hover": { transform: "translateY(-5px)" },
              }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  Total Orders
                </Typography>
                <Typography variant="h3" fontWeight={700}>
                  {orders.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Low Stock Alerts Card */}
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                borderRadius: 4,
                backgroundColor: "#fff3e0",
                height: 180,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: 3,
                transition: "transform 0.3s",
                "&:hover": { transform: "translateY(-5px)" },
              }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  Low Stock Alerts
                </Typography>
                <Typography variant="h3" fontWeight={700}>
                  {medicines.filter((med) => med.quantity < 10).length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Orders Fulfilled Card */}
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                borderRadius: 4,
                backgroundColor: "#ede7f6",
                height: 180,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: 3,
                transition: "transform 0.3s",
                "&:hover": { transform: "translateY(-5px)" },
              }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  Orders Fulfilled
                </Typography>
                <Typography variant="h3" fontWeight={700}>
                  {totalOrdersFulfilled}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default HomePage;
