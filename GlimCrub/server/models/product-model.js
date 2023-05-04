import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const productSchema = new mongoose.Schema({
  menu: {
    breakfast: {
      name: {
        type: String,
        required: true
      },
      available: {
        type: Boolean,
        required: true
      }
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
      name: {
        type: String,
        required: true
      },
      available: {
        type: Boolean,
        required: true
      }
    },
    dinner: {
      name: {
        type: String,
        required: true
      },
      available: {
        type: Boolean,
        required: true
      }
    }
  }
});

const ProductModel = mongoose.model('Product', productSchema);

export default ProductModel;