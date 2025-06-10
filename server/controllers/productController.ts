import Product from '../models/Product';
import User from '../models/User';
import Organization from '../models/organization';
import * as CustomError from '../errors';
import asyncHandler from '../middleware/asyncHandler';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

// @ Create Product
// @ endpoint /api/v1/product
// @ method POST

const createProduct = asyncHandler(async (req: Request, res: Response) => {
	const user = req.user.userId;
	const { name, price, description, organization, category, stock, imageUrl } =
		req.body;

	const org = await Organization.findOne({ _id: organization, user: user });

	if (!org) {
		throw new CustomError.NotFoundError(
			`No organization with id : ${organization}`
		);
	}
	// upload image
	if (req.files) {
		const file = req.files.file as any;
		const fileName = file.name;
		const uploadPath = `uploads/${fileName}`;
		file.mv(uploadPath, async (err: Error) => {
			if (err) {
				console.error(err);
				return res.status(500).send;
			}
		});
	}

	const product = new Product({
		user,
		name,
		price,
		description,
		organization,
		category,
		stock,
		imageUrl,
	});

	await product.save();

	if (!product) {
		throw new CustomError.InternalServerError('Product could not be created');
	}

	res
		.status(StatusCodes.CREATED)
		.json({ success: true, msg: 'Product created successfully', product });
});

// @ Get All Products
// @ endpoint /api/v1/products
// @ method GET
const getAllProducts = asyncHandler(async (req: Request, res: Response) => {
	const products = await Product.find();
	res.status(StatusCodes.OK).json(products);
});

// @ Get User's Products
// @ endpoint /api/v1/products/user
// @ method GET

const getUserProducts = asyncHandler(async (req: Request, res: Response) => {
	const user = req.user.userId;
	const products = await Product.find({ user: user });
	res.status(StatusCodes.OK).json(products);
});

// @ Get Product By ID
// @ endpoint /api/v1/product/:id
// @ method GET
const getProductById = asyncHandler(async (req: Request, res: Response) => {
	const product = await Product.findById(req.params.id);
	if (!product) {
		throw new CustomError.NotFoundError('Product not found');
	}
	res.status(StatusCodes.OK).json(product);
});

// @ Update a product by ID
// @ endpoint /api/v1/product/:id
// @ method PATCH
const updateProduct = asyncHandler(async (req: Request, res: Response) => {
	const user = req.user.userId;
	const id = req.params.id;
	const { name, price, description, organization, category, stock, imageUrl } =
		req.body;

	const org = await Organization.findOne({ _id: organization, user: user });

	if (!org) {
		throw new CustomError.NotFoundError(
			`No organization with id : ${organization}`
		);
	}

	const product = await Product.findOne({ _id: id, user: user });

	if (!product) {
		throw new CustomError.NotFoundError('Product not found');
	}

	product.name = name || product.name;
	product.price = price || product.price;
	product.description = description || product.description;
	product.organization = organization || product.organization;
	product.category = category || product.category;
	product.stock = stock || product.stock;
	product.imageUrl = imageUrl || product.imageUrl;

	await product.save();

	res
		.status(StatusCodes.OK)
		.json({ success: true, msg: 'Product updated successfully', product });
});

// @ Delete a product by ID
// @ endpoint /api/v1/product/:id
// @ method DELETE
const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
	const user = req.user.userId;
	const id = req.params.id;

	const product = await Product.findByIdAndDelete({ _id: id, user: user });

	if (!product) {
		throw new CustomError.NotFoundError('Product not found');
	}

	res
		.status(StatusCodes.OK)
		.json({ success: true, msg: 'Product deleted successfully' });
});

export {
	createProduct,
	getAllProducts,
	getUserProducts,
	getProductById,
	updateProduct,
	deleteProduct,
};
