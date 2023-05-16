import express from "express";
import PurchaseController from "../controllers/purchase-controller.js";

const router = express.Router();

// Add new purchase
router.post('/', PurchaseController.createPurchase);

// Get all purchases
router.get('/', PurchaseController.getPurchases);

export default router;