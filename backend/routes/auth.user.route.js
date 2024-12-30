import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserById,
  getAllUsers,
  deleteUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", registerUser); // działa

router.post("/login", loginUser); // działa

router.post("/logout", logoutUser); // działa

router.get("/all", getAllUsers);

router.get("/:id", getUserById);

router.delete("/:id", deleteUser);


export default router;


