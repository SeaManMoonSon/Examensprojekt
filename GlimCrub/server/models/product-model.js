import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const productSchema = new mongoose.Schema({
  menu: {
    breakfast: {
      type: String,
      required: true
    },
    snack: {
      kaffe: {
        type: Boolean,
        default: false
      },
      smorgas: {
        type: Boolean,
        default: false
      },
      frukt: {
        type: Boolean,
        default: false
      },
      godis: {
        type: Boolean,
        default: false
      }
    },
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