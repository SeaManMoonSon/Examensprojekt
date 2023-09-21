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

// THIS NEEDS IN-APP USER DELETION FUNCTIONALITY TO WORK. Maybe add a User CRUD system on admin level at a later stage? Speak with the boss about this!
// userSchema.pre("remove", async function (next) {
//   try {
//     await PurchaseModel.deleteMany({ user_id: this._id });
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

export default UserModel;
