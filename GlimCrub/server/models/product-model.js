import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const productSchema = new mongoose.Schema({
  menu: {
    breakfast: {
      type: String,
      required: true
    },
    snack: [
      {
        name: {
          type: String,
          required: true
        },
        available: {
          type: Boolean,
          required: true
        }
      }
    ],
    lunch: {
      type: String,
      required: true
    },
    dinner: {
      type: String,
      required: true
    }
  }
});

const ProductModel = mongoose.model('Product', productSchema);

export default ProductModel;