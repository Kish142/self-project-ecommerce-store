import React from 'react';
import { Link } from 'react-router-dom';

import './Hero.styles.scss';

import HeroImg from '../../../images/asf32rawf234324af.png';

const Hero = () => {
  return (
    <section className='hero-section'>
      <div className='hero-section-wrap flex'>
        <div className='content'>
          <div className='sub-heading'>
            <p>Productive Design</p>
          </div>
          <div className='heading'>
            <h1>
              Grab your <span>Summer sale</span> on this month
            </h1>
          </div>
          <button className='cta'>
            <Link to='/shop-page'>Discover More</Link>
          </button>
        </div>
        <div className='hero-img'>
          <figure>
            <img src={HeroImg} alt='' />
          </figure>
        </div>
      </div>
    </section>
  );
};

export default Hero;
