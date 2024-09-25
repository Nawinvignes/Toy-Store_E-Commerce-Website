import React, { useEffect, useState } from 'react';
import './AdminOrders.css'; // Make sure to create and style this file accordingly
import axios from 'axios';

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5002/orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="admin-orders">
      <h1>Manage Orders</h1>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Status</th>
            <th>Customer Name</th>
            <th>Address</th>
            <th>Payment Method</th>
            <th>Order Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            order.cart.map(item => (
              <tr key={`${order.id}-${item.id}`}>
                <td>{order.id}</td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
                <td>{order.status || 'Processing'}</td>
                <td>{order.address.fullName}</td>
                <td>{`${order.address.streetAddress}, ${order.address.city}, ${order.address.state}, ${order.address.zipCode}, ${order.address.country}`}</td>
                <td>{order.paymentMethod}</td>
                <td>{new Date(order.date).toLocaleString()}</td>
              </tr>
            ))
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminOrders;
