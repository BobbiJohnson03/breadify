// backend/controllers/product.controller.js
// controllers handle the logic for processing requests and returning responses.

/*Gdy metoda jest asynchroniczna (oznaczona słowem kluczowym async), oznacza to, że może wykonywać operacje, które mogą trwać pewien czas (np. pobieranie danych z bazy), a mimo to nie blokuje reszty aplikacji w oczekiwaniu na zakończenie tej operacji. Kluczowym elementem asynchronicznej metody jest możliwość użycia słowa await przed operacjami asynchronicznymi (jak zapytania do bazy danych), co pozwala na ich wykonanie i daje wynik, gdy tylko operacja zakończy się powodzeniem.

Oto główne aspekty metody asynchronicznej, użyte w kontrolerach:

Efektywność i responsywność: Gdy aplikacja wykonuje operacje asynchroniczne, np. w kontrolerach przy pobieraniu danych z bazy, może od razu zająć się innymi zadaniami, zamiast czekać, aż baza zwróci dane. Dzięki temu jest bardziej efektywna i szybciej reaguje na nowe zapytania.

Obsługa błędów: try/catch pozwala przechwycić błędy, które mogą wystąpić w operacjach asynchronicznych, np. gdy baza danych jest niedostępna. W razie błędu metoda zwraca odpowiedź z kodem błędu, informującą użytkownika o problemie, zamiast przerywać działanie aplikacji. */
import mongoose from "mongoose";
import Product from "../models/product.model.js";

// Pobierz wszystkie produkty lub z możliwością wyszukiwania i filtrowania
export const getProducts = async (req, res) => {
  try {
    const { search, category } = req.query;

    let query = {};

    // Dodaj warunki wyszukiwania, jeśli istnieje parametr search
    if (search) {
      query.name = { $regex: search, $options: "i" }; // "i" - wyszukiwanie niewrażliwe na wielkość liter
    }

    // Dodaj filtr kategorii, jeśli istnieje parametr category
    if (category) {
      query.category = category;
    }

    const products = await Product.find(query); // Wykonaj zapytanie z warunkami
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("Error in fetching products:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


// Pobierz produkt po ID
export const getProductById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product Id" });
  }

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error("Error in fetching product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Utwórz nowy produkt
export const createProduct = async (req, res) => {
  const { name, price, image, category } = req.body;

  if (!name || !price || !image || !category) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const newProduct = new Product({ name, price, image, category });

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error in creating product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Zaktualizuj produkt
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, image, category } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product Id" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, price, image, category },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.error("Error in updating product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Usuń produkt
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product Id" });
  }

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.error("Error in deleting product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
