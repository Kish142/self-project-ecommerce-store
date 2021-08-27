import React, { useRef } from 'react';
import { Image, Transformation } from 'cloudinary-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { AiFillStar } from 'react-icons/ai';
import { AiOutlineStar } from 'react-icons/ai';
import { BsArrowRightShort } from 'react-icons/bs';
import { BsArrowLeftShort } from 'react-icons/bs';
import { FiShoppingBag } from 'react-icons/fi';

import './ProductSlider.styles.scss';

import { addCartItem } from '../../../redux/cart/cart.action';
import { selectProductItems } from '../../../redux/product/product.selector';
import LoadingSpinner from '../../Loading-spinner/LoadingSpinner';

const ProductSlider = ({ title, row, addCart, productList }) => {
  const slider = useRef(null);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    initialSlide: 0,
    rows: row,
    className: 'react__slick__slider__parent',
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 10000,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className='product-slider'>
      <div className='user-message-cart'>
        <div className='user-message-wrapper'>
          <p>Product Added To Cart</p>
        </div>
      </div>
      <div className='product-slider-wrapper'>
        <div className='title'>
          <h2>{title}</h2>

          <div className='arrows'>
            <button
              onClick={() => {
                return slider?.current?.slickPrev();
              }}
              className='slick-arrow arrow-left'>
              <BsArrowLeftShort />
            </button>

            <button
              onClick={() => slider?.current?.slickNext()}
              className='slick-arrow arrow-right'>
              <BsArrowRightShort />
            </button>
          </div>
        </div>
        <div className='products'>
          <Slider ref={slider} {...settings}>
            {productList ? (
              productList.product.map((product) => (
                <div key={product._id} className='product-item'>
                  <div className='product-img-wrapper'>
                    <Link
                      to={(location) => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });

                        if (location.pathname.startsWith('/product/')) {
                          return `${product._id}`;
                        } else {
                          return `product/${product._id}`;
                        }
                      }}>
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
                        onClick={() => {
                          addCart(product);
                          document.querySelector(
                            '.user-message-cart'
                          ).style.display = 'block';

                          setTimeout(() => {
                            document.querySelector(
                              '.user-message-cart'
                            ).style.display = 'none';
                          }, 2000);
                        }}
                        className='hover-atc'>
                        <span>
                          <FiShoppingBag />
                        </span>
                        Add&nbsp;To&nbsp;Cart
                      </button>
                    </div>
                  </div>

                  <div className='content'>
                    <p className='vendor-name'>Vendor name</p>
                    <p className='product-name'>{product.name}</p>
                    <div className='reviews flex'>
                      <AiFillStar />
                      <AiFillStar />
                      <AiFillStar />
                      <AiFillStar />
                      <AiOutlineStar />
                    </div>
                    <div className='price flex flex-ai-c'>
                      <p className='old-price'>Rs, 4750</p>
                      <p className='new-price'>Rs, {product.price}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <LoadingSpinner />
            )}
          </Slider>
        </div>
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

export default connect(mapStatetoProps, mapDispatchToProps)(ProductSlider);
