import mongoose from "mongoose";
import dateFormat from "dateformat";
import UserModel from "./user-model.js";

const now = new Date();
const formattedDate = dateFormat(now, "isoDateTime");

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

userSchema.pre("remove", async function(next) {
  const user = this;
  await PurchaseModel.deleteMany({ user_id: user._id });
  next();
});

export default PurchaseModel;
