import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const productSchema = new mongoose.Schema({
  // namn, pris, kategori, roll
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  role: {
    type: Number,
    required: true,
  },
});

const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;
