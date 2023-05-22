import mongoose from "mongoose";
import dateFormat from "dateformat";

const now = new Date();
const formattedDate = dateFormat(now, "yyyy-mm-dd");

const purchaseSchema = new mongoose.Schema({
  // user_id, price_total, date, items[product_id, (quantity?), price_one]; 
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  price_total: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    default: formattedDate,
  },
  items: [{
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price_one: {
        type: Number,
        required: true,
      }
    }]
});

const PurchaseModel = mongoose.model("Purchase", purchaseSchema);

export default PurchaseModel;
