import express from "express";
import UserController from "../controllers/user-controller.js";
import userController from "../controllers/user-controller.js";

const router = express.Router();

// Add new user
router.post('/', UserController.createUser);

// Get all users
router.get('/', UserController.getUsers);

// Get one user
router.get('/:id', UserController.getUser);

// Delete a user
router.delete('/:id', UserController.deleteUser);

// Update a user
router.patch('/:id', UserController.updateUser);

// Login user
router.post('/login', UserController.login);

export default router;