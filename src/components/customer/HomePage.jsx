import React, { useContext, useEffect, useState, useCallback } from "react";
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
  const [pharmacyNames, setPharmacyNames] = useState([]);
  const [pharmacyFilter, setPharmacyFilter] = useState([]);
  const [cartMap, setCartMap] = useState({});

  const navigate = useNavigate();
  const role = sessionStorage.getItem("role");
  const token = sessionStorage.getItem("token");

  // Memoize fetchMedicines to avoid unnecessary re-renders
  const fetchMedicines = useCallback(async () => {
    const data = await searchMedicines(medicineSearch);
    setMedicines(data);
    setMedicineNames([...new Set(data.map((med) => med.name))]);
    const uniquePharmacies = [...new Set(data.map((med) => med.pharmacyName))];
    setPharmacyNames(uniquePharmacies);
    setPharmacyFilter(uniquePharmacies);
  }, [medicineSearch, searchMedicines]);

  // Memoize fetchInitialData to avoid unnecessary re-renders
  const fetchInitialData = useCallback(async () => {
    await fetchMedicines();
    const cartData = await getUserCart();
    const map = {};
    cartData.forEach((item) => {
      map[item.medicineId] = item;
    });
    setCartMap(map);
  }, [fetchMedicines, getUserCart]);

  useEffect(() => {
    // Redirect if not a logged-in customer
    if (!token || role !== "CUSTOMER") {
      navigate("/");
    } else {
      fetchInitialData();
    }
  }, [fetchInitialData, navigate, token, role]);

  const handleSearch = () => {
    // Fetch all if input is empty
    if (!medicineSearch) {
      setMedicineSearch("");
      fetchInitialData();
    } else {
      fetchMedicines();
    }
  };

  const handleAddToCart = async (pharmacyId, medicineId) => {
    const addedItem = await addToCart(pharmacyId, medicineId, 1);
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

    if (newQty === 0) {
      const updated = { ...cartMap };
      delete updated[medicineId];
      setCartMap(updated);
      removeItemFromCart(cartId);
    } else {
      setCartMap((prev) => ({
        ...prev,
        [medicineId]: { ...current, quantity: newQty },
      }));
      updateQuantityInCart(cartId, newQty);
    }
  };

  const filteredMedicines = medicines.filter((medicine) =>
    pharmacyFilter.includes(medicine.pharmacyName)
  );

  return (
    <>
      <Navbar />
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
          Welcome to MediXpress!
        </Typography>

        {/* Search bar */}
        <Stack direction="row" spacing={2} alignItems="center">
          <Autocomplete
            value={medicineSearch}
            onChange={(e, val) => setMedicineSearch(val || "")}
            onInputChange={(e, val) => setMedicineSearch(val)}
            options={medicineNames}
            sx={{ flex: 1 }}
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

        {/* Pharmacy filters */}
        <Box sx={{ mt: 3 }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            alignItems="center"
          >
            <Autocomplete
              multiple
              options={pharmacyNames}
              value={pharmacyFilter}
              onChange={(e, newValue) => setPharmacyFilter(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Filter by Pharmacy"
                  placeholder="Select Pharmacies"
                />
              )}
              disableCloseOnSelect
              sx={{ flex: 1 }}
            />
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setPharmacyFilter([])}
              disabled={pharmacyFilter.length === 0}
              sx={{ height: "56px", whiteSpace: "nowrap" }}
            >
              Deselect All
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setPharmacyFilter(pharmacyNames)}
              disabled={pharmacyFilter.length === pharmacyNames.length}
              sx={{ height: "56px", whiteSpace: "nowrap" }}
            >
              Select All
            </Button>
          </Stack>
        </Box>

        {/* Medicine cards */}
        <Grid container spacing={3} sx={{ mt: 3 }}>
          {filteredMedicines.length === 0 ? (
            <Typography variant="h6" sx={{ textAlign: "center", mt: 4 }}>
              No Medicines Found
            </Typography>
          ) : (
            filteredMedicines.map((medicine) => {
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

                    {/* Cart actions */}
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
