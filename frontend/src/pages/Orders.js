// OrdersPage.js
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from "../contexts/UserContext";

const Orders = () => {
    const [userInfo] = useContext(UserContext);
  const [orders, setOrders] = useState();
  const userID = userInfo?.id;

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    
    try {
      const response = await fetch('http://localhost:8000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userID })
      });
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  return (
    <div>
      <h1>Order Details</h1>
      {orders.map(order => (
        <div key={order._id}>
          <p>Order ID: {order._id}</p>
          <p>Customer ID: {order.customerID}</p>
          <p>Date: {new Date(order.date).toLocaleDateString()}</p>
          <p>Time: {new Date(Number(order.time)).toLocaleTimeString()}</p>
          <p>Total Items: {order.itemAmount}</p>
          <p>Total Price: ${order.total.toFixed(2)}</p>
          <h2>Items:</h2>
          <ul>
            {order.items.map(item => (
              <li key={item._id}>
                <p>Name: {item.name}</p>
                <p>Price: ${item.price.toFixed(2)}</p>
                <p>Quantity: {item.amount}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Orders;
