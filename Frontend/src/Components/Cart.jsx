import React from 'react';

function Cart({ cart }) {
  return (
    <div className="cart-content">
      <h3>Your Cart</h3>
      {cart.length > 0 ? (
        cart.map((item, index) => (
          <div key={index} className="cart-item">
            <img src={item.img} alt={item.title} />
            <div>
              <h4>{item.title}</h4>
              <p>${item.price}</p>
            </div>
          </div>
        ))
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
}

export default Cart;
