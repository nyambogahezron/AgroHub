import express from 'express';
import {
	getAllProducts,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct,
	getUserProducts,
} from '../controllers/productController';
import { authenticateUser } from '../middleware/authentication';

const router = express.Router();

router.route('/').get(getAllProducts).post(authenticateUser, createProduct);
router.route('/user').get(authenticateUser, getUserProducts);

router
	.route('/:id')
	.get(getProductById)
	.patch(authenticateUser, updateProduct)
	.delete(authenticateUser, deleteProduct);

export default router;
