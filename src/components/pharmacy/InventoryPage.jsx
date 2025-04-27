import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Navbar";
import GlobalContext from "../../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Button,
  Card,
  CardContent,
  Typography,
  Modal,
  TextField,
  Alert,
} from "@mui/material";

const InventoryPage = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("role");

  const { getUserByToken, getMedicinesByPharmacy, addMedicine, reduceMedicineQuantity, updatePrice } = useContext(GlobalContext);

  const [medicines, setMedicines] = useState([]);
  const [user, setUser] = useState({});

  const [openAddMedicineModal, setOpenAddMedicineModal] = useState(false);
  const [quantityError, setQuantityError] = useState("");

  const [newMedicine, setNewMedicine] = useState({
    name: "",
    price: "",
    quantity: "",
  });
  const [errors, setErrors] = useState({});

  const [openQuantityModal, setOpenQuantityModal] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [actionType, setActionType] = useState("");
  const [quantityInput, setQuantityInput] = useState("");

  const [openUpdatePriceModal, setOpenUpdatePriceModal] = useState(false);
  const [selectedMedicineForPrice, setSelectedMedicineForPrice] = useState(null);
  const [newPrice, setNewPrice] = useState("");
  const [priceError, setPriceError] = useState("");

  const fetchInitialData = async () => {
    const user = await getUserByToken(token);
    setUser(user);
    const medicineData = await getMedicinesByPharmacy(user.id);
    setMedicines(medicineData || []);
  };

  useEffect(() => {
    if (!token || role !== "PHARMACY") {
      navigate("/");
    } else {
      fetchInitialData();
    }
  }, []);

  const handleOpenAddMedicineModal = () => {
    setOpenAddMedicineModal(true);
  };

  const handleCloseAddMedicineModal = () => {
    setOpenAddMedicineModal(false);
    setNewMedicine({ name: "", price: "", quantity: "" });
    setErrors({});
    setQuantityError("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMedicine((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "quantity") setQuantityError("");
  };

  const validateFields = () => {
    let tempErrors = {};
    if (!newMedicine.name) tempErrors.name = "Name is required.";
    if (!newMedicine.price) tempErrors.price = "Price is required.";
    if (!newMedicine.quantity) {
      tempErrors.quantity = "Quantity is required.";
    } else if (!Number.isInteger(Number(newMedicine.quantity))) {
      tempErrors.quantity = "Quantity must be an integer.";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleAddMedicine = async (medicineData) => {
    if (validateFields()) {
      await addMedicine(medicineData);
      const updatedMedicines = await getMedicinesByPharmacy(user.id);
      setMedicines(updatedMedicines || []);
      setNewMedicine({ name: "", price: "", quantity: "" });
      handleCloseAddMedicineModal();
    }
  };

  const handleOpenQuantityModal = (medicine, type) => {
    setSelectedMedicine(medicine);
    setActionType(type);
    setQuantityInput("");
    setQuantityError("");
    setOpenQuantityModal(true);
  };

  const handleCloseQuantityModal = () => {
    setOpenQuantityModal(false);
    setSelectedMedicine(null);
    setActionType("");
    setQuantityInput("");
    setQuantityError("");
  };

  const handleQuantityInputChange = (e) => {
    setQuantityInput(e.target.value);
    setQuantityError("");
  };

  const handleQuantityAction = async (name, price, quantity, actionType) => {
    const parsedQty = parseInt(quantity);

    if (!quantityInput) {
      setQuantityError("Quantity is required.");
      return;
    }

    if (isNaN(parsedQty) || parsedQty <= 0) {
      setQuantityError("Please enter a valid positive integer.");
      return;
    }

    if (actionType === "reduce" && parsedQty > selectedMedicine.quantity) {
      setQuantityError("Cannot reduce more than available quantity.");
      return;
    }

    if (actionType === "add") {
      await addMedicine({ name, price, quantity: parsedQty });
      const medicineData = await getMedicinesByPharmacy(user.id);
      setMedicines(medicineData || []);
    }

    if (actionType === "reduce" && parsedQty <= selectedMedicine.quantity) {
      await reduceMedicineQuantity(selectedMedicine.id, parsedQty);
      const medicineData = await getMedicinesByPharmacy(user.id);
      setMedicines(medicineData || []);
    }

    handleCloseQuantityModal();
  };

  const handleUpdatePriceClick = (medicine) => {
    setSelectedMedicineForPrice(medicine);
    setNewPrice("");
    setPriceError("");
    setOpenUpdatePriceModal(true);
  };

  const handleCloseUpdatePriceModal = () => {
    setOpenUpdatePriceModal(false);
    setSelectedMedicineForPrice(null);
    setNewPrice("");
    setPriceError("");
  };

  const handleNewPriceChange = (e) => {
    setNewPrice(e.target.value);
    setPriceError("");
  };

  const handleUpdatePriceSubmit = async () => {
    if (!newPrice) {
      setPriceError("Price is required.");
      return;
    }
    const parsedPrice = parseFloat(newPrice);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      setPriceError("Please enter a valid positive number.");
      return;
    }
    await updatePrice(selectedMedicineForPrice.id, parsedPrice);
    const updatedMedicines = await getMedicinesByPharmacy(user.id);
    setMedicines(updatedMedicines || []);
    handleCloseUpdatePriceModal();
  };

  return (
    <div>
      <Navbar />
      <Box sx={{ p: 4 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ mb: 4 }}
          onClick={handleOpenAddMedicineModal}
        >
          Add New Medicine
        </Button>

        <Grid container spacing={3}>
          {medicines
            .filter((med) => med && med.name !== undefined && med.price !== undefined && med.quantity !== undefined)
            .map((medicine, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ p: 2, borderRadius: 3 }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight={600}>
                      {medicine.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Price: ₹{medicine.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={2}>
                      Quantity: {medicine.quantity}
                    </Typography>

                    {medicine.quantity === 0 && (
                      <Alert severity="warning" sx={{ mb: 2 }}>
                        Out of Stock
                      </Alert>
                    )}

                    <Box display="flex" gap={1} mt={2}>
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        fullWidth
                        onClick={() => handleOpenQuantityModal(medicine, "add")}
                      >
                        Add
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        fullWidth
                        onClick={() => handleOpenQuantityModal(medicine, "reduce")}
                      >
                        Reduce
                      </Button>
                    </Box>

                    <Button
                      variant="contained"
                      color="warning"
                      size="small"
                      fullWidth
                      sx={{ mt: 1 }}
                      onClick={() => handleUpdatePriceClick(medicine)}
                    >
                      Update Price
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>

        {/* Add Medicine Modal */}
        <Modal
          open={openAddMedicineModal}
          onClose={handleCloseAddMedicineModal}
          aria-labelledby="add-medicine-modal"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              bgcolor: "background.paper",
              p: 4,
              borderRadius: 3,
              width: 400,
              boxShadow: 24,
            }}
          >
            <Typography id="add-medicine-modal" variant="h6" mb={3}>
              Add New Medicine
            </Typography>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={newMedicine.name}
              onChange={handleInputChange}
              error={!!errors.name}
              helperText={errors.name}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Price"
              name="price"
              value={newMedicine.price}
              onChange={handleInputChange}
              error={!!errors.price}
              helperText={errors.price}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Quantity"
              name="quantity"
              value={newMedicine.quantity}
              onChange={handleInputChange}
              error={!!errors.quantity || !!quantityError}
              helperText={errors.quantity || quantityError}
              sx={{ mb: 3 }}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() =>
                handleAddMedicine({
                  name: newMedicine.name,
                  price: newMedicine.price,
                  quantity: newMedicine.quantity,
                })
              }
            >
              Add Medicine
            </Button>
          </Box>
        </Modal>

        {/* Quantity Modal */}
        <Modal
          open={openQuantityModal}
          onClose={handleCloseQuantityModal}
          aria-labelledby="quantity-modal"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              bgcolor: "background.paper",
              p: 4,
              borderRadius: 3,
              width: 400,
              boxShadow: 24,
            }}
          >
            {selectedMedicine && (
              <>
                <Typography id="quantity-modal" variant="h6" mb={3}>
                  {actionType === "add" ? "Add Quantity" : "Reduce Quantity"}
                </Typography>
                <Typography variant="subtitle1" mb={1}>
                  Medicine: {selectedMedicine.name}
                </Typography>
                <Typography variant="subtitle2" mb={2}>
                  Price: ₹{selectedMedicine.price}
                </Typography>
                <TextField
                  fullWidth
                  label="Quantity to be added/reduced"
                  value={quantityInput}
                  onChange={handleQuantityInputChange}
                  error={!!quantityError}
                  helperText={quantityError}
                  sx={{ mb: 3 }}
                />
                <Button
                  variant="contained"
                  color={actionType === "add" ? "success" : "error"}
                  fullWidth
                  onClick={() =>
                    handleQuantityAction(
                      selectedMedicine.name,
                      selectedMedicine.price,
                      quantityInput,
                      actionType
                    )
                  }
                >
                  {actionType === "add" ? "Add Quantity" : "Reduce Quantity"}
                </Button>
              </>
            )}
          </Box>
        </Modal>

        {/* Update Price Modal */}
        <Modal
          open={openUpdatePriceModal}
          onClose={handleCloseUpdatePriceModal}
          aria-labelledby="update-price-modal"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              bgcolor: "background.paper",
              p: 4,
              borderRadius: 3,
              width: 400,
              boxShadow: 24,
            }}
          >
            {selectedMedicineForPrice && (
              <>
                <Typography id="update-price-modal" variant="h6" mb={3}>
                  Update Price
                </Typography>
                <Typography variant="subtitle1" mb={2}>
                  Medicine: {selectedMedicineForPrice.name}
                </Typography>
                <TextField
                  fullWidth
                  label="New Price"
                  value={newPrice}
                  onChange={handleNewPriceChange}
                  error={!!priceError}
                  helperText={priceError}
                  sx={{ mb: 3 }}
                />
                <Button
                  variant="contained"
                  color="warning"
                  fullWidth
                  onClick={handleUpdatePriceSubmit}
                >
                  Update Price
                </Button>
              </>
            )}
          </Box>
        </Modal>

      </Box>
    </div>
  );
};

export default InventoryPage;
