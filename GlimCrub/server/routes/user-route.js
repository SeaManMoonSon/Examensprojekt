import express from "express";
import userController from "../controllers/user-controller.js";
import menuController from "../controllers/menu-controller.js";

const router = express.Router();

// router.get("/", userController.getLandingPage);

// router.get("/login", userController.getLogin);
// router.post("/login", userController.login);

// router.get("/register", userController.getRegister);

// router.get("/menu", menuController.getMenu);

router.post('/', userController.login);

export default router;