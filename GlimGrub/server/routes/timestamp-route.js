import express from "express";
import TimestampController from "../controllers/timestamp-controller.js";

const router = express.Router();

// Create new timestamp
router.post('/', TimestampController.createTimestamp);

export default router;