import React, { useState, useEffect } from 'react';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
import './styles/PaymentSummary.css';

const PaymentSummary = ({ setEstimatedDeliveryDate, taxRate = 0.1, onPlaceOrder }) => {
  const { cartItems } = useCart();
  const [selectedShipping, setSelectedShipping] = useState('free');
  const [deliveryDate, setDeliveryDate] = useState(null);

  const formatCurrency = (cents) => (cents / 100).toFixed(2);
  const { clearCart } = useCart();

  const productPriceCents = cartItems.reduce((total, item) => total + (item.priceCents * item.quantity), 0);

  const shippingCosts = {
    free: 0,
    paid: 400,
  };

  const shippingCost = shippingCosts[selectedShipping];

  const totalBeforeTaxCents = productPriceCents + shippingCost;
  const taxCents = totalBeforeTaxCents * taxRate;
  const totalCents = totalBeforeTaxCents + taxCents + shippingCost;
  const navigate = useNavigate();

  const handleShippingChange = (event) => {
    setSelectedShipping(event.target.value);
  };

  const getEstimatedDeliveryDate = () => {
    const today = new Date();
    let deliveryDate;

    if (selectedShipping === 'free') {
      deliveryDate = new Date(today.setDate(today.getDate() + 4));
    } else {
      deliveryDate = new Date(today.setDate(today.getDate() + 2));
    }

    return deliveryDate.toLocaleDateString('en-US', {
      weekday: "long",
      month: "short",
      day: "numeric"
    });
  };

  useEffect(() => {
    const date = getEstimatedDeliveryDate();
    setDeliveryDate(date);
    setEstimatedDeliveryDate(date);
  }, [selectedShipping, setEstimatedDeliveryDate]);

  const onPlaceOrderClick = async () => {
    try {
      const orderDetails = {
        products: cartItems.map(item => ({
          productId: item._id,
          name: item.name,
          priceCents: item.priceCents,
          description: item.description,
          category: item.category,
          image: item.image,
          quantity: item.quantity,
        })),
        totalOrderPrice: totalCents,
        deliveryDate,
      };
      console.log(typeof deliveryDate);
      console.log(orderDetails.productId);
      const response = await fetch('https://azurewebshop.onrender.com/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderDetails),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Order placed successfully!');
        clearCart();
        setSelectedShipping('free');
        navigate('/orders');
      } else {
        alert(data.message || 'Error placing order');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error placing order');
    }
  };

  const isCartEmpty = cartItems.length === 0;

  return (
    <div className="payment-summary">
      <div className="order-info">
        <div className="summary-text">Item(s)</div>
        <div className="num-size items-cost">${formatCurrency(productPriceCents)}</div>
      </div>

      <div className="order-info">
        <div className="summary-text">Shipping</div>
        <div className="num-size shipping-cost">${formatCurrency(shippingCost)}</div>
      </div>

      <div className="order-info">
        <div className="summary-text">Total before tax</div>
        <div className="num-size total-before-tax">${formatCurrency(totalBeforeTaxCents)}</div>
      </div>

      <div className="order-info">
        <div className="summary-text">Estimated Tax (10%)</div>
        <div className="num-size estimated-tax ">${formatCurrency(taxCents)}</div>
      </div>
      <div className="summary-text style">
        Choose a delivery option:
      </div>
      <div className="delivery-option" onClick={() => setSelectedShipping('free')}>
        <input
          type="radio"
          value="free"
          checked={selectedShipping === 'free'}
          onChange={handleShippingChange}
        />
        <div>
          <div className="delivery-option-date">Free Shipping</div>
          <div className="delivery-option-price">4 Days</div>
        </div>
      </div>
      <div className="delivery-option" onClick={() => setSelectedShipping('paid')}>
        <input
          type="radio"
          value="paid"
          checked={selectedShipping === 'paid'}
          onChange={handleShippingChange}
        />
        <div>
          <div className="delivery-option-date">$4.00 Shipping</div>
          <div className="delivery-option-price">2 days</div>
        </div>
      </div>

      <div className="div-total">
        <div className="delivery-options-title bold">Total:</div>
        <div className="total-price delivery-options-title bold">${formatCurrency(totalCents)}</div>
      </div>

      <button
        type="button"
        className={`place-order ${isCartEmpty ? 'disabled' : ''}`}
        data-total-p={totalCents}
        onClick={onPlaceOrderClick}
        disabled={isCartEmpty}
      >
        Place Order
      </button>
    </div>
  );
};

export default PaymentSummary;



