import React from 'react';
import { Image, Transformation } from 'cloudinary-react';
import { Link } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';
import { AiOutlineStar } from 'react-icons/ai';
import { FiShoppingBag } from 'react-icons/fi';

import './ProductList.styles.scss';

import { addCartItem } from '../../../redux/cart/cart.action';
import { connect } from 'react-redux';
import { selectProductItems } from '../../../redux/product/product.selector';

const ProductList = ({ addCart, productList }) => {
  const atc = (product) => {
    addCart(product);

    const userMessage = document.querySelector('.user-message-cart');

    if (userMessage) {
      userMessage.style.display = 'block';
    }

    setTimeout(() => {
      if (userMessage) {
        userMessage.style.display = 'none';
      }
    }, 2000);
  };

  return (
    <section className='product-list'>
      <div className='user-message-cart'>
        <div className='user-message-wrapper'>
          <p>Product Added To Cart</p>
        </div>
      </div>
      <div className='product-wrapper'>
        {productList &&
          productList.product.map((product) => (
            <div key={product._id} className='product'>
              <div className='product-img-wrapper'>
                <Link to={`/product/${product._id}`}>
                  <figure className='product-img'>
                    <Image
                      cloudName='self-project'
                      publicId={product.image[0]}
                      secure='true'>
                      <Transformation width='679' height='707' crop='pad' />
                    </Image>
                  </figure>
                </Link>
                <div className='hover-btn-atc'>
                  <button
                    onClick={
                      () => atc(product)
                      //   {
                      //   addCart(product);
                      //   document.querySelector(
                      //     '.user-message-cart'
                      //   ).style.display = 'block';

                      //   setTimeout(() => {
                      //     document.querySelector(
                      //       '.user-message-cart'
                      //     ).style.display = 'none';
                      //   }, 2000);
                      // }
                    }
                    className='hover-atc'>
                    <span>
                      <FiShoppingBag />
                    </span>
                    Add&nbsp;To&nbsp;Cart
                  </button>
                </div>
              </div>
              <div className='content'>
                <p className='vendor-name'>Demo store</p>
                <p className='product-name'>{product.name}</p>
                <div className='reviews flex'>
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiOutlineStar />
                </div>
                <div className='price flex flex-ai-c'>
                  <p className='new-price'>Rs, {product.price}</p>
                  <p className='old-price'>Rs, 4750</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

const mapStatetoProps = (state) => ({
  productList: selectProductItems(state),
});

const mapDispatchToProps = (dispatch) => ({
  addCart: (item) => dispatch(addCartItem(item)),
});

export default connect(mapStatetoProps, mapDispatchToProps)(ProductList);
