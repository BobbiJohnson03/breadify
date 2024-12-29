// backend/server.js
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import userRoutes from "./routes/auth.user.route.js";
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
app.use("/api/users", userRoutes);


app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    success: false,
    message: err.message,
  });
});

// Start serwera
app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
  console.log("Hello Elliot");
});

