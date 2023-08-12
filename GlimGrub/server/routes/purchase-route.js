import express from "express";
import PurchaseController from "../controllers/purchase-controller.js";

const router = express.Router();

// Add new purchase
router.post('/', PurchaseController.createPurchase);

// Get all purchases
router.get('/', PurchaseController.getPurchases);

// Get all purchases since last reset
// router.get('/since', PurchaseController.getPurchasesSinceLastReset);

// Get one purchase
router.get('/:id', PurchaseController.getPurchase);

// Export purchases
router.post('/export', PurchaseController.exportPurchases);

export default router;