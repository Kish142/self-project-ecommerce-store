import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './SiteBadge.styles.scss';

import { FaPeopleCarry } from 'react-icons/fa';
import { FiPhoneCall } from 'react-icons/fi';
import { GiTakeMyMoney } from 'react-icons/gi';
import { ImPriceTags } from 'react-icons/im';

const SiteBadge = () => {
  const settings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '60px',
    slidesToShow: 1,
    speed: 500,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          infinite: false,
          centerMode: false,
        },
      },
      {
        breakpoint: 10000,
        settings: {
          slidesToShow: 4,
          infinite: false,
          centerMode: false,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 10000, // a unrealistically big number to cover up greatest screen resolution
        settings: 'unslick',
      },
    ],
  };

  return (
    <section className='badge-section'>
      <div style={{ margin: '-1.5rem auto 0 auto' }} className='badge-wrap '>
        <Slider {...settings}>
          <div className='badge-item'>
            <div className='icon'>
              <FaPeopleCarry fill={'#1A4895'} />
            </div>
            <div className='content'>
              <h4 className='title'>Free Shipping & Return</h4>
              <p className='text'>
                Get free delivery of your orders all over the world.
              </p>
            </div>
          </div>

          <div className='badge-item'>
            <div className='icon'>
              <FiPhoneCall stroke={'#1A4895'} />
            </div>
            <div className='content'>
              <h4 className='title'>Customer Care & Support</h4>
              <p className='text'>
                Get free delivery of your orders all over the world.
              </p>
            </div>
          </div>

          <div className='badge-item'>
            <div className='icon'>
              <GiTakeMyMoney fill={'#1A4895'} />
            </div>
            <div className='content'>
              <h4 className='title'>Moneyback Guarantee</h4>
              <p className='text'>
                Get free delivery of your orders all over the world.
              </p>
            </div>
          </div>

          <div className='badge-item'>
            <div className='icon'>
              <ImPriceTags fill={'#1A4895'} />
            </div>
            <div className='content'>
              <h4 className='title'>20% Off Your first Order</h4>
              <p className='text'>
                Get free delivery of your orders all over the world.
              </p>
            </div>
          </div>
        </Slider>
      </div>
    </section>
  );
};

export default SiteBadge;
