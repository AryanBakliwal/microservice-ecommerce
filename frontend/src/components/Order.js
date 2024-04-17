// OrderComponent.js
import React from 'react';

const OrderComponent = ({ order }) => {
  return (
    <div>
      <h2>Order ID: {order._id.$oid}</h2>
      <p>Date: {order.date}</p>
      <p>Total: ${order.total}</p>
      <ul>
        {order.items.map(item => (
          <li key={item._id.$oid}>{item.name} - ${item.price}</li>
        ))}
      </ul>
    </div>
  );
};

export default OrderComponent;
