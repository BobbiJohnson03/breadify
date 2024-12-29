// backend/models/product.model.js

//  Models in the context of MongoDB are used to define the structure of our data
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // automatycznie utworzy pola createdAt i updatedAt
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;