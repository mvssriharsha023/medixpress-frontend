import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "./components/AuthPage";
import CustomerHomePage from "./components/customer/HomePage";
import PharmacyHomePage from "./components/pharmacy/HomePage";
import GlobalState from "./context/GlobalState";
import CartPage from "./components/customer/CartPage";
import OrderPage from "./components/customer/OrderPage";
import PharmacyOrderPage from "./components/pharmacy/OrderPage";
import InventoryPage from "./components/pharmacy/InventoryPage";

function App() {
  return (
    <div className="App">
      <GlobalState>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="/customer/home" element={<CustomerHomePage />} />
            <Route path="/customer/cart" element={<CartPage/>} />
            <Route path="/customer/order" element={<OrderPage />} />
            <Route path="/pharmacy/home" element={<PharmacyHomePage />} />
            <Route path="/pharmacy/inventory" element={<InventoryPage/>} />
            <Route path="/pharmacy/order" element={<PharmacyOrderPage />} />
          </Routes>
        </BrowserRouter>
      </GlobalState>
    </div>
  );
}

export default App;
