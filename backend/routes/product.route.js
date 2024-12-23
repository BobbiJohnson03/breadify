// backend/routes/product.route.js

import express from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

// Pobierz wszystkie produkty
router.get("/", getProducts);

// Utwórz nowy produkt
router.post("/", createProduct);

// Zaktualizuj istniejący produkt
router.put("/:id", updateProduct);

// Usuń produkt
router.delete("/:id", deleteProduct);

export default router;
