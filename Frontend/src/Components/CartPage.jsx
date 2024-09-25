import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CartPage.css';

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  console.log(userId);

  useEffect(() => {
    // Fetch the cart items from the backend
    axios.get(`http://localhost:8080/api/carts/user/${userId}`) // Replace with actual user ID
      .then(response => {
        const itemsWithDefaultQuantity = response.data.map(item => ({
          ...item,
          quantity: item.quantity || 1
        }));
        setCartItems(itemsWithDefaultQuantity);
      })
      .catch(error => {
        console.error('Error fetching cart items:', error);
      });
  }, [userId]);

  const handleRemoveFromCart = (id) => {
    axios.delete(`http://localhost:8080/api/carts/${id}`)
      .then(() => {
        setCartItems(cartItems.filter(item => item.id !== id));
      })
      .catch(error => {
        console.error('Error removing item from cart:', error);
      });
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prevCartItems =>
      prevCartItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );

    const updatedCartItem = cartItems.find(item => item.id === id);
    updatedCartItem.quantity = newQuantity;

    // axios.put(`http://localhost:8080/api/carts/${id}`, updatedCartItem)
    //   .then(response => {
    //     setCartItems(cartItems.map(item =>
    //       item.id === id ? response.data : item
    //     ));
    //   })
    //   .catch(error => {
    //     console.error('Error updating cart item:', error);
    //   });
  };

  const proceedToCheckout = () => {
    localStorage.setItem("totalPrice", calculateTotalPrice())
    navigate('/payment');
  };
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
        const price = parseFloat(item.price) || 0;
        const quantity = parseInt(item.quantity) || 1;
        return total + price * quantity;
    }, 0).toFixed(2);
};

  return (
    <div className="cart">
      <h2>Your Cart ({cartItems.length} items)</h2>
      {cartItems.length > 0 ? (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={`/images/${item.img}`} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>${item.price}</p>
                <div className="cart-item-actions">
                  <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                  <div className="quantity-selector">
                    <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
                    <span>{parseInt(item.quantity)}</span>
                    <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="cart-summary">
            <h4>Price Details</h4>
            <div className="price-row">
              <span>Price ({cartItems.length} items)</span>
              <span>${calculateTotalPrice()}</span>
            </div>
            <div className="price-row">
              <span>Delivery Charges</span>
              <span>Free</span>
            </div>
            <div className="price-row total">
              <span>Total Amount</span>
              <span>${calculateTotalPrice()}</span>
            </div>
            <button className="checkout-button" onClick={proceedToCheckout}>Proceed to Checkout</button>
          </div>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
}

export default CartPage;

