import React, { useEffect, useState } from 'react';
import DropZone from '../../Add-product/Dropzone/DropZone';
import { Formik, Form } from 'formik';
import { TextField, TextArea } from '../../../InputField/InputField';
import * as Yup from 'yup';
import { Image, Transformation } from 'cloudinary-react';

import { useHttpClient } from '../../../../custom-hook/httpclient';
import LoadingSpinner from '../../../Loading-spinner/LoadingSpinner';

import './EditProduct.styles.scss';

const EditProduct = ({
  edit,
  setEdit,
  editProduct,
  setEditProduct,
  setReload,
  reload,
}) => {
  const [file, setFile] = useState([]);

  const [product, setProduct] = useState();
  const [productImg, setProductImg] = useState();
  const [rmImg, setRmImg] = useState([]);

  // remove selected image
  const removeImage = (image) => {
    setProductImg((oldState) => oldState.filter((img) => img !== image));
  };

  const { isLoading, sendRequest } = useHttpClient();

  const onSubmit = async (values) => {
    let data = values;

    const product_id = editProduct._id;

    // update product regards to client request

    // Delete / update and add product image
    if (rmImg.length && file.length) {
      const { name, price, oldPrice, category, smallDesc, description } =
        values;
      const formdata = new FormData();
      formdata.append('name', name);
      formdata.append('price', price);
      formdata.append('oldPrice', oldPrice);
      formdata.append('category', category);
      formdata.append('smallDesc', smallDesc);
      formdata.append('description', description);
      formdata.append('public_id', rmImg);

      // rmImg.forEach((img) => formdata.append('public_id', img));
      rmImg.forEach((img) => console.log(img));

      file.forEach((file) => formdata.append('image', file));

      const config = { headers: { 'Content-Type': 'multipart/form-data' } };

      const response = await sendRequest(
        `product/${product_id}`,
        'patch',
        formdata,
        config
      );

      if (response) {
        setEditProduct(response);
        setEdit(false);
        setFile([]);
        setReload(!reload);
      }
    }

    // Delete Image only
    else if (rmImg.length && !file.length) {
      data.public_id = rmImg;
      const response = await sendRequest(
        `product/${product_id}`,
        'PATCH',
        data
      );

      if (response) {
        setEditProduct(response);
        setEdit(false);
        setReload(!reload);
      }
    }

    // Add image only
    else if (file.length && !rmImg.length) {
      const { name, price, oldPrice, category, smallDesc, description } =
        values;

      const formdata = new FormData();
      formdata.append('name', name);
      formdata.append('price', price);
      formdata.append('oldPrice', oldPrice);
      formdata.append('category', category);
      formdata.append('smallDesc', smallDesc);
      formdata.append('description', description);

      file.forEach((file) => formdata.append('image', file));

      const config = { headers: { 'Content-Type': 'multipart/form-data' } };

      const response = await sendRequest(
        `product/${product_id}`,
        'patch',
        formdata,
        config
      );

      if (response) {
        setEditProduct(response);
        setEdit(false);
        setFile([]);
        setReload(!reload);
      }
    }

    // Update product details (only contains body)
    else {
      const response = await sendRequest(
        `product/${product_id}`,
        'PATCH',
        data
      );

      if (response) {
        setEditProduct(response);
        setEdit(false);
        setReload(!reload);
      }
    }
  };

  // scroll to top of modal content
  useEffect(() => {
    var maodal = document.querySelector('.edit-product-modal-wrapper');
    maodal.scrollTo({ top: 0, behavior: 'smooth' });

    edit
      ? document.body.style.setProperty('overflow', 'hidden', 'important')
      : document.body.style.setProperty('overflow', 'auto');
  }, [edit]);

  useEffect(() => {
    !edit && setRmImg([]);
  }, [edit]);

  // setState for image alone
  useEffect(() => {
    editProduct && setProductImg(editProduct.image);
    editProduct && setProduct(editProduct);
  }, [editProduct]);

  // reset Images
  const resetImage = () => {
    var maodal = document.querySelector('.edit-product-modal-wrapper');
    maodal.scrollTo({ top: 0, behavior: 'smooth' });

    if (rmImg.length) {
      setProductImg([...productImg, ...rmImg]);
      setRmImg([]);
    }
  };

  const validate = Yup.object({
    name: Yup.string().required('Please add product name'),
    price: Yup.number()
      .required('Please add product price')
      .positive('Price must be in positive')
      .integer(),
    oldPrice: Yup.number().positive('Price must be in positive').integer(),
    category: Yup.lazy((val) =>
      Array.isArray(val)
        ? Yup.array().of(Yup.string()).required('Please add product category')
        : Yup.string().required('Please add product category')
    ),
    smallDesc: Yup.string().required(
      'Please add a small description about product'
    ),
    description: Yup.string().required('Please add a description'),
  });

  return (
    <section
      style={{ display: edit ? 'block' : 'none' }}
      className='edit-product-modal'>
      {isLoading && <LoadingSpinner />}
      <div className='overlay-for-toggle'></div>
      <div className='edit-product-modal-wrapper'>
        {product && editProduct && (
          <Formik
            initialValues={{
              name: product.name || '',
              oldPrice: product.oldPrice || '',
              price: product.price || '',
              category: product.category || '',
              smallDesc: product.smallDesc || '',
              description: product.description || '',
            }}
            validationSchema={validate}
            enableReinitialize={true}
            onSubmit={onSubmit}>
            {(formik) => (
              <Form>
                <div className='col'>
                  <div className='product-image-list'>
                    <div className='product-image-label'>
                      <p>Product Image(s)</p>
                    </div>
                    <aside className='thumbsContainer'>
                      {productImg &&
                        productImg.map((img, idx) => (
                          <div className='thumb' key={idx}>
                            <div className='thumbInner'>
                              <Image
                                className='thumb-img'
                                cloudName='self-project'
                                publicId={img}
                                secure='true'>
                                <Transformation
                                  width='679'
                                  height='707'
                                  crop='pad'
                                />
                              </Image>
                            </div>
                            <span
                              onClick={() => {
                                setRmImg([...rmImg, img]);
                                removeImage(img);
                              }}
                              className='rmFile'>
                              &#10005;
                            </span>
                          </div>
                        ))}

                      {productImg && !productImg.length && (
                        <p className='error'>No Image - upload a image</p>
                      )}
                    </aside>
                  </div>
                </div>
                <div className='col'>
                  <div className='product-input product-name'>
                    <TextField label='Product Name' name='name' type='text' />
                  </div>
                  <div className='product-input product-category'>
                    <TextField
                      label='Product Category'
                      name='category'
                      type='text'
                    />
                  </div>
                </div>

                <div className='col'>
                  <div className='product-input product-old-price'>
                    <TextField
                      label='Previous Price'
                      name='oldPrice'
                      type='number'
                    />
                  </div>

                  <div className='product-input product-new-price'>
                    <TextField
                      label='Product Price'
                      name='price'
                      type='number'
                    />
                  </div>
                </div>

                <div className='col'>
                  <div className='product-input product-small-descripiton'>
                    <TextArea label='Small Description' name='smallDesc' />
                  </div>
                </div>

                <div className='col'>
                  <div className='product-input product-description'>
                    <TextArea label='Description' name='description' />
                  </div>
                </div>

                <DropZone files={file} setFiles={setFile} />
                <div className='edit-cancel-btn'>
                  <button className='edit' type='submit'>
                    Save
                  </button>
                  <button onClick={resetImage} type='reset' className='reset'>
                    Reset
                  </button>
                  <button
                    onClick={() => {
                      setEdit(false);
                    }}
                    type='button'
                    className='cancel'>
                    Cancel
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </section>
  );
};

export default EditProduct;
