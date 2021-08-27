const express = require('express');

const upload = require('../middlewares/upload');

const router = express.Router();

const { ensureAuthenticated } = require('../middlewares/authenticate');
const { authorize } = require('../middlewares/authorize');

const {
  createProduct,
  getAllProducts,
  deleteAllProduct,
  getProductById,
  deleteProductById,
  updateProduct,
  imageUpload,
} = require('../controllers/product');

router
  .route('/')
  .get(getAllProducts)
  .post(ensureAuthenticated, authorize, upload.array('image'), createProduct)
  .delete(ensureAuthenticated, authorize, deleteAllProduct);

router.route('/image').post(upload.array('image'), imageUpload);

router
  .route('/:id')
  .get(getProductById)
  .delete(ensureAuthenticated, authorize, deleteProductById)
  .patch(ensureAuthenticated, authorize, upload.array('image'), updateProduct);

module.exports = router;
