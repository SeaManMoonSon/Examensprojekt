import mongoose from "mongoose";
import UserModel from "../models/user-model.js";
import MenuModel from "../models/menu-model.js";


async function getMenu(req, res) {
    const menu = await MenuModel.find();
    res.render("menu", { menu });
}

export default { getMenu };