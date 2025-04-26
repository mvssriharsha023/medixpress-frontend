import React, { useState } from "react";
import GlobalContext from "./GlobalContext";
import { Snackbar, Alert } from "@mui/material";

const GlobalState = (props) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info", // "success" | "error" | "warning" | "info"
  });

  const showSnackbar = (message, severity = "info") => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  const loginUser = async (loginRequest) => {
    try {
      const response = await fetch("http://localhost:8080/user-service/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginRequest),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("role", data.role);

      return data;
    } catch (err) {
      showSnackbar("Invalid credentials", "error");
    }
  };

  const registerUser = async (user) => {
    try {
      const response = await fetch("http://localhost:8080/user-service/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      return response.ok;
    } catch (error) {
      showSnackbar("The email id or phone number is already in use.", "error");
    }
  };

  const searchMedicines = async (medicineName) => {
    try {
      const response = await fetch(`http://localhost:8080/medicine-service/api/medicines/search?name=${medicineName}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch medicines");
      }
      return data;
    } catch (error) {
      showSnackbar("Failed to fetch medicines. Please try again later.", "error");
    }
  };

  const getUserById = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/user-service/user/${userId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch user details");
      }
      return data;
    } catch (error) {
      showSnackbar("Failed to fetch user details. Please try again later.", "error");
    }
  };

  const getUserByToken = async () => {
    try {
      const response = await fetch("http://localhost:8080/user-service/user/get", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch user details");
      }
      return data;
    } catch (error) {
      showSnackbar("Failed to fetch user details. Please try again later.", "error");
    }
  };

  const getMedicineById = async (medicineId) => {
    try {
      const response = await fetch(`http://localhost:8080/medicine-service/api/medicines/${medicineId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch medicine details");
      }
      return data;
    } catch (error) {
      showSnackbar("Failed to fetch medicine details. Please try again later.", "error");
    }
  };

  const getUserCart = async () => {
    try {
      const response = await fetch("http://localhost:8080/cart-service/api/cart/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch cart details");
      }
      return data;
    } catch (error) {
      showSnackbar("Failed to fetch cart details. Please try again later.", "error");
    }
  };

  const addToCart = async (pharmacyId, medicineId, quantity) => {
    try {
      const response = await fetch("http://localhost:8080/cart-service/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify({ pharmacyId, medicineId, quantity }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to add medicine to cart");
      }
      return data;
    } catch (error) {
      showSnackbar("Cannot add medicines from multiple pharmacies at once.", "error");
    }
  };

  const updateQuantityInCart = async (cartId, quantity) => {
    try {
      await fetch(`http://localhost:8080/cart-service/api/cart/update/${cartId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: quantity,
      });
    } catch (error) {
      showSnackbar("Failed to update quantity. Please try again later.", "error");
    }
  };

  const removeItemFromCart = async (cartId) => {
    try {
      const response = await fetch(`http://localhost:8080/cart-service/api/cart/remove/${cartId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Failed to remove item from cart");
      }
    } catch (error) {
      showSnackbar("Failed to remove item from cart. Please try again later.", "error");
    }
  };

  const clearCart = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/cart-service/api/cart/clear/${userId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Failed to clear cart");
      }
    } catch (error) {
      showSnackbar("Failed to clear cart. Please try again later.", "error");
    }
  };

  const placeOrder = async () => {
    try {
      const response = await fetch("http://localhost:8080/order-service/api/orders/place", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to place order");
      }
    } catch (error) {
      showSnackbar("Failed to place order. Please try again later.", "error");
    }
  };

  const getOrderHistory = async () => {
    try {
      const response = await fetch("http://localhost:8080/order-service/api/orders/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch order history");
      }
      return data;
    } catch (error) {
      showSnackbar("Failed to fetch order history. Please try again later.", "error");
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:8080/order-service/api/orders/cancel/${orderId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to cancel order");
      }
    } catch (error) {
      showSnackbar("Failed to cancel order. Please try again later.", "error");
    }
  };

  const receiveOrder = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:8080/order-service/api/orders/delivered/${orderId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to receive order");
      }
    } catch (error) {
      showSnackbar("Failed to receive order. Please try again later.", "error");
    }
  };

  const checkOutForDelivery = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:8080/order-service/api/orders/outofdelivery/${orderId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to check out for delivery");
      }
    } catch (error) {
      showSnackbar("Failed to check out for delivery. Please try again later.", "error");
    }
  };

  const getMedicinesByPharmacy = async (pharmacyId) => {
    try {
      const response = await fetch(`http://localhost:8080/medicine-service/api/medicines/pharmacy/${pharmacyId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch medicines");
      }
      return data;
    } catch (error) {
      showSnackbar("Failed to fetch medicines. Please try again later.", "error");
    }
  };

  const getOrdersByPharmacy = async () => {
    try {
      const response = await fetch("http://localhost:8080/order-service/api/orders/pharmacy", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch orders");
      }
      return data;
    } catch (error) {
      showSnackbar("Failed to fetch orders. Please try again later.", "error");
    }
  };

  const addMedicine = async (medicine) => {
    try {
      const response = await fetch("http://localhost:8080/medicine-service/api/medicines/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify(medicine),
      });
      if (!response.ok) {
        throw new Error("Failed to add medicine");
      }
    } catch (error) {
      showSnackbar("Failed to add medicine. Please try again later.", "error");
    }
  };

  const reduceMedicineQuantity = async (medicineId, quantity) => {
    try {
      const response = await fetch(`http://localhost:8080/medicine-service/api/medicines/reduce/${medicineId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: quantity,
      });
      if (!response.ok) {
        throw new Error("Failed to reduce medicine quantity");
      }
    } catch (error) {
      showSnackbar("Failed to reduce medicine quantity. Please try again later.", "error");
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        loginUser,
        registerUser,
        searchMedicines,
        getUserCart,
        addToCart,
        updateQuantityInCart,
        removeItemFromCart,
        getUserById,
        getUserByToken,
        getMedicineById,
        getMedicinesByPharmacy,
        clearCart,
        placeOrder,
        getOrderHistory,
        cancelOrder,
        receiveOrder,
        checkOutForDelivery,
        getOrdersByPharmacy,
        addMedicine,
        reduceMedicineQuantity,
      }}
    >
      {props.children}
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </GlobalContext.Provider>
  );
};

export default GlobalState;
