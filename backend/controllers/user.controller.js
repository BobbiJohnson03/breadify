// backend/controllers/user.controller.js
import bcrypt from "bcryptjs"; 
import User from "../models/user.model.js";


export const registerUser = async (req, res) => 
  {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.error("Error in registering user:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Ukryj hasła
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


export const getUserById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid User Id" });
  }

  try {
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error("Error fetching user:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  console.log("Request received at /api/auth/login");  // Logowanie, że żądanie trafiło do tej funkcji
  console.log("Request body:", req.body);  // Logowanie danych z ciała żądania

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide both email and password" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    res
      .status(200)
      .json({ success: true, message: "User logged in successfully" });
  } catch (error) {
    console.error("Error in logging in user:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


