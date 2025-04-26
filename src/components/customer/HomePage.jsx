import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Navbar";
import {
  Box,
  Typography,
  Autocomplete,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  IconButton,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../../context/GlobalContext";

const HomePage = () => {
  const {
    searchMedicines,
    getUserCart,
    addToCart,
    updateQuantityInCart,
    removeItemFromCart,
  } = useContext(GlobalContext);

  const [medicines, setMedicines] = useState([]);
  const [medicineSearch, setMedicineSearch] = useState("");
  const [medicineNames, setMedicineNames] = useState([]);
  const [cartMap, setCartMap] = useState({});

  const navigate = useNavigate();
  const role = sessionStorage.getItem("role");
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (!token || role !== "CUSTOMER") {
      navigate("/");
    } else {
      fetchInitialData();
    }
  }, []);

  const fetchInitialData = async () => {
    await fetchMedicines();
    const cartData = await getUserCart();
    const map = {};
    cartData.forEach((item) => {
      map[item.medicineId] = item;
    });
    setCartMap(map);
  };

  const fetchMedicines = async () => {
    const data = await searchMedicines(medicineSearch);
    setMedicines(data);
    const uniqueNames = [...new Set(data.map((med) => med.name))];
    setMedicineNames(uniqueNames);
  };

  const handleSearch = () => {
    if (medicineSearch === "" || medicineSearch === null) {
      setMedicineSearch("");
      fetchInitialData(); // still fetches everything
    } else {
      fetchMedicines();
    }
  };

  const handleAddToCart = async (pharmacyId, medicineId) => {
    const addedItem = await addToCart(pharmacyId, medicineId, 1);
    console.log(addedItem);
    if (addedItem) {
      setCartMap((prev) => ({
        ...prev,
        [medicineId]: addedItem,
      }));
    }
  };

  const handleQuantityChange = (
    cartId,
    medicineId,
    pharmacyId,
    delta,
    maxQuantity
  ) => {
    const current = cartMap[medicineId];
    const newQty = current.quantity + delta;

    if (newQty > maxQuantity) {
      alert("Cannot add more than available quantity in stock.");
      return;
    }

    if (newQty == 0) {
      // If quantity hits 0, remove it from cartMap
      setCartMap((prev) => {
        const updated = { ...prev };
        delete updated[medicineId];
        return updated;
      });
      removeItemFromCart(cartId);
      // TODO: add removeFromCart API
    } else {
      // For now, simulate update by just changing state
      setCartMap((prev) => ({
        ...prev,
        [medicineId]: { ...current, quantity: newQty },
      }));
      updateQuantityInCart(cartId, newQty);
      // TODO: call updateQuantity API
    }
  };

  return (
    <>
      <Navbar />
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
          Welcome to MediXpress!
        </Typography>

        <Stack direction="row" spacing={2} alignItems="center">
          <Autocomplete
            value={medicineSearch}
            onChange={(event, newValue) => setMedicineSearch(newValue || "")}
            onInputChange={(event, newInputValue) =>
              setMedicineSearch(newInputValue)
            }
            options={medicineNames}
            sx={{ flex: 1 }}
            // freeSolo
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search Medicines"
                variant="outlined"
                fullWidth
              />
            )}
          />

          <Button
            variant="contained"
            onClick={handleSearch}
            sx={{ height: "56px" }}
          >
            Search
          </Button>
        </Stack>

        <Grid container spacing={3} sx={{ mt: 3 }}>
          {medicines.length === 0 ? (
            <Typography variant="h6" sx={{ textAlign: "center", mt: 4 }}>
              No Medicines Found
            </Typography>
          ) : (
            medicines.map((medicine) => {
              const inCart = cartMap[medicine.id];
              return (
                <Grid item xs={12} sm={6} md={3} key={medicine.id}>
                  <Card sx={{ p: 2, boxShadow: 4, borderRadius: 3 }}>
                    <CardContent>
                      <Typography variant="h6" sx={{ fontWeight: 500 }}>
                        {medicine.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Pharmacy: {medicine.pharmacyName}
                      </Typography>
                      <Typography variant="body1">
                        Price: ₹{medicine.price}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Quantity: {medicine.quantity}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Distance: {medicine.distance.toFixed(2)} km
                      </Typography>
                    </CardContent>
                    <Box sx={{ px: 2, pb: 2 }}>
                      {inCart ? (
                        <Stack direction="row" spacing={1} alignItems="center">
                          <IconButton
                            color="primary"
                            onClick={() =>
                              handleQuantityChange(
                                inCart.id,
                                medicine.id,
                                medicine.pharmacyId,
                                -1,
                                medicine.quantity
                              )
                            }
                          >
                            <RemoveIcon />
                          </IconButton>
                          <Typography>{inCart.quantity}</Typography>
                          <IconButton
                            color="primary"
                            onClick={() =>
                              handleQuantityChange(
                                inCart.id,
                                medicine.id,
                                medicine.pharmacyId,
                                1,
                                medicine.quantity
                              )
                            }
                          >
                            <AddIcon />
                          </IconButton>
                        </Stack>
                      ) : (
                        <Button
                          fullWidth
                          variant="contained"
                          onClick={() =>
                            handleAddToCart(medicine.pharmacyId, medicine.id)
                          }
                        >
                          Add to Cart
                        </Button>
                      )}
                    </Box>
                  </Card>
                </Grid>
              );
            })
          )}
        </Grid>
      </Box>
    </>
  );
};

export default HomePage;
