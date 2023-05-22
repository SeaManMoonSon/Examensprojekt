// import mongoose from "mongoose";
import { Parser } from "json2csv";

import Purchase from "../models/purchase-model.js";
import User from "../models/user-model.js";
// import Product from "../models/product-model.js";
import PurchaseModel from "../models/purchase-model.js";

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
const getPurchase = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No purchase found" });
  }

  const purchase = await Purchase.findById(id);

  if (!purchase) {
    return res.status(404).json({ error: "No purchase found" });
  }

  res.status(200).json(purchase);
};

// Create new purchase
const createPurchase = async (req, res) => {
  const { user_id, date, items } = req.body;

  // Calculate total price by summing individual item prices
  const price_total = items.reduce((total, item) => {
    return total + item.price_one * item.quantity;
  }, 0);

  // Convert the items array to the correct structure for listing
  const formattedItems = items.map((item) => ({
    product_id: item.product_id,
    quantity: item.quantity,
    price_one: item.price_one,
  }));

  // Add document to database
  try {
    const purchase = await Purchase.create({
      user_id,
      price_total,
      date,
      items: formattedItems,
    });

    const user = await User.findById(user_id);
    if (user && user.balance - price_total >= 0) {
      user.balance -= price_total;
      await user.save();
    } else if (user.balance - price_total <= 0) {
      res.status(400).json({ error: "User balance is too low" });
    }

    res.status(200).json(purchase);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const exportPurchases = async (req, res) => {
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;

  try {
    const purchases = await PurchaseModel.find({
      date: {
        $gte: startDate, // Greater than or equal to, start date for export
        $lte: endDate, // Lesser than or equal to, end date for export
      },
    }).populate("user_id", "name", "ssn");

    const fields = ["user_id.name", "price_total", "date"];
    const opts = { fields };

    const parser = new Parser(opts);
    const csvData = parser.parse(purchases);

    res.setHeader("Content-Disposition", "attachment; filename=Inköp.csv");
    res.set("Content-Type", "text/csv");
    res.status(200).send(csvData);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Exportering misslyckades" });
  }
};

export default { getPurchases, createPurchase, getPurchase, exportPurchases };
