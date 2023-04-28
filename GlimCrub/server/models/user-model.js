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
        type: Number,
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        required: true
    }
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;