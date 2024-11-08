const express = require('express');
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getUserProducts,
} = require('../controllers/productController');
const { authenticateUser } = require('../middleware/authentication');

const router = express.Router();


router.route('/').get(getAllProducts).post(createProduct);
router.route('/user').get(authenticateUser, getUserProducts);

router
  .route('/:id')
  .get(getProductById)
  .patch(authenticateUser, updateProduct)
  .delete(authenticateUser, deleteProduct);

module.exports = router;