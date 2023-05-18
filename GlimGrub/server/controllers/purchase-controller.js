// import mongoose from "mongoose";
import Purchase from "../models/purchase-model.js";
import User from "../models/user-model.js";
import Product from "../models/product-model.js";

// Get all purchases
const getPurchases = async (req, res) => {
    try {
        const purchases = await Purchase.find({})
        .populate("user_id", "name")
        .populate({
            path: "items.product_id",
            model: "Product",
            select: "name",
        });
    
    res.status(200).json(purchases);
    } catch (error) {
    res.status(400).json({ error: error.message });
    }
};

// Get one purchase

// Create new purchase
const createPurchase = async (req, res) => {
    const { user_id, date, items } = req.body;

    // Calculate total price by summing individual item prices
    const price_total = items.reduce((total, item) => {
        return total + item.price_one * item.quantity;
    }, 0);

    // Convert the items array to the correct structure for listing
    const formattedItems = items.map(item => ({
        product_id: item.product_id,
        quantity: item.quantity,
        price_one: item.price_one
    }));

    // Add document to database
    try {
        const purchase = await Purchase.create({ user_id, price_total, date, items: formattedItems });

        const user = await User.findById(user_id);
        if (user) {
            user.balance -= price_total;
            await user.save();
        }
        
        res.status(200).json(purchase);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export default { getPurchases, createPurchase };