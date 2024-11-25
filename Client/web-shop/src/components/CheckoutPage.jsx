import React, { useState, useEffect } from 'react';
import './styles/CheckoutPage.css';
import PaymentSummary from './PaymentSummary';
import CheckoutProduct from './CheckoutProduct';

const CheckoutPage = () => {
  const [selectedShipping, setSelectedShipping] = useState('free');
  const [estimatedDeliveryDate, setEstimatedDeliveryDate] = useState('');

  useEffect(() => {
    calculateAndSetDeliveryDate(selectedShipping);
    window.scrollTo(0, 0);
  }, []);

  const calculateAndSetDeliveryDate = (shippingMethod) => {
    const today = new Date();
    let deliveryDate;

    if (shippingMethod === 'free') {
      deliveryDate = new Date(today.setDate(today.getDate() + 4));
    } else {
      deliveryDate = new Date(today.setDate(today.getDate() + 2));
    }

    setEstimatedDeliveryDate(deliveryDate.toLocaleDateString('en-us', {
      weekday: "long",
      month: "short",
      day: "numeric"
    }));
  };

  const handleShippingChange = (event) => {
    const newShippingMethod = event.target.value;
    setSelectedShipping(newShippingMethod);
    calculateAndSetDeliveryDate(newShippingMethod);
  };

  return (
    <section>
      <div className="section-content">
        <div className="list-div">
          <div className="item-div">
            <div className="title-div">
              <h1 className="delivery-title bold">Estimated delivery: </h1>
              <h1 className="delivery-title bold">{estimatedDeliveryDate}</h1>
            </div>
          </div>
          <div className="items">
            <CheckoutProduct />
          </div>
        </div>

        <div className="sticky-container">
          <div className="order-summary-div">
            <h1 className="delivery-options-title bold">Order summary</h1>
            <div className="js-payment-summary"></div>
            <div className="delivery-options">
              <div>
                <PaymentSummary
                  onShippingChange={handleShippingChange}
                  setEstimatedDeliveryDate={setEstimatedDeliveryDate}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;
