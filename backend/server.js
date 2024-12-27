import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import cors from "cors"; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ 
  origin: "http://localhost:3000", 
  credentials: true, 
}));
app.use(express.json());

// Trasy API
app.use("/api/products", productRoutes);

// Start serwera
app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
  console.log("Hello Elliot");
});

