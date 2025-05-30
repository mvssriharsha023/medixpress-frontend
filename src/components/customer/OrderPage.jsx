import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Modal,
  Typography,
  Stack,
  Divider,
  CircularProgress,
} from "@mui/material";
import Navbar from "../Navbar";
import GlobalContext from "../../context/GlobalContext";

// Modal styling for centering and scrolling
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  maxHeight: "80vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

/**
 * OrderPage component shows user's order history,
 * allows viewing details, canceling, and receiving orders.
 */
const OrderPage = () => {
  const {
    getOrderHistory,
    getMedicineById,
    getUserById,
    cancelOrder,
    receiveOrder,
  } = useContext(GlobalContext);

  const [orders, setOrders] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrderHistory();
        const enrichedOrders = (
          await Promise.all(
            (Array.isArray(data) ? data : []).map(async (order) => {
              const pharmacy = await getUserById(order.pharmacyId);
              const enrichedItems = await Promise.all(
                order.items.map(async (item) => {
                  const medicine = await getMedicineById(item.medicineId);
                  return {
                    ...item,
                    medicineName: medicine?.name || "Unknown",
                  };
                })
              );
              return {
                ...order,
                pharmacyName: pharmacy.name,
                items: enrichedItems,
              };
            })
          )
        ).sort((a, b) => new Date(b.orderDateTime) - new Date(a.orderDateTime));
        setOrders(enrichedOrders);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };

    fetchOrders();
  }, [getOrderHistory, getMedicineById, getUserById]);

  const handleOpen = (order) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedOrder(null);
  };

  const handleCancelOrder = async (orderId) => {
    await cancelOrder(orderId);
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: "CANCELLED" } : order
      )
    );
  };

  const handleReceivedOrder = async (orderId) => {
    await receiveOrder(orderId);
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: "DELIVERED" } : order
      )
    );
  };

  const openConfirmDialog = (actionType, orderId) => {
    setSelectedOrderId(orderId);
    setConfirmAction(actionType);
    if (actionType === "CANCEL") {
      setConfirmMessage("Are you sure you want to cancel this order?");
    } else if (actionType === "RECEIVE") {
      setConfirmMessage("Have you received your order?");
    }
    setConfirmOpen(true);
  };

  const handleConfirm = async () => {
    setLoading(true);
    if (confirmAction === "CANCEL") {
      await handleCancelOrder(selectedOrderId);
    } else if (confirmAction === "RECEIVE") {
      await handleReceivedOrder(selectedOrderId);
    }
    setLoading(false);
    setConfirmOpen(false);
  };

  return (
    <>
      <Navbar />
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
          My Orders
        </Typography>

        {/* List of Orders */}
        <Stack spacing={2}>
          {orders.length === 0 ? (
            <Typography variant="body1" color="text.secondary">
              No orders found.
            </Typography>
          ) : (
            orders.map((order) => (
              <Card
                key={order.id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 2,
                  boxShadow: 3,
                }}
              >
                <Box>
                  <Typography variant="h6">
                    Order #{order.id.slice(-4)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Status:{" "}
                    {order.status === "OUT_OF_DELIVERY"
                      ? "OUT OF DELIVERY"
                      : order.status}{" "}
                    | Total: ₹{order.totalAmount} | Placed on:{" "}
                    {new Date(order.orderDateTime).toLocaleString()} | Pharmacy:{" "}
                    {order.pharmacyName}
                  </Typography>
                </Box>

                <Stack direction="row" spacing={1}>
                  <Button variant="contained" onClick={() => handleOpen(order)}>
                    View Details
                  </Button>

                  {order.status === "PLACED" && (
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => openConfirmDialog("CANCEL", order.id)}
                    >
                      Cancel
                    </Button>
                  )}

                  {order.status === "CANCELLED" && (
                    <Button variant="contained" color="error">
                      Cancelled
                    </Button>
                  )}

                  {order.status === "OUT_OF_DELIVERY" && (
                    <Button
                      variant="outlined"
                      color="success"
                      onClick={() => openConfirmDialog("RECEIVE", order.id)}
                    >
                      Click to Receive
                    </Button>
                  )}

                  {order.status === "DELIVERED" && (
                    <Button variant="contained" color="success">
                      Delivered
                    </Button>
                  )}
                </Stack>
              </Card>
            ))
          )}
        </Stack>
      </Box>

      {/* Modal to show order item details */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
            Order Details
          </Typography>
          <Divider sx={{ mb: 2 }} />

          {Array.isArray(selectedOrder?.items) &&
          selectedOrder.items.length > 0 ? (
            selectedOrder.items.map((item) => (
              <Card
                key={item.id}
                sx={{
                  mb: 2,
                  p: 2,
                  backgroundColor: "#f9f9f9",
                  boxShadow: 2,
                }}
              >
                <CardContent>
                  <Typography variant="h6">
                    Medicine: {item.medicineName}
                  </Typography>
                  <Typography variant="body1">
                    Quantity: {item.quantity}
                  </Typography>
                  <Typography variant="body1">
                    Price per Unit: ₹{item.pricePerUnit}
                  </Typography>
                  <Typography variant="body1">
                    Total: ₹{item.totalPrice}
                  </Typography>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography>No items found in this order.</Typography>
          )}

          {selectedOrder && (
            <Box sx={{ textAlign: "right", mt: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Total Price: ₹{selectedOrder.totalAmount}
              </Typography>
            </Box>
          )}

          <Box sx={{ textAlign: "right", mt: 2 }}>
            <Button variant="outlined" onClick={handleClose}>
              Close
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Confirmation Modal for Cancel or Receive */}
      <Modal open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" sx={{ mb: 3 }}>
            {confirmMessage}
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              variant="contained"
              color="success"
              onClick={handleConfirm}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Yes"
              )}
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => setConfirmOpen(false)}
              disabled={loading}
            >
              No
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default OrderPage;
