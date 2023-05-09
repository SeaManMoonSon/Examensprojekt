import mongoose from "mongoose";
import User from "../models/user-model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Create token
const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET);
}

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

  // Hash SSN
  // const hashedSSN = await bcrypt.hash(ssn, 10);

  // Add document to database
  try {
    const user = await User.create({ name, ssn, password, balance, role });

    res.status(200).json({ user });
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

const loginUser = async(req, res) => {
  const { ssn, password } = req.body;

  try {
    const user = await User.findOne({ ssn, password });
    console.log(user);

    if (!user) {
      throw new Error("Fel personnummer");
    }

    // const match = await bcrypt.compare(ssn, user.ssn);

    if (!password === user.password) {
      throw new Error("Fel PIN-kod");
    }

    // Create token
    const token = createToken(user._id);

    res.status(200).json({user, token});
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};

export default { getUsers, getUser, createUser, deleteUser, updateUser, loginUser };
