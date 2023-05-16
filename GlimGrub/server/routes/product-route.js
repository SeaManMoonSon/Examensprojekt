import express from "express";
import ProductController from "../controllers/product-controller.js";
import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();

// Require auth for all product routes
// router.use(requireAuth);

// Add new product
router.post('/', ProductController.createProduct);

// Get all products
router.get('/', ProductController.getProducts);

// Get one product
router.get('/:id', ProductController.getProduct);

// Delete a product
router.delete('/:id', ProductController.deleteProduct);

// Update a product
router.patch('/:id', ProductController.updateProduct);

export default router;