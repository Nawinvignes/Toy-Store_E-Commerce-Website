import React, { useState, useEffect } from 'react';
import './MyOrders.css';

function MyOrders({ userId }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:8080/orders/user/${userId}`)
        .then(response => response.json())
        .then(data => setOrders(data))
        .catch(error => console.error('Error fetching orders:', error));
    }
  }, [userId]);

  return (
    <div className="orders">
      <h3>Your Orders</h3>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order.orderId} className="order-item">
            <h4>Order ID: {order.orderId}</h4>
            <p>Toy Name: {order.toyName}</p>
            <p>Price: ${order.price}</p>
            <p>Quantity: {order.quantity}</p>
          </div>
        ))
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
}

export default MyOrders;