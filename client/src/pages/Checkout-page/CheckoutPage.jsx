import React, { useEffect } from 'react';
import BillingDetails from '../../components/Checkout-page/Billing-details/BillingDetails';
import OrderSummary from '../../components/Checkout-page/Order-summary/OrderSummary';

import './CheckoutPage.styles.scss';

import LoadingSpinner from '../../components/Loading-spinner/LoadingSpinner';


const CheckoutPage = () => {
  
  useEffect(() => {
    <LoadingSpinner />;

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className='checkout-page'>
      <h1 className='page-title'>Checkout Page</h1>
      <div className='billing-order-summary'>
        <BillingDetails />
        <OrderSummary />
      </div>
    </div>
  );
};

export default CheckoutPage;
