import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Image, Transformation } from 'cloudinary-react';

import './CartToggle.styles.scss';

import { GrFormClose } from 'react-icons/gr';

import { selectCartItems } from '../../../redux/cart/cart.selector';
import { selectCartTotal } from '../../../redux/cart/cart.selector';

import { clearItemFromCart } from '../../../redux/cart/cart.action';

const CartToggle = ({
  toggle,
  updateToggle,
  cartItems,
  cartTotal,
  closeCartItem,
}) => {
  return (
    <div style={{ display: toggle ? 'block' : 'none' }} className='cart-toggle'>
      <div className='title'>
        <h3>Cart Items</h3>
      </div>
      {!!cartItems && (
        <div className='cart-toggle-wrap'>
          {!!cartItems === true &&
            cartItems.map((item) => (
              <div key={item._id} className='cart-items'>
                <div className='item flex flex-ai-c flex-jc-sb'>
                  <div className='name-qty-price'>
                    <Link
                      to={(location) => {
                        // window.scrollTo({ top: 0, behavior: 'smooth' });

                        if (location.pathname.startsWith('/product/')) {
                          return `${item._id}`;
                        } else {
                          return `product/${item._id}`;
                        }
                      }}>
                      <p onClick={() => updateToggle(false)} className='name'>
                        {item.name}
                      </p>
                    </Link>
                    <div className='qty-price flex flex-ai-c'>
                      <div className='qty'>
                        <p>{item.quantity}</p>
                      </div>
                      <span className='flex flex-ai-c flex-jc-c'>&#10006;</span>
                      <div className='price'>
                        <p>Rs, {item.price}</p>
                      </div>
                    </div>
                  </div>
                  <div className='item-img'>
                    <Link
                      to={(location) => {
                        // window.scrollTo({ top: 0, behavior: 'smooth' });

                        if (location.pathname.startsWith('/product/')) {
                          return `${item._id}`;
                        } else {
                          return `product/${item._id}`;
                        }
                      }}>
                      <figure onClick={() => updateToggle(false)}>
                        <Image
                          cloudName='self-project'
                          publicId={item.image[0]}
                          secure='true'>
                          <Transformation width='679' height='707' crop='pad' />
                        </Image>
                      </figure>
                    </Link>
                    <div
                      onClick={() => closeCartItem(item)}
                      className='close-item'>
                      <GrFormClose />
                    </div>
                  </div>
                </div>
              </div>
            ))}

          {cartItems.length > 0 && (
            <>
              <div className='cart-total flex flex-ai-c'>
                <div className='heading'>
                  <p>Total -</p>
                </div>
                <div className='total'>
                  <p>
                    Rs. <span>{cartTotal}</span>
                  </p>
                </div>
              </div>

              <div className='cart-checkout'>
                <Link to='/cart'>
                  <button onClick={updateToggle} className='cart'>
                    View Cart
                  </button>
                </Link>
                <Link to='/checkout'>
                  <button onClick={updateToggle} className='checkout'>
                    Checkout
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      )}

      {!cartItems.length && (
        <div className='empty-cart-display'>
          <h2 className='empty-cart-msg'>No Items In Your Cart</h2>
          <Link to='/shop-page'>
            <button onClick={updateToggle} className='shop-btn'>
              Shop Now
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  cartItems: selectCartItems(state),
  cartTotal: selectCartTotal(state),
});

const mapDispatchToProps = (dispatch) => ({
  closeCartItem: (item) => dispatch(clearItemFromCart(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartToggle);
