import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "./components/AuthPage";
import CustomerHomePage from "./components/customer/HomePage";
import PharmacyHomePage from "./components/pharmacy/HomePage";
import GlobalState from "./context/GlobalState";

function App() {
  return (
    <div className="App">
      <GlobalState>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="/customer/home" element={<CustomerHomePage />} />
            <Route path="/pharmacy/home" element={<PharmacyHomePage />} />
          </Routes>
        </BrowserRouter>
      </GlobalState>
    </div>
  );
}

export default App;
