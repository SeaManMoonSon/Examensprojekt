import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    // namn, personnummer, lösen, saldo, roll
    name: {
        type: String,
        required: true
    },
    ssn: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true,
        default: "0000"
    },
    balance: {
        type: String,
        required: true,
        default: "000"
    },
    role: {
        type: String,
        required: true
    }
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;