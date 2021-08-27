import React from 'react';

import { useHttpClient } from '../../../../custom-hook/httpclient';
import LoadingSpinner from '../../../Loading-spinner/LoadingSpinner';

import './DeleteProduct.styles.scss';

const DeleteProduct = ({
  modal,
  setDelete,
  deleteProduct,
  setDeleteProduct,
  reload,
  setReload,
}) => {
  const { isLoading, sendRequest } = useHttpClient();

  const rmProduct = async () => {
    const _id = deleteProduct && deleteProduct;
    console.log(deleteProduct);
    const response = await sendRequest(`product/${_id}`, 'delete');

    console.log(response);

    response && setDelete(false);

    response && setDeleteProduct();

    if (response) {
      setDelete(false);
      setDeleteProduct();
      setReload(!reload);
    }
  };

  modal
    ? document.body.style.setProperty('overflow', 'hidden', 'important')
    : document.body.style.setProperty('overflow', 'auto');

  return (
    <section
      style={{ display: modal ? 'block' : 'none' }}
      className='delete-product-modal'>
      {isLoading && <LoadingSpinner />}
      <div className='overlay-for-toggle'></div>
      <div className='delete-product-modal-wrapper'>
        <h3 className='text'>Are You Sure You Want To Delete?</h3>
        <div className='delete-cancel-btn'>
          <button
            onClick={() => setDelete(false)}
            className='cancel-delete-btn'>
            Cancel
          </button>
          <button onClick={rmProduct} className='confirm-delete-btn'>
            Confirm
          </button>
        </div>
      </div>
    </section>
  );
};

export default DeleteProduct;
