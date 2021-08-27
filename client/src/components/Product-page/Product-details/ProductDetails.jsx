import React, { useState } from 'react';
import { Image, Transformation } from 'cloudinary-react';
import { connect } from 'react-redux';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { AiFillStar } from 'react-icons/ai';
import { AiOutlineStar } from 'react-icons/ai';
import { FiCheckCircle } from 'react-icons/fi';
import { GrGift } from 'react-icons/gr';
import { FiShoppingBag } from 'react-icons/fi';
import { addCartItem } from '../../../redux/cart/cart.action';

import './ProductDetails.styles.scss';

const ProductDetails = ({ product, addCart }) => {
  const { name, price, image, smallDesc } = product;

  const [qty, setQty] = useState(1);

  const qtyOnChange = (e) => {
    const { value } = e.target;
    setQty(value);
  };

  const increaseQty = () => {
    setQty(qty + 1);
  };

  const decreaseQty = () => {
    qty > 1 && setQty(qty - 1);
  };

  const settings = {
    customPaging: function (i) {
      return (
        <figure className='custom-thumb'>
          <Image cloudName='self-project' publicId={image[i]} secure='true'>
            <Transformation width='679' height='707' crop='pad' />
          </Image>
        </figure>
      );
    },
    dots: true,
    dotsClass: 'slick-dots slick-thumb',
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <section className='product-details'>
      <div className='product-details-wrapper'>
        <div className='product-img-col'>
          <div className='product-images'>
            <Slider {...settings}>
              {image.map((img, idx) => (
                <figure key={idx} className='img'>
                  <Image cloudName='self-project' publicId={img} secure='true'>
                    <Transformation width='679' height='707' crop='pad' />
                  </Image>
                </figure>
              ))}
            </Slider>
          </div>
        </div>

        <div className='product-info'>
          <h1 className='name'>{name}</h1>
          <p className='vendor-name'>
            Demo Products (None of the products are real)
          </p>
          <div className='star-rating'>
            <div className='ratings'>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p className='total-reviews'>3442 reviews</p>
          </div>
          <div className='price flex flex-ai-c'>
            <p className='new-price'>Rs, 2100</p>
            <p className='old-price'>Rs, {price}</p>
          </div>
          <div className='small-description'>{smallDesc}</div>

          <div className='badge'>
            <div className='badge-wrapper'>
              <ul>
                <li>
                  <span className='flex'>
                    <FiCheckCircle />
                  </span>
                  Free Shipping within 5 to 7 days
                </li>
                <li>
                  <span>
                    <FiCheckCircle />
                  </span>
                  Apply Coupone GET30 for 30%OFF
                </li>
                <li>
                  <span>
                    <FiCheckCircle />
                  </span>
                  Feel Free To Call Us Anytime About Any Quries
                </li>
                <li>
                  <span>
                    <FiCheckCircle />
                  </span>
                  Buy 2 Get 1 Free On Top Brands
                </li>
              </ul>
            </div>
            <div className='gift-icon'>
              <GrGift stroke={'#058f05'} />
            </div>
          </div>

          <div className='color'>
            <h3 className='title'>Color:</h3>
            <div className='color-box'>
              <div className='box light-gray'></div>
              <div className='box light-blue'></div>
            </div>
          </div>

          <div className='size'>
            <h3 className='title'>Size:</h3>
            <div className='size-box xl'>XL</div>
            <div className='size-box l'>L</div>
            <div className='size-box md'>MD</div>
            <div className='size-box sm'>SM</div>
          </div>

          <div className='qty-atc'>
            <div className='qty'>
              <button onClick={increaseQty} className='btn increase-qty'>
                +
              </button>
              <input
                style={{ fontSize: '17px', color: 'black' }}
                onChange={qtyOnChange}
                type='text'
                value={qty}
              />
              <button onClick={decreaseQty} className='btn decrease-qty'>
                -
              </button>
            </div>
            <button
              onClick={() => {
                addCart(product);
                document.querySelector('.user-message-cart').style.display =
                  'block';

                setTimeout(() => {
                  document.querySelector('.user-message-cart').style.display =
                    'none';
                }, 2000);
              }}
              className='atc'>
              <span>
                <FiShoppingBag />
              </span>
              Add&nbsp;To&nbsp;Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addCart: (item) => dispatch(addCartItem(item)),
});

export default connect(null, mapDispatchToProps)(ProductDetails);
