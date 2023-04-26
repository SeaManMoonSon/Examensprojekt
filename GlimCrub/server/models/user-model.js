import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const userSchema = new mongoose.Schema({
    // namn, personnummer, lösen, saldo, roll
    name: {

    },
    ssn: {

    },
    password: {

    },
    balance: {

    },
    role: {
        
    }
}, {collection: "Users"});

const UserModel = mongoose.model("Users", userSchema);

export default UserModel;