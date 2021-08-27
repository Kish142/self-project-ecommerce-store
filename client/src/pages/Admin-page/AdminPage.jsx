import React, { useState } from 'react';
import AddProduct from '../../components/Admin-page/Add-product/AddProduct';
import ProductList from '../../components/Admin-page/Product-list/ProductList';

import './AdminPage.styles.scss';

const AdminPage = () => {
  const [productListToggle, setProductListToggle] = useState(true);
  const [addProductToggle, setAddProductToggle] = useState(false);

  const toggleProductList = () => {
    setProductListToggle(!productListToggle);
    setAddProductToggle(!addProductToggle);
  };
  const toggleAddProduct = () => {
    setAddProductToggle(!addProductToggle);
    setProductListToggle(!productListToggle);
  };

  return (
    <div className='admin-page'>
      <div className='admin-page-wrapper'>
        <div className='heading flex flex-ai-c'>
          <button
            onClick={toggleProductList}
            style={{ opacity: productListToggle ? '1' : '0.4' }}
            className='products'>
            Product List
          </button>
          <button
            onClick={toggleAddProduct}
            style={{ opacity: addProductToggle ? '1' : '0.4' }}
            className='add-product'>
            Add Product
          </button>
        </div>
        <ProductList toggle={productListToggle} />
        <AddProduct toggle={addProductToggle} />
      </div>
    </div>
  );
};

export default AdminPage;
