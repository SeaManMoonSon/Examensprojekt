// import mongoose from "mongoose";
import Purchase from "../models/purchase-model.js";

// Get all purchases
const getPurchases = async (req, res) => {
    const purchases = await Purchase.find({});

    res.status(200).json(purchases);
};

// Get one purchase

// Create new purchase
const createPurchase = async (req, res) => {
    const { user_id, price_total, date, items, product_id, quantity, price_one } = req.body;

    // Add document to database
    try {
        const purchase = await Purchase.create({ user_id, price_total, date, items, product_id, quantity, price_one });
        res.status(200).json(purchase);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export default { getPurchases, createPurchase };