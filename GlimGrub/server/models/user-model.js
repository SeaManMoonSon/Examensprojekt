import mongoose from "mongoose";
import bcrypt from "bcrypt";
import PurchaseModel from "./purchase-model.js";

const userSchema = new mongoose.Schema({
  // namn, personnummer, lösen, saldo, roll
  name: {
    type: String,
    required: true,
  },
  ssn: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    default: "0000",
  },
  balance: {
    type: Number,
    required: true,
    default: 0,
  },
  role: {
    type: String,
    required: true,
  },
});

const UserModel = mongoose.model("User", userSchema);

// userSchema.pre("remove", async function(next) {
//   const user = this;
//   await PurchaseModel.deleteMany({ user_id: user._id });
//   next();
// });

export default UserModel;
