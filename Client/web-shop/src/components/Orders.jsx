import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5001/orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="main">
      <h1 className="page-title">Your Orders</h1>
      <div className="orders-grid">
        {orders.map((order, index) => (
          <div className="order-container" key={index}>
            <div className="order-header">
              <div className="order-header-left-section">
                <div className="order-date">
                  <div className="order-header-label">Delivery Date:</div>
                  <div className="">{order.deliveryDate}</div>
                </div>
                <div className="order-total">
                  <div className="order-header-label">Total:</div>
                  <div className="total-order">${(order.totalOrderPrice / 100).toFixed(2)}</div>
                </div>
              </div>
              <div className="order-header-right-section">
                <div className="order-header-label">Order ID:</div>
                <div className="">{order._id}</div>
              </div>
            </div>
            <div className="order-details-grid">
              {order.products.map((product, productIndex) => (
                <div className="product-item" key={productIndex}>
                  <div className="product-image-container">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="product-details">
                          <h1 className="product-name">{product.name}</h1>
                          <div className='description'>{product.description}</div>
                    <div className="product-quantity">Quantity: {product.quantity}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
