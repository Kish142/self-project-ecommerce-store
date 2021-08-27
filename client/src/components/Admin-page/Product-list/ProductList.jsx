import React, { useState, useEffect, useRef } from 'react';
import { Image, Transformation } from 'cloudinary-react';

import './ProductList.styles.scss';

import { useHttpClient } from '../../../custom-hook/httpclient';
import LoadingSpinner from '../../Loading-spinner/LoadingSpinner';
import EditProduct from './Edit-product/EditProduct';
import DeleteProduct from './Delete-product/DeleteProduct';

const ProductList = ({ toggle }) => {
  const { isLoading, sendRequest } = useHttpClient();
  const editModal = useRef();
  const deleteModal = useRef();

  const [product, setProduct] = useState();
  const [editProductBtn, setEditProductBtn] = useState();
  const [deleteProductBtn, setDeleteProductBtn] = useState();

  const [editProduct, setEditProduct] = useState();
  const [deleteProduct, setDeleteProduct] = useState();

  const [reload, setReload] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const fetchRequest = async () => {
      const response = await sendRequest('/product');

      response && setProduct(response);
    };

    if (reload) {
      document.querySelector('.user-message-edit-product').style.display =
        'block';

      setTimeout(() => {
        document.querySelector('.user-message-edit-product').style.display =
          'none';
      }, 2000);
    }

    fetchRequest();
  }, [sendRequest, reload]);

  useEffect(() => {
    editProductBtn || deleteProductBtn
      ? document.body.style.setProperty('overflow', 'hidden', 'important')
      : document.body.style.setProperty('overflow', 'auto');
  }, [editProductBtn, deleteProductBtn]);

  useEffect(() => {
    const checkClickableOutsie = (event) => {
      editProductBtn &&
        editModal.current &&
        event.target.className === 'overlay-for-toggle' &&
        setEditProductBtn(false);

      deleteProductBtn &&
        deleteModal.current &&
        event.target.className === 'overlay-for-toggle' &&
        setDeleteProductBtn(false);
    };

    document.addEventListener('mousedown', checkClickableOutsie);
  }, [editProductBtn, deleteProductBtn]);

  return (
    <section
      style={{ display: toggle ? 'block' : 'none' }}
      className='product-list'>
      <div className='user-message-edit-product'>
        <div className='user-message-wrapper'>
          <p>Product Updated Successfully</p>
        </div>
      </div>
      {isLoading && <LoadingSpinner />}
      <p style={{ marginBottom: '1rem' }} className='total-product-count'>
        Total Product: {product ? product.product.length : '0'}
      </p>
      <div className='product-list-wrapper'>
        <table>
          <thead>
            <tr>
              <th className='sl-no'>Sl.no</th>
              <th className='product'>Product</th>
              <th className='name'>Product Name</th>
              <th className='price'>Price</th>
              <th className='category'>Category</th>
              <th className='edit-delete'>Edit / Delete</th>
            </tr>
          </thead>
          <tbody>
            {product &&
              product.product.map((product, idx) => (
                <tr key={product._id}>
                  <td className='no'>{idx + 1}</td>
                  <td className='product-img'>
                    <figure className='img'>
                      <Image
                        cloudName='self-project'
                        publicId={product.image[0]}
                        secure='true'>
                        <Transformation width='679' height='707' crop='pad' />
                      </Image>
                    </figure>
                  </td>
                  <td className='product-name'>{product.name}</td>
                  <td className='product-price'>Rs, {product.price}</td>
                  <td className='product-category'>{product.category}</td>
                  <td className='edit-delete-product'>
                    <div className='btn-wrap'>
                      <button
                        onClick={() => {
                          setEditProductBtn(!editProductBtn);
                          setEditProduct(product);
                        }}
                        className='edit-btn'>
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setDeleteProductBtn(!deleteProductBtn);
                          setDeleteProduct(product._id);
                        }}
                        className='delete-btn'>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div ref={editModal} className='edit-product-modal-view'>
        <EditProduct
          edit={editProductBtn}
          setEdit={setEditProductBtn}
          editProduct={editProduct}
          setEditProduct={setEditProduct}
          reload={reload}
          setReload={setReload}
        />
      </div>
      <div ref={deleteModal} className='delete-product-modal-view'>
        <DeleteProduct
          modal={deleteProductBtn}
          setDelete={setDeleteProductBtn}
          deleteProduct={deleteProduct}
          setDeleteProduct={setDeleteProduct}
          reload={reload}
          setReload={setReload}
        />
      </div>
    </section>
  );
};

export default ProductList;
