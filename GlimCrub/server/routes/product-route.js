import express from "express";
import ProductController from "../controllers/product-controller.js";

const router = express.Router();

// Add new product
router.post('/', ProductController.createProduct);

// Get all users
router.get('/', ProductController.getProducts);

// Get one user
router.get('/:id', ProductController.getProduct);

// Delete a user
router.delete('/:id', ProductController.deleteProduct);

// Update a user
router.patch('/:id', ProductController.updateProduct);

export default router;