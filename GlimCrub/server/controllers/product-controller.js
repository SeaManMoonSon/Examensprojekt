import mongoose from "mongoose";
import Product from "../models/product-model.js";

// Get all products
const getProducts = async (req, res) => {
  const products = await Product.find({}).sort({ name: "asc" });

  res.status(200).json(products);
};

// Get one product
const getProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No product found" });
  }

  const product = await Product.findById(id);

  if (!product) {
    return res.status(404).json({ error: "No product found" });
  }

  res.status(200).json(product);
};

// Create new product
const createProduct = async (req, res) => {
  const {
    menu: {
      breakfast: { name: breakfastName, available: breakfastAvailable },
      snack: [
        { name: kaffe, available: kaffeAvailable }, 
        { name: macka, available: mackaAvailable }, 
        { name: frukt, available: fruktAvailable }, 
        { name: godis, available: godisAvailable }],
      lunch: { name: lunchName, available: lunchAvailable },
      dinner: { name: dinnerName, available: dinnerAvailable }
    },
  } = req.body;

  // Add document to database
  try {
    const product = await Product.create({
      menu: {
        breakfast: { name: breakfastName, available: breakfastAvailable },
        snack: [
          { name: kaffe, available: kaffeAvailable }, 
          { name: macka, available: mackaAvailable }, 
          { name: frukt, available: fruktAvailable }, 
          { name: godis, available: godisAvailable }],
        lunch: { name: lunchName, available: lunchAvailable },
        dinner: { name: dinnerName, available: dinnerAvailable }
      },
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No product found" });
  }

  const product = await Product.findOneAndDelete({ _id: id });

  if (!product) {
    return res.status(404).json({ error: "No product found" });
  }

  res.status(200).json(product);
};

// Update a product
const updateProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No product found" });
  }

  const product = await Product.findByIdAndUpdate({ _id: id }, { ...req.body });

  if (!product) {
    return res.status(404).json({ error: "No product found" });
  }

  res.status(200).json(product);
};

export default { getProducts, getProduct, createProduct, deleteProduct, updateProduct };