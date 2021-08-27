import React, { useEffect, useState } from 'react';
import BannerLg from '../../components/Home-page/Banner-lg/BannerLg';
import BannerSm from '../../components/Home-page/Banner-sm/BannerSm';

import Hero from '../../components/Home-page/Hero-section/Hero';
import ProductSlider from '../../components/Home-page/Product-slider/ProductSlider';
import SiteBadge from '../../components/Home-page/Site-badge/SiteBadge';
import LoadingSpinner from '../../components/Loading-spinner/LoadingSpinner';

import './HomePage.styles.scss';

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <div className='home-page'>
      {isLoading && <LoadingSpinner />}
      <Hero />
      <SiteBadge />
      <ProductSlider title={'Top Deals'} row={'2'} />
      <BannerLg />
      <ProductSlider title={'Featured Products'} row={'1'} />
      <BannerSm />
    </div>
  );
};

export default HomePage;
