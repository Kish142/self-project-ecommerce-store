import React from 'react';

import './style.scss';

import FooterTop from './Footer-top/FooterTop';
import FooterBottom from './Footer-bottom/FooterBottom';
import FooterMiddle from './Footer-middle/FooterMiddle';

const Index = () => {
  return (
    <section className='footer'>
      <footer>
        <div className='footer-wrapper'>
          <FooterTop />
          <FooterMiddle />
          <FooterBottom />
        </div>
      </footer>
    </section>
  );
};

export default Index;
