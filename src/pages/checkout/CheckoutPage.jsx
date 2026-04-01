import axios from 'axios';
import { useState, useEffect } from 'react';
import { CheckoutHeader } from '../checkout/CheckoutHeader';
import '../checkout/CheckoutPage.css';
import { OrdersSummary } from './OrderSummery';
import {PaymentSummary} from './PaymentSummary';

export function CheckoutPage({ cart, loadCart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

 useEffect(() => {
  const fetchCheckoutData = async () => {
    const response = await axios.get(
      '/api/delivery-options?expand=estimatedDeliveryTime'
    );
    setDeliveryOptions(response.data);
  };

  fetchCheckoutData();
 }, []);

 useEffect(() => {
  const fetchPamyentSummary = async () => {
    const response = await axios.get('/api/payment-summary');
    setPaymentSummary(response.data);
  };

  fetchPamyentSummary();
 }, [cart]);

  const deleteCartItem = async (productdId) => {
    await axios.delete(`/api/cart-items/${productdId}`);
    await loadCart();
  };

  return (
    <>
      <title>Checkout</title>
      <CheckoutHeader />
      <link rel="icon" type="image/svg+xml" href="/cart-favicon.png" />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrdersSummary 
            cart={cart} 
            deliveryOptions={deliveryOptions}
            loadCart={loadCart}
            deleteCartItem={deleteCartItem}
          />
          
          <PaymentSummary 
            paymentSummary={paymentSummary}
            loadCart={loadCart}
          />
        </div>
      </div>
    </>
  );
}
