import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { TextField, TextArea } from '../../InputField/InputField';
import * as Yup from 'yup';

import DropZone from './Dropzone/DropZone';
import { useHttpClient } from '../../../custom-hook/httpclient';
import LoadingSpinner from '../../Loading-spinner/LoadingSpinner';

import './AddProduct.styles.scss';

const AddProduct = ({ toggle }) => {
  const validate = Yup.object({
    productName: Yup.string().required('Please add product name'),
    productPrice: Yup.number()
      .required('Please add product price')
      .positive('Price must be in positive')
      .integer(),
    oldPrice: Yup.number().positive('Price must be in positive').integer(),
    productCategory: Yup.string().required('Please add product category'),
    smallDesc: Yup.string().required(
      'Please add a small description about product'
    ),
    description: Yup.string().required('Please add a description'),
  });

  const [file, setFile] = useState([]);

  // eslint-disable-next-line no-unused-vars
  const [responseData, setResponseData] = useState();

  const [formError, setFormError] = useState();

  const { isLoading, sendRequest } = useHttpClient();

  useEffect(() => {
    if (file.length) return setFormError(null);
    return () => {
      setFormError(null);
    };
  }, [file]);

  const onSubmit = async (values, { resetForm }) => {
    if (!file.length) {
      return setFormError('Please add image(s)');
    }
    const {
      productName,
      productPrice,
      productCategory,
      smallDesc,
      description,
    } = values;

    const formdata = new FormData();
    formdata.append('name', productName);
    formdata.append('price', productPrice);
    formdata.append('oldPrice', productPrice);
    formdata.append('category', productCategory);
    formdata.append('smallDesc', smallDesc);
    formdata.append('description', description);

    file.forEach((file) => formdata.append('image', file));

    const config = { headers: { 'Content-Type': 'multipart/form-data' } };

    const response = await sendRequest('/product', 'post', formdata, config);

    response && setResponseData(response);

    if (response) {
      document.querySelector('.user-message-product').style.display = 'block';

      setTimeout(() => {
        document.querySelector('.user-message-product').style.display = 'none';
      }, 2000);

      resetForm();

      setFile([]);
    }
  };

  return (
    <section
      style={{
        display: toggle ? 'block' : 'none',
      }}
      className='add-product'>
      <div className='user-message-product'>
        <div className='user-message-wrapper'>
          <p>Product Added Successfully</p>
        </div>
      </div>
      {isLoading && <LoadingSpinner />}
      <Formik
        initialValues={{
          productName: '',
          productPrice: '',
          oldPrice: '',
          productCategory: 'jacket, casual, brand',
          smallDesc: `Well-designed shoulder cuts, almost invisible edges and super clean hems for a classy & crisp silhouette. Just like a bright star on a dark night, our edgy branding lends a subtle yet suave glow!`,
          description: `We at FREECULTR believe that comfort is subjective yet basic. We blend exclusive underclothing innovations with modern technology to amplify your experience.

          Just like you, at FREECULTR, we believe that variety is the spice of life. This mindset led to the creation of our distinctive trunks, briefs, vests & buffs. Every product we present is feather-light and the right fit.
          
          Our products come with maximum support, an airy fit yet basic coverage. Our products are crafted for the modern man who likes to stay relaxed all day long, without worrying.
          
          Being all-natural and silky soft in nature, this fabric is just the right amount of soft to keep your body parts in comfort.`,
        }}
        validationSchema={validate}
        onSubmit={onSubmit}>
        {(formik) => (
          <Form>
            <TextField label='Product Name' name='productName' type='text' />
            <TextField label='Previous Price' name='oldPrice' type='number' />
            <TextField
              label='Product Price'
              name='productPrice'
              type='number'
            />
            <TextField
              label='Product Category'
              name='productCategory'
              type='text'
            />
            <TextArea label='Small Description' name='smallDesc' />
            <TextArea label='Description' name='description' />
            <DropZone error={formError} files={file} setFiles={setFile} />
            <button className='product-submit-btn' type='submit'>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default AddProduct;
