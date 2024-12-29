import express from "express";
import {
  registerUser,
  getUsers,
  getUserById,
  loginUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", registerUser);

router.get("/", getUsers);

router.get("/:id", getUserById);

router.post("/login", loginUser);


export default router;


