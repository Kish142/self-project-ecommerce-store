import React from 'react';

import Banner_1 from '../../../images/6-1.jpg';
import Banner_2 from '../../../images/sh-2.jpg';

import './BannerLg.styles.scss';

const BannerLg = () => {
  return (
    <section className='banner-lg'>
      <div className='banner-lg-wrapper'>
        <div className='banner'>
          <figure className='img'>
            <img src={Banner_1} alt='' />
          </figure>
          <div className='content banner-1'>
            <h1 className='heading'>
              Background Image New Arrivals HD8 for Education
            </h1>
            <p className='text'>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Voluptatum, aut.
            </p>
            <button className='cta'>Shop Now</button>
          </div>
        </div>

        <div className='banner'>
          <figure className='img'>
            <img src={Banner_2} alt='' />
          </figure>
          <div className='content banner-2'>
            <h1 className='heading'>
              Background Image Don’t Miss Get Our Special Offer
            </h1>
            <p className='text'>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Voluptatum, aut.
            </p>
            <button className='cta'>Shop Now</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerLg;
