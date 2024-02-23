//ProductModel.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: true,
    index: true
  },
  slug: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ["Furniture", "Kitchen", "Bathroom", "Electronics", "Decor", "Miscellaneous"],
  },
  material: {
    type: String
  },
  manufacture_year: {
    type: Number,
    required: true
  },
  condition: {
    type: String,
    enum: ["New/Unused", "Used/Excellent", "Used/Good", "Used/Fair", "Poor"],
    required: true,
  },
  origin: { 
    type: String,
    required: true 
  },
  original_price: {
    type: Number,
  },
  sale_price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
  },
}, { versionKey: false });

const Product = mongoose.model("Product", productSchema);

export default Product;
