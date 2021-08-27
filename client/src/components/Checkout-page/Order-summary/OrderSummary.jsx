import React from 'react';
import { connect } from 'react-redux';

import './OrderSummary.style.scss';

import {
  selectCartItems,
  selectCartTotal,
} from '../../../redux/cart/cart.selector';

const OrderSummary = ({ cartItems, cartTotal }) => {
  return (
    <section className='order-summary'>
      <div className='order-summary-wrapper'>
        <h3 className='heading'>Your Order</h3>
        <div className='product-name-price'>
          <h4 className='title'>Product</h4>
          {cartItems &&
            cartItems.map((product) => (
              <div className='product-details flex flex-ai-c flex-jc-sb'>
                <p className='product-name'>
                  {product.name}
                  <span>&#10006; {product.quantity}</span>
                </p>
                <p className='product-price'>Rs, {product.price}</p>
              </div>
            ))}
        </div>
        <div className='sub-total flex flex-ai-c flex-jc-sb'>
          <h3>Subtotal</h3>
          <p>Rs, 4550</p>
        </div>
        <form action=''>
          <div className='payment-method'>
            <h3 className='title'>Payment Methods</h3>

            <input type='radio' id='payment-1' name='shipping' />
            <label htmlFor='payment-1'>
              <span>Cash on delivery</span>
            </label>
            <br />
            <input type='radio' id='payment-2' name='shipping' />
            <label htmlFor='payment-2'>
              <span>Pay with UPI</span>
            </label>
            <br />
          </div>

          <div className='coupon-code'>
            <label htmlFor='coupon'>Have a Coupon?</label>
            <input
              type='text'
              id='coupon'
              placeholder='Enter Your Coupon Code'
            />
          </div>
          <div className='total flex flex-ai-c flex-jc-sb'>
            <h3>Total</h3>
            <p>Rs, {cartTotal}</p>
          </div>
          <button type='submit' className='place-order'>
            Place Order
          </button>
        </form>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  cartTotal: selectCartTotal(state),
  cartItems: selectCartItems(state),
});

export default connect(mapStateToProps)(OrderSummary);
