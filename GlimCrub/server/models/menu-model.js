import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const menuSchema = new mongoose.Schema({
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
}, { collection: 'Menu' });

const MenuModel = mongoose.model('Menu', menuSchema);

export default MenuModel;