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
} from "@mui/material";
import Navbar from "../Navbar";
import GlobalContext from "../../context/GlobalContext";

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

const confirmModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

const PharmacyOrderPage = () => {
  const { getOrdersByPharmacy, getUserById, getMedicineById, checkOutForDelivery } = useContext(GlobalContext);

  const [orders, setOrders] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [orderToConfirm, setOrderToConfirm] = useState(null);

  const fetchInitialData = async () => {
    const data = await getOrdersByPharmacy();
    const enrichedOrders = await Promise.all(
      (Array.isArray(data) ? data : []).map(async (order) => {
        const user = await getUserById(order.userId);
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
          userName: user.name,
          userAddress: user.address,
          userPhone: user.contactNumber,
          items: enrichedItems,
        };
      })
    );
    setOrders(enrichedOrders);
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  const handleOpen = (order) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedOrder(null);
  };

  const handleCheckOutClick = (order) => {
    setOrderToConfirm(order);
    setConfirmOpen(true);
  };

  const handleConfirmYes = async () => {
    if (orderToConfirm) {
      await checkOutForDelivery(orderToConfirm.id);
      setOrders((prevOrders) =>
        prevOrders.map((o) =>
          o.id === orderToConfirm.id ? { ...o, status: "OUT_OF_DELIVERY" } : o
        )
      );
    }
    setConfirmOpen(false);
    setOrderToConfirm(null);
  };

  const handleConfirmNo = () => {
    setConfirmOpen(false);
    setOrderToConfirm(null);
  };

  return (
    <>
      <Navbar />
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
          Pharmacy Orders
        </Typography>

        <Stack spacing={2}>
          {orders.map((order) => (
            <Card
              key={order.id}
              sx={{
                p: 2,
                boxShadow: 3,
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
                <Box sx={{ flex: "1 1 60%" }}>
                  <Typography variant="h6">
                    Order #{order.id.slice(-4)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Status: {order.status === 'OUT_OF_DELIVERY' ? 'OUT OF DELIVERY' : order.status} | Total: ₹{order.totalAmount} | Placed
                    on: {new Date(order.orderDateTime).toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    <strong>Customer:</strong> {order.userName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Address:</strong> {order.userAddress}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Phone:</strong> {order.userPhone}
                  </Typography>
                </Box>

                <Stack direction="row" spacing={1} alignItems="center" sx={{ flexWrap: "wrap" }}>
                  <Button variant="contained" onClick={() => handleOpen(order)}>
                    View Details
                  </Button>

                  {order.status === "PLACED" && (
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleCheckOutClick(order)}
                    >
                      Check Out for Delivery
                    </Button>
                  )}

                  {order.status === "OUT_OF_DELIVERY" && (
                    <Button variant="contained" color="warning">
                      Out for Delivery
                    </Button>
                  )}

                  {order.status === "CANCELLED" && (
                    <Button variant="contained" color="error">
                      Cancelled
                    </Button>
                  )}

                  {order.status === "DELIVERED" && (
                    <Button variant="contained" color="success">
                      Delivered
                    </Button>
                  )}
                </Stack>
              </Box>
            </Card>
          ))}
        </Stack>
      </Box>

      {/* Modal for order details */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
            Order Details
          </Typography>
          <Divider sx={{ mb: 2 }} />

          {Array.isArray(selectedOrder?.items) && selectedOrder.items.length > 0 ? (
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

          {/* Total Price */}
          {selectedOrder && (
            <Box sx={{ textAlign: "right", mt: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Total Price: ₹{selectedOrder.totalAmount}
              </Typography>
            </Box>
          )}

          {/* Close Button */}
          <Box sx={{ textAlign: "right", mt: 2 }}>
            <Button variant="outlined" onClick={handleClose}>
              Close
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Confirmation Modal */}
      <Modal open={confirmOpen} onClose={handleConfirmNo}>
        <Box sx={confirmModalStyle}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Are you sure you want to Check Out this order for delivery?
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
            <Button variant="contained" color="primary" onClick={handleConfirmYes}>
              Yes
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleConfirmNo}>
              No
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default PharmacyOrderPage;
