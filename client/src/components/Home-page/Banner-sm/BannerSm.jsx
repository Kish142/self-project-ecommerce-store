import React from 'react';

import './BannerSm.styles.scss';

import Banner_1 from '../../../images/34_banner6.jpg';
import Banner_2 from '../../../images/banner-4.jpg';

const BannerSm = () => {
  return (
    <section className='banner-sm'>
      <div className='banner-sm-wrapper'>
        <div className='banner banner-1'>
          <figure className='img'>
            <img src={Banner_1} alt='' />
          </figure>
          <div className='content'>
            <h4 className='sub-heading'>Top Products</h4>
            <h1 className='heading'>Suitable Tshits & Hoodies</h1>
            <button className='cta'>Shop Now</button>
          </div>
        </div>

        <div className='banner banner-2'>
          <figure className='img'>
            <img src={Banner_2} alt='' />
          </figure>
          <div className='content'>
            <h4 className='sub-heading'>New Arrivals</h4>
            <h1 className='heading'>Seasonal Training Shoes</h1>
            <button className='cta'>Shop Now</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerSm;
