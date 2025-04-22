import React, { useState } from "react";
import "./cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { name: "Paracetamol 500mg Tablet", quantity: 1, price: 7.99, dose: "50 mg" },
    { name: "Cetirizine 10mg Tablet", quantity: 1, price: 12.99, dose: "10 mg" },
    { name: "Lisinopril 20mg Tablet", quantity: 1, price: 5.25, dose: "20 mg" }
  ]);

  // Modified to prevent double updates
  const updateQuantity = React.useCallback((index, delta) => {
    setCartItems(prev => {
      return prev.map((item, i) => 
        i === index 
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      );
    });
  }, []);

  const removeItem = (index) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
  const delivery = 5.0;
  const taxes = parseFloat((subtotal * 0.05).toFixed(2));
  const total = (subtotal + delivery + taxes).toFixed(2);

  return (
    <div className="glass-container">
      <div className="cart-wrapper">
        <h1 className="main-heading">Your Cart</h1>
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <h2>Your cart is empty</h2>
            <p>Add some items to get started!</p>
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
                    <button 
                      className="qty-btn" 
                      onClick={(e) => {
                        e.stopPropagation();
                        updateQuantity(index, -1);
                      }}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      className="qty-btn" 
                      onClick={(e) => {
                        e.stopPropagation();
                        updateQuantity(index, 1);
                      }}
                    >
                      +
                    </button>
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