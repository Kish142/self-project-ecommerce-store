import React, { useEffect } from 'react';

import CartItems from '../../components/Cart-page/Cart-items/CartItems';
import CartTotal from '../../components/Cart-page/Cart-total/CartTotal';

import LoadingSpinner from '../../components/Loading-spinner/LoadingSpinner';

import './CartPage.styles.scss';

const CartPage = () => {
  useEffect(() => {
    <LoadingSpinner />;
  }, []);

  return (
    <div className='cart-page'>
      <h1 className='page-title'>Cart Items</h1>

      <div className='cart-items-total'>
        <CartItems />
        <CartTotal />
      </div>
    </div>
  );
};

export default CartPage;
