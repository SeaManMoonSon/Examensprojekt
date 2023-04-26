import mongoose from "mongoose";
import ProductModel from "../models/product-model.js";
import UserModel from "../models/user-model.js";


async function getMenu(req, res) {
    const menu = await ProductModel.find();
    res.render("menu", { menu });
}

export default { getMenu };