import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './CartTotal.styles.scss';

import { selectCartTotal } from '../../../redux/cart/cart.selector';

const CartTotal = ({ cartTotal }) => {
  return (
    <section className='cart-total'>
      <div className='cart-total-wrapper'>
        <h3 className='heading'>Cart Totals</h3>
        <div className='sub-total flex flex-ai-c flex-jc-sb'>
          <h3>Subtotal</h3>
          <p>Rs, {!!cartTotal ? cartTotal : '0'}</p>
        </div>

        <form action=''>
          <div className='shipping'>
            <h3 className='title'>Calculate Shipping</h3>

            <input type='radio' id='rate-1' name='shipping' />
            <label htmlFor='rate-1'>
              <span>Flat rate</span>
            </label>
            <br />
            <input type='radio' id='rate-2' name='shipping' />
            <label htmlFor='rate-2'>
              <span>Free shipping</span>
            </label>
            <br />
            <input type='radio' id='rate-3' name='shipping' />
            <label htmlFor='rate-3'>
              <span>Local pickup</span>
            </label>
            <br />
          </div>

          <div className='form-input'>
            <select className='country'>
              <option value=''>United State (US)</option>
              <option value=''>India (IN)</option>
              <option value=''>New Zealand (NZ)</option>
              <option value=''>Australia (AU)</option>
              <option value=''>Singapore (SN)</option>
              <option value=''>United Kingdom (UK)</option>
            </select>

            <select className='state'>
              <option value=''>California</option>
              <option value=''>Manchester</option>
              <option value=''>New York</option>
              <option value=''>Washington DC</option>
              <option value=''>Salem</option>
            </select>

            <input type='text' placeholder='City' />
            <input type='text' placeholder='Postcode / ZIP' />
          </div>
        </form>
        <div className='total flex flex-ai-c flex-jc-sb'>
          <h3>Total</h3>
          <p>Rs, {!!cartTotal ? cartTotal : '0'}</p>
        </div>

        <Link to='/checkout'>
          <button
            disabled={cartTotal > '1' ? false : true}
            style={{ opacity: cartTotal > '1' ? '1' : '0.6' }}
            className='checkout'>
            Proceed To Checkout
          </button>
        </Link>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  cartTotal: selectCartTotal(state),
});

export default connect(mapStateToProps)(CartTotal);
