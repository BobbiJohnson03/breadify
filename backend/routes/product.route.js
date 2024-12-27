// backend/routes/product.route.js

/*
plik organizuje trasy API dla produktów

Wszystkie trasy API dla produktów (GET, POST, PUT, DELETE) są zebrane w jednym miejscu, co ułatwia 
zarządzanie kodem i jego czytelność

*/

import express from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
  getProductById, 
} from "../controllers/product.controller.js";

const router = express.Router();

// Pobierz wszystkie produkty
router.get("/", getProducts);

// Pobierz produkt po ID
router.get("/:id", getProductById);

// Utwórz nowy produkt
router.post("/", createProduct);

// Zaktualizuj istniejący produkt
router.put("/:id", updateProduct);

// Usuń produkt
router.delete("/:id", deleteProduct);

export default router;

