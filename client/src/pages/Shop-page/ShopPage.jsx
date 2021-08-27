import React, { useEffect } from 'react';

import './ShopPage.styles.scss';

import Filter from '../../components/Shop-page/Filter/Filter';
import ProductList from '../../components/Shop-page/Product-list/ProductList';
import { ToggleProvider } from '../../components/Shop-page/ToggleContext/ToggleContext';
import Toolbar from '../../components/Shop-page/Toolbar/Toolbar';

import LoadingSpinner from '../../components/Loading-spinner/LoadingSpinner';

const ShopPage = () => {
  useEffect(() => {
    <LoadingSpinner />;
  }, []);

  return (
    <div className='shop-page'>
      <ToggleProvider>
        <Toolbar />
        <div className='filter-product-list flex'>
          <Filter />
          <ProductList />
        </div>
      </ToggleProvider>
    </div>
  );
};

export default ShopPage;
