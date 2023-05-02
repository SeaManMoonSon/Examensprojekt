import express from "express";
import ProductController from "../controllers/product-controller.js";

const router = express.Router();

// Add new product
router.post('/', ProductController.createProduct);

// Get all users
router.get('/', ProductController.getProducts);

// Get one user
// router.get('/:id', UserController.getUser);

// Delete a user
// router.delete('/:id', UserController.deleteUser);

// Update a user
// router.patch('/:id', UserController.updateUser);

export default router;