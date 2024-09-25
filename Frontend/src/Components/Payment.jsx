// src/Components/Payment.js
import React, { useState } from 'react';
import './Payment.css';

function Payment({ cart }) {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [orderConfirmed, setOrderConfirmed] = useState(false); // State to manage order confirmation
  const price = localStorage.getItem("totalPrice");
  const [address, setAddress] = useState({
    fullName: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });

  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleAddressChange = (event) => {
    const { name, value } = event.target;
    setAddress({ ...address, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setOrderConfirmed(true); // Set orderConfirmed to true on form submission
  };

  if (orderConfirmed) {
    return (
      <>
        <div className="order-confirmation-message"><h3>Order Confirmed!</h3></div> 
      </>
  )}

  return (
    <div className="payment-page">
      <h3>Payment</h3>
      <div className="payment-details">
        <h4>Total Amount: ${price}</h4>
        <form className="payment-form" onSubmit={handleSubmit}>
          <h4>Shipping Address</h4>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={address.fullName}
              onChange={handleAddressChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="streetAddress">Street Address</label>
            <input
              type="text"
              id="streetAddress"
              name="streetAddress"
              value={address.streetAddress}
              onChange={handleAddressChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={address.city}
              onChange={handleAddressChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="state">State</label>
            <input
              type="text"
              id="state"
              name="state"
              value={address.state}
              onChange={handleAddressChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="zipCode">Zip Code</label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={address.zipCode}
              onChange={handleAddressChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              id="country"
              name="country"
              value={address.country}
              onChange={handleAddressChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="payment-method">Select Payment Method</label>
            <select id="payment-method" value={paymentMethod} onChange={handlePaymentMethodChange}>
              <option value="card">Card Payment</option>
              <option value="upi">UPI Payment</option>
              <option value="cod">Cash on Delivery</option>
            </select>
          </div>

          {paymentMethod === 'card' && (
            <>
              <div className="form-group">
                <label htmlFor="card-number">Card Number</label>
                <input type="text" id="card-number" name="card-number" required />
              </div>
              <div className="form-group">
                <label htmlFor="expiry-date">Expiry Date</label>
                <input type="text" id="expiry-date" name="expiry-date" required />
              </div>
              <div className="form-group">
                <label htmlFor="cvv">CVV</label>
                <input type="text" id="cvv" name="cvv" required />
              </div>
              <div className="form-group">
                <label htmlFor="card-name">Name on Card</label>
                <input type="text" id="card-name" name="card-name" required />
              </div>
            </>
          )}

          {paymentMethod === 'upi' && (
            <div className="form-group">
              <label htmlFor="upi-id">UPI ID</label>
              <input type="text" id="upi-id" name="upi-id" required />
            </div>
          )}

          {paymentMethod === 'cod' && (
            <p>Cash on delivery is selected. You will pay when the item is delivered.</p>
          )}

          <button type="submit" className="payment-button">Pay Now</button>
        </form>
      </div>
    </div>
  );
}

export default Payment;