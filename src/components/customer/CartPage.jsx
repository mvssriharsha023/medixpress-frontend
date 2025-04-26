import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Navbar";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import GlobalContext from "../../context/GlobalContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {

    const navigate = useNavigate();
  const { getUserCart, getUserById, getMedicineById, clearCart, removeItemFromCart, placeOrder } =
    useContext(GlobalContext);

  const [cart, setCart] = useState([]);
  const [finalPrice, setFinalPrice] = useState(0);

  const fetchInitialData = async () => {
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
          totalPrice: totalPrice,
        };
      })
    );

    setCart(enhancedCartItems);
    setFinalPrice(total);
  };

  useEffect(() => {
    if (sessionStorage.getItem("role") !== "CUSTOMER" || !sessionStorage.getItem("token")) {
        navigate("/");
    }
    fetchInitialData();
  }, []);

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
            {/* Clear Cart Button */}
            <Button
              variant="outlined"
              color="error"
              sx={{ mb: 4 }}
              onClick={async () => {
                await clearCart(cart[0].userId);
                setCart([]);
                alert("Cart cleared successfully!");
              }}
            >
              Clear Cart
            </Button>
  
            {/* Display Cart Items */}
            <Box sx={{ width: "100%", px: 2 }}>
              <Grid container spacing={2} sx={{ width: "100%" }}>
                {cart.map((item, index) => (
                  <Grid item xs={12} key={index}>
                    <Card sx={{ width: "100%" }}>
                      <CardContent>
                        <Typography variant="h6">{item.medicineName}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Pharmacy: {item.pharmacyName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Quantity: {item.quantity}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Price per unit: ${item.pricePerUnit}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Total Price: ${item.totalPrice}
                        </Typography>
                        <Button variant="contained" color="error" sx={{ mt: 2 }} onClick={async () => {
                            await removeItemFromCart(item.id);
                            setCart(cart.filter((_, i) => i !== index));
                        }}>
                          Remove Medicine
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
  
            {/* Cart Summary */}
            <Box sx={{ mt: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Cart Summary
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                Final Price: ${finalPrice}
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={async () => {
                await placeOrder();
                alert("Order placed successfully!");
                navigate("/customer/home");
              }}>
                Check Out for Delivery
              </Button>
            </Box>
          </>
        )}
      </Box>
    </div>
  );
  
};

export default CartPage;
