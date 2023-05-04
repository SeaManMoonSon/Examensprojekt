import mongoose from "mongoose";
import User from "../models/user-model.js";

// Get all users
const getUsers = async (req, res) => {
  const users = await User.find({}).sort({ name: "asc" });

  res.status(200).json(users);
};

// Get one user
const getUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No user found" });
  }

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ error: "No user found" });
  }

  res.status(200).json(user);
};

// Create new user
const createUser = async (req, res) => {
  const { name, ssn, password, balance, role } = req.body;

  // Add document to database
  try {
    const user = await User.create({ name, ssn, password, balance, role });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No user found" });
  }

  const user = await User.findOneAndDelete({ _id: id });

  if (!user) {
    return res.status(404).json({ error: "No user found" });
  }

  res.status(200).json(user);
};

// Update a user
const updateUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No user found" });
  }

  const user = await User.findByIdAndUpdate({ _id: id }, { ...req.body });

  if (!user) {
    return res.status(404).json({ error: "No user found" });
  }

  res.status(200).json(user);
};

async function login(req, res) {
  try {
    const { ssn } = req.body;
    const user = await UserModel.findOne({ ssn });

    if (!ssn) {
      throw new Error("Missing ssn in request body");
    }

    if (!user) {
      throw new Error("Invalid ssn or password");
    } else {
      console.log(`Hello ${user.role} ${user.name}`);
      res.redirect('/landing');
    }

    // if (user.password === "000") {
    //   console.log("hej");
    // }

  } catch (error) {
    console.error(error);
    return res.status(400).send({ error: error.message });
  }
}

// async function getRegister(req, res) {
//     res.render("register");
// }

// async function register(req, res) {
//   let queryString = null;

//   try {
//     const { ssn, password } = req.body;
//     const userDocument = new UserModel({ ssn, password });

//     if (ssn.value === "" || password.value === "") {
//       throw new Error("Incorrent info given");
//     }

//     userDocument.save();

//     queryString = new URLSearchParams({
//       message: "Welcome!",
//     }).toString();

//     return res.redirect(`/login?${queryString}`);
//   } catch (error) {
//     console.error(error);
//     queryString = new URLSearchParams({
//       message: error.message,
//     }).toString();
//     res.redirect(`/login/register?${queryString}`);
//   }
// }

export default { getUsers, getUser, createUser, deleteUser, updateUser, login };
