import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const productSchema = new mongoose.Schema({
    // frukost, fika(kaffe, smörgås, frukt, godis), lunch, kvällsmat
    menu: {
        type: String,
        required: true,
        default: ["Frukost", "Fika", "Lunch", "Kvällsmat"]
      },
      breakfast: {
        type: String,
        required: true
      },
      snack: {
        type: Array,
        required: true,
        default: ["Kaffe", "Smörgås", "Frukt", "Godis"]
      },
      lunch: {
        type: String,
        required: true
      },
      dinner: {
        type: String,
        required: true
      }
}, {collection: "Products"});

const ProductModel = mongoose.model("Products", productSchema);

export default ProductModel;