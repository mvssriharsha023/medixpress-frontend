import React, { useContext, useEffect, useState, useCallback } from "react";
import Navbar from "../Navbar";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Snackbar,
  Alert,
  Backdrop,
  CircularProgress,
  Dialog,
  DialogContent,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import GlobalContext from "../../context/GlobalContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();

  const {
    getUserCart,
    getUserById,
    getMedicineById,
    clearCart,
    removeItemFromCart,
    placeOrder,
  } = useContext(GlobalContext);

  const [cart, setCart] = useState([]);
  const [finalPrice, setFinalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);

  const fetchInitialData = useCallback(async () => {
    const cartData = await getUserCart();
    let total = 0;

    const enhancedCartItems = await Promise.all(
      cartData.map(async (item) => {
        const pharmacy = await getUserById(item.pharmacyId);
        const medicine = await getMedicineById(item.medicineId);
        const totalPrice = item.quantity * (medicine?.price || 0);
        total += totalPrice;

        return {
          ...item,
          pharmacyName: pharmacy?.name || "Unknown Pharmacy",
          medicineName: medicine?.name || "Unknown Medicine",
          pricePerUnit: medicine?.price || 0,
          totalPrice,
        };
      })
    );

    setCart(enhancedCartItems);
    setFinalPrice(total);
  }, [getUserCart, getUserById, getMedicineById]);

  useEffect(() => {
    if (sessionStorage.getItem("role") !== "CUSTOMER" || !sessionStorage.getItem("token")) {
      navigate("/");
    }
    fetchInitialData();
  }, [navigate, fetchInitialData]);

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div>
      <Navbar />

      <Box sx={{ p: 4 }}>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
          My Cart
        </Typography>

        {cart.length === 0 ? (
          <Typography variant="h6" sx={{ textAlign: "center", mt: 4 }}>
            No Medicines in Cart
          </Typography>
        ) : (
          <>
            <Button
              variant="outlined"
              color="error"
              sx={{ mb: 4 }}
              onClick={async () => {
                await clearCart(cart[0].userId);
                setCart([]);
                setFinalPrice(0);
                setSnackbar({ open: true, message: "Cart cleared successfully!", severity: "info" });
              }}
            >
              Clear Cart
            </Button>

            <Box sx={{ width: "100%", px: 2 }}>
              <Grid container spacing={2}>
                {cart.map((item, index) => (
                  <Grid item xs={12} md={6} lg={4} key={index}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6">{item.medicineName}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Pharmacy: {item.pharmacyName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Quantity: {item.quantity}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Price per unit: ₹{item.pricePerUnit}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Total Price: ₹{item.totalPrice}
                        </Typography>

                        <Button
                          variant="contained"
                          color="error"
                          sx={{ mt: 2 }}
                          onClick={async () => {
                            await removeItemFromCart(item.id);
                            const updatedCart = cart.filter((_, i) => i !== index);
                            setCart(updatedCart);
                            const newFinalPrice = updatedCart.reduce(
                              (sum, item) => sum + item.quantity * item.pricePerUnit,
                              0
                            );
                            setFinalPrice(newFinalPrice);
                            setSnackbar({ open: true, message: "Medicine removed!", severity: "warning" });
                          }}
                        >
                          Remove Medicine
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Box sx={{ mt: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Cart Summary
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                Final Price: ₹{finalPrice}
              </Typography>

              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 3 }}
                disabled={loading}
                onClick={async () => {
                  if (cart.length === 0) {
                    setSnackbar({ open: true, message: "Cart is empty!", severity: "info" });
                    return;
                  }
                  setLoading(true);
                  try {
                    await placeOrder();
                    setSuccessDialogOpen(true);
                    setTimeout(() => {
                      setSuccessDialogOpen(false);
                      navigate("/customer/order");
                    }, 2000);
                  } catch (err) {
                    setSnackbar({ open: true, message: "Failed to place order!", severity: "error" });
                  } finally {
                    setLoading(false);
                  }
                }}
              >
                {loading ? "Processing..." : "Check Out for Delivery"}
              </Button>
            </Box>
          </>
        )}
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Backdrop open={loading} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* Success Dialog */}
      <Dialog open={successDialogOpen} PaperProps={{ sx: { borderRadius: 3, textAlign: 'center', p: 3 } }}>
        <DialogContent>
          <CheckCircleOutlineIcon sx={{ fontSize: 60, color: "green" }} />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Order Placed Successfully!
          </Typography>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CartPage;
