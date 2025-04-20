import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import "./cart.css";
import emptyCartIcon from "./emptyCartIcon.png"; // Path to your empty cart image

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { name: "Paracetamol 500mg Tablet", quantity: 1, price: 7.99, dose: "50 mg" },
    { name: "Cetirizine 10mg Tablet", quantity: 1, price: 12.99, dose: "10 mg" },
    { name: "Lisinopril 20mg Tablet", quantity: 1, price: 5.25, dose: "20 mg" }
  ]);

  const navigate = useNavigate(); // Initialize useNavigate hook

  const updateQuantity = (index, delta) => {
    setCartItems(prev => {
      const updated = [...prev];
      updated[index].quantity = Math.max(1, updated[index].quantity + delta); // Ensure quantity never goes below 1
      return updated;
    });
  };

  const removeItem = (index) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
  const delivery = 5.0;
  const taxes = parseFloat((subtotal * 0.05).toFixed(2));
  const total = (subtotal + delivery + taxes).toFixed(2);

  // Navigate to home page when the "Browse Products" button is clicked
  const handleBrowseProducts = () => {
    navigate("/customer/home"); // Redirect to the home page (adjust the path if needed)
  };

  return (
    <div className="glass-container">
      <div className="cart-wrapper">
        <h1 className="main-heading">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="empty-cart-container">
            <div className="empty-cart">
              <img src={emptyCartIcon} alt="Empty Cart" className="empty-cart-icon" />
              <h2>Your cart is empty</h2>
              <p>Add some items to get started!</p>
              <button className="browse-products-btn" onClick={handleBrowseProducts}>Browse Products</button>
            </div>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items-section">
              {cartItems.map((item, index) => (
                <div key={index} className="cart-item">
                  <div className="item-info">
                    <div className="item-image" />
                    <div>
                      <p className="item-name">{item.name}</p>
                      <p className="item-dose">{item.dose}</p>
                    </div>
                  </div>
                  <div className="item-quantity">
                    <button className="qty-btn" onClick={() => updateQuantity(index, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button className="qty-btn" onClick={() => updateQuantity(index, 1)}>+</button>
                  </div>
                  <div className="item-price">${(item.quantity * item.price).toFixed(2)}</div>
                  <button className="remove-btn" onClick={() => removeItem(index)}>Remove</button>
                </div>
              ))}
            </div>

            <div className="order-summary">
              <h3>Order Summary</h3>
              <div className="summary-item">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-item">
                <span>Delivery charges</span>
                <span>${delivery.toFixed(2)}</span>
              </div>
              <div className="summary-item">
                <span>Taxes</span>
                <span>${taxes.toFixed(2)}</span>
              </div>
              <div className="summary-total">
                <span>Total</span>
                <span>${total}</span>
              </div>
              <p className="delivery-time">Expected Delivery: 2–3 days</p>
              <button className="checkout-btn">Proceed to Checkout</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
