import mongoose from "mongoose";
import { Parser } from "json2csv";

import Purchase from "../models/purchase-model.js";
import User from "../models/user-model.js";

// Get all purchases
const getPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find({})
      .populate("user_id", "name")
      .populate("date", "date")
      .populate({
        path: "items.product_id",
        model: "Product",
        select: "name",
      }).sort({ date: -1 });

    res.status(200).json(purchases);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get purchases since last reset
// const getPurchasesSinceLastReset = async (req, res) => {
//   try {
//     const sinceLastReset = req.query.since;
//     const purchases = await Purchase.find({
//       createdAt: { $gte: sinceLastReset },
//     });

//     res.status(200).json(purchases);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// Get one purchase
const getPurchase = async (req, res) => {
  const { id } = req.params;

  const purchase = await Purchase.find({ user_id: id })
    .populate("user_id", "name")
    .populate({
      path: "items.product_id",
      model: "Product",
      select: "name",
    });

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

    if (user && user.role === "deltagare" && user.balance - price_total >= 0) {
      // console.log("DELTAGARE OCH PARA FINNS");
      user.balance -= price_total;
      await user.save();
    }
    // if (user.role !== "deltagare") {  // **THIS NEEDS A BALANCE RESET BUTTON TO MAKE SENSE**
    //   console.log("ICKE DELTAGARE");
    //   user.balance += price_total;
    //   await user.save();
    // }
    if (user.role === "deltagare" && user.balance - price_total < 0) {
      return res.status(400).json({ error: "User balance is too low" });
    }

    res.status(200).json(purchase);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const exportPurchases = async (req, res) => {
  const { startDate, endDate } = req.body;

  console.log(endDate);

  try {
    const purchases = await Purchase.find({
      date: {
        $gte: startDate /* MongoDB comparison query operator. https://www.mongodb.com/docs/manual/reference/operator/query-comparison/ */,
        $lte: endDate /* gte = greater than or equal to. lte = lesser than or equal to */,
      },
    }).populate({
      path: "user_id",
      select: "name role",
    });

    const fields = [
      {
        label: "Datum",
        value: (row) => new Date(row.date).toLocaleDateString(),
      } /* What we in the biz call a "silvertejpslösning" for date to show prettier in the csv file */,
      { label: "Roll", value: "user_id.role" },
      { label: "Namn", value: "user_id.name" },
      { label: "Totalsumma", value: "price_total" },
    ];
    const opts = { fields, encoding: "utf-8" };

    const parser = new Parser(opts);
    const csvData = parser.parse(purchases);

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=Betalningar.csv"
    );
    res.set("Content-Type", "text/csv; charset=utf-8");
    res.status(200).send(csvData);
  } catch (error) {
    console.error(error); // Log the error message for debugging purposes
    res.status(500).json({ error: "Export failed" });
  }
};

export default { getPurchases, createPurchase, getPurchase, exportPurchases };
