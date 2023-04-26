import express from "express";
import userController from "../controllers/user-controller.js";

const router = express.Router();

router.get("/", userController.getLandingPage);

router.get("/login", userController.getLogin);
router.post("/login", userController.login);

router.get("/register", userController.getRegister);

export default router;