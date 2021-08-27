import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import './ProductPage.styles.scss';

import ProductDesc from '../../components/Product-page/Product-desc/ProductDesc';
import ProductDetails from '../../components/Product-page/Product-details/ProductDetails';
import Reviews from '../../components/Product-page/Reviews/Reviews';
import UserReviews from '../../components/Product-page/User-reviews/UserReviews';
import ProductSlider from '../../components/Home-page/Product-slider/ProductSlider';
import LoadingSpinner from '../../components/Loading-spinner/LoadingSpinner';

import { useHttpClient } from '../../custom-hook/httpclient';

const ProductPage = () => {
  const [loading, setLoading] = useState(true);

  const { isLoading, error, sendRequest } = useHttpClient();

  const [responseData, setResponseData] = useState();

  const { id } = useParams();

  useEffect(() => {
    const fetchRequest = async () => {
      const response = await sendRequest(`product/${id}`, 'get');

      response && setResponseData(response);
      response && window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    fetchRequest();
  }, [sendRequest, id]);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className='product-page'>
      {error && <p>{error}</p>}
      {(loading || isLoading) && <LoadingSpinner />}
      {responseData && (
        <>
          <ProductDetails
            product={responseData.product}
            // productImg={responseData.product.image}
            // name={responseData.product.name}
            // price={responseData.product.price}
            // smallDesc={responseData.product.smallDesc}
          />
          <ProductDesc desc={responseData.product.description} />
          <div className='review-section'>
            <h1 className='title'>Reviews</h1>
            <div className='review-rating'>
              <Reviews />
              <UserReviews />
            </div>
          </div>
        </>
      )}
      <ProductSlider title={'Recommended Products'} row={'1'} />
    </div>
  );
};

export default ProductPage;
