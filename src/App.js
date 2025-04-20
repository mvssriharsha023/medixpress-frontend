import { BrowserRouter, Route, Routes } from "react-router-dom";
import CustomerHomePage from "./components/customer/HomePage";
import PharmacyHomePage from "./components/pharmacy/HomePage";
import GlobalState from "./context/GlobalState";
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";
import Myorderhistory from "./components/customer/myorderhistory";
import Mycart from "./components/customer/mycart";
import PharmacyInventory from "./components/pharmacy/inventory";
import PharmacyOrders from "./components/pharmacy/orders";
import './styles/global.css';
/* slick-carousel styles */



function App() {
  return (
    <div className="App">
      <GlobalState>
        <BrowserRouter>
          <Routes>
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/signin" element={<SignInForm />} />
          <Route path="/customer/home" element={<CustomerHomePage />} />
          <Route path="/customer/mycart" element={<Mycart />} />
          <Route path="/customer/myorderhistory" element={<Myorderhistory />} />
          <Route path="/pharmacy/home" element={<PharmacyHomePage />} />
          <Route path="/pharmacy/inventory" element={<PharmacyInventory />} />
          <Route path="/pharmacy/orders" element={<PharmacyOrders />} />
          <Route path="/" element={<SignInForm />} />
          </Routes>
        </BrowserRouter>
      </GlobalState>
    </div>
  );
}

export default App;
