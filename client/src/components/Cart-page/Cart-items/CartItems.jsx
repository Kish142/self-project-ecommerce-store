import React from 'react';
import { connect } from 'react-redux';
import { Image, Transformation } from 'cloudinary-react';

import './CartItems.styles.scss';

import { AiFillStar } from 'react-icons/ai';
import { GrFormClose } from 'react-icons/gr';

  import {
  addCartItem,
  removeCartItem,
  clearItemFromCart,
} from '../../../redux/cart/cart.action';

import { selectCartItems } from '../../../redux/cart/cart.selector';

const CartItems = ({ addCart, removeCart, closeCartItem, cartItems }) => {
  return (
    <section className='cart-items'>
      <div className='cart-items-wrapper'>
        <div className='mobile-view-cart'>
          {cartItems &&
            cartItems.map((item) => (
              <div key={item._id} className='cart-items-list flex '>
                <div className='name-price-rating-qty'>
                  <h3 className='name'>{item.name}</h3>
                  <div className='rating flex'>
                    <button className='flex flex-ai-c'>
                      4.1
                      <span
                        onClick={() => closeCartItem(item)}
                        className='flex flex-ai-c'>
                        <AiFillStar />
                      </span>
                    </button>
                    <p className='total-ratings'>(4,322)</p>
                  </div>
                  <div className='price flex flex-ai-c'>
                    <p className='new-price'>Rs, {item.price}</p>
                    <div className='old-price'>Rs, 4200</div>
                  </div>
                  <div className='qty'>
                    <button
                      onClick={() => {
                        addCart(item);
                      }}
                      className='btn increase-qty'>
                      +
                    </button>
                    <input
                      type='text'
                      onChange={() => !!item.quantity && item.quantity}
                      value={!!item.quantity ? item.quantity : '1'}
                    />
                    <button
                      onClick={() => {
                        removeCart(item);
                      }}
                      className='btn decrease-qty'>
                      -
                    </button>
                  </div>
                </div>
                <div className='product-img'>
                  <figure className='img'>
                    <Image
                      cloudName='self-project'
                      publicId={item.image[0]}
                      secure='true'>
                      <Transformation width='679' height='707' crop='pad' />
                    </Image>
                    <div onClick={() => closeCartItem(item)} className='close-item'>
                      <GrFormClose />
                    </div>
                  </figure>
                </div>
              </div>
            ))}
        </div>

        <div className='desktop-view-cart'>
          <div className='cart-items'>
            <table>
              <thead>
                <tr>
                  <th className='product'>
                    <h3>Product</h3>
                  </th>
                  <th className='product-name'></th>
                  <th className='product-price'>
                    <h3>Price</h3>
                  </th>
                  <th className='product-qty'>
                    <h3>Quanity</h3>
                  </th>
                  <th className='subtotal'>
                    <h3>Subtotal</h3>
                  </th>
                  <th className='close-cart-item'></th>
                </tr>
              </thead>
              <tbody>
                {cartItems &&
                  cartItems.map((item) => (
                    <tr key={item._id}>
                      <td className='product-img'>
                        <figure className='img'>
                          <Image
                            cloudName='self-project'
                            publicId={item.image[0]}
                            secure='true'>
                            <Transformation
                              width='679'
                              height='707'
                              crop='pad'
                            />
                          </Image>
                        </figure>
                      </td>
                      <td className='name'>{item.name}</td>
                      <td className='price'>Rs, {item.price}</td>
                      <td className='quantity'>
                        <div className='qty'>
                          <button
                            onClick={() => {
                              addCart(item);
                            }}
                            className='btn increase-qty'>
                            +
                          </button>
                          <input
                            type='text'
                            onChange={() => !!item.quantity && item.quantity}
                            value={!!item.quantity ? item.quantity : '1'}
                          />
                          <button
                            onClick={() => {
                              removeCart(item);
                            }}
                            className='btn decrease-qty'>
                            -
                          </button>
                        </div>
                      </td>
                      <td className='subtotal'>Subtotal</td>
                      <td className='clear-item-icon'>
                        <div
                          onClick={() => closeCartItem(item)}
                          className='close-icon'>
                          <GrFormClose />
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  cartItems: selectCartItems(state),
});

const mapDispatchToProps = (dispatch) => ({
  addCart: (item) => dispatch(addCartItem(item)),
  removeCart: (item) => dispatch(removeCartItem(item)),
  closeCartItem: (item) => dispatch(clearItemFromCart(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartItems);
