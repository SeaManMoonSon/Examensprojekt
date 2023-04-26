import express from "express";
import userController from "../controllers/user-controller.js";
import productController from "../controllers/product-controller.js";

const router = express.Router();

router.get("/", userController.getLandingPage);

router.get("/login", userController.getLogin);
router.post("/login", userController.login);

router.get("/register", userController.getRegister);

router.get("/menu", productController.getMenu);

export default router;